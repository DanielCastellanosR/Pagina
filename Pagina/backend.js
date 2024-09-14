const express = require('express');
const cors = require('cors');
const fs = require('fs');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL server.');
});

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Ruta de registro de usuarios
app.post('/register', (req, res) => {
    const { registro_academico, nombres, apellidos, contrasena, correo } = req.body;
    const sql = `INSERT INTO usuarios (registro_academico, nombres, apellidos, contrasena, correo) VALUES (?, ?, ?, ?, ?)`;
    connection.query(sql, [registro_academico, nombres, apellidos, contrasena, correo], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send({ message: 'Error en el servidor al registrar el usuario', error: err });
        }
        res.status(201).send({ message: 'Usuario registrado correctamente' });
    });
});

// Ruta de login de usuarios
app.post('/login', (req, res) => {
    const { registro_academico, contrasena } = req.body;
    const sql = `SELECT * FROM usuarios WHERE registro_academico = ? AND contrasena = ?`;
    connection.query(sql, [registro_academico, contrasena], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length > 0) {
            res.send({ message: 'Inicio de sesión exitoso', user: result[0] });
        } else {
            res.status(401).send({ message: 'Credenciales incorrectas' });
        }
    });
});

// Ruta para restablecer contraseña
app.post('/reset-password', (req, res) => {
    const { registro_academico, correo, nueva_contrasena } = req.body;
    const checkUserSql = `SELECT * FROM usuarios WHERE registro_academico = ? AND correo = ?`;
    connection.query(checkUserSql, [registro_academico, correo], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length > 0) {
            const updatePasswordSql = `UPDATE usuarios SET contrasena = ? WHERE registro_academico = ? AND correo = ?`;
            connection.query(updatePasswordSql, [nueva_contrasena, registro_academico, correo], (err, updateResult) => {
                if (err) return res.status(500).send(err);
                res.send({ message: 'Contraseña restablecida exitosamente' });
            });
        } else {
            res.status(404).send({ message: 'Datos incorrectos' });
        }
    });
});

// Ruta para obtener los cursos
app.get('/cursos', (req, res) => {
    fs.readFile('cursos.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading cursos.json:', err);
            return res.status(500).send({ message: 'Error en el servidor al leer los cursos' });
        }
        const cursos = JSON.parse(data).cursos;
        res.send(cursos);
    });
});

// Ruta para obtener todas las publicaciones con sus comentarios
// Ruta para obtener todas las publicaciones con sus comentarios
app.get('/publicaciones', (req, res) => {
    const sql = `
        SELECT p.id, p.nombre_usuario, p.curso_o_catedratico, p.mensaje, p.fecha_creacion, 
               c.id AS comentario_id, c.nombre_usuario AS comentario_usuario, c.comentario, c.fecha_creacion AS comentario_fecha
        FROM publicaciones p
        LEFT JOIN comentarios c ON p.id = c.publicacion_id
        ORDER BY p.fecha_creacion DESC, c.fecha_creacion ASC
    `;
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching publicaciones:', err);
            return res.status(500).send({ message: 'Error en el servidor al obtener las publicaciones', error: err });
        }
        const publicaciones = results.reduce((acc, row) => {
            const pub = acc.find(p => p.id === row.id);
            if (pub) {
                if (row.comentario_id) {
                    pub.comentarios.push({
                        id: row.comentario_id,
                        nombre_usuario: row.comentario_usuario,
                        comentario: row.comentario,
                        fecha_creacion: row.comentario_fecha
                    });
                }
            } else {
                acc.push({
                    id: row.id,
                    nombre_usuario: row.nombre_usuario,
                    curso_o_catedratico: row.curso_o_catedratico,
                    mensaje: row.mensaje,
                    fecha_creacion: row.fecha_creacion,
                    comentarios: row.comentario_id ? [{
                        id: row.comentario_id,
                        nombre_usuario: row.comentario_usuario,
                        comentario: row.comentario,
                        fecha_creacion: row.comentario_fecha
                    }] : []
                });
            }
            return acc;
        }, []);
        res.send(publicaciones);
    });
});

// Ruta para agregar una nueva publicación
app.post('/publicaciones', (req, res) => {
    const { nombre_usuario, curso_o_catedratico, mensaje, fecha_creacion } = req.body;
    const sql = `INSERT INTO publicaciones (nombre_usuario, curso_o_catedratico, mensaje, fecha_creacion) VALUES (?, ?, ?, ?)`;
    connection.query(sql, [nombre_usuario, curso_o_catedratico, mensaje, fecha_creacion], (err, result) => {
        if (err) {
            console.error('Error inserting publicacion:', err);
            return res.status(500).send({ message: 'Error en el servidor al agregar la publicación', error: err });
        }
        res.status(201).send({ message: 'Publicación agregada correctamente' });
    });
});

// Ruta para agregar un comentario a una publicación
app.post('/comentarios', (req, res) => {
    const { publicacion_id, nombre_usuario, comentario } = req.body;
    const sql = `INSERT INTO comentarios (publicacion_id, nombre_usuario, comentario) VALUES (?, ?, ?)`;
    connection.query(sql, [publicacion_id, nombre_usuario, comentario], (err, result) => {
        if (err) {
            console.error('Error inserting comentario:', err);
            return res.status(500).send({ message: 'Error en el servidor al agregar el comentario', error: err });
        }
        res.status(201).send({ message: 'Comentario agregado correctamente' });
    });
});

// Ruta principal
app.get('/', (req, res) => {
    res.send('Hola desde el servidor a Practicas Iniciales');
});

