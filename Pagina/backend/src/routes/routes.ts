import { Router } from 'express';

const router = Router();

router.post('/api/login', (req, res) => {
  const { user, password } = req.body;
  // Aquí deberías validar el usuario y la contraseña con tus datos reales
  if (user === 'admin' && password === '1234') {
    res.status(200).json({ message: 'Login exitoso' });
  } else {
    res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
  }
});

export default router;
