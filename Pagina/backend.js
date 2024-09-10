const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

const mysql = require('mysql2');
require('dotenv').config();


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

app.get('/', (req, res) => {
    res.send('Hola desde el servidor a Practicas Iniciales');
});
