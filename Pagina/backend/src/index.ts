import express from 'express';
import router from './routes/routes';
import cors from 'cors';

const app = express();
app.use(express.json()); // Middleware para analizar el cuerpo JSON
app.use(cors());
app.use(router);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

