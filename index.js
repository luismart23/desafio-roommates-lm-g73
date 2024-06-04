import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs/promises';  // Importa fs/promises para usar async/await
import gastoRouter from './routes/gastoRoutes.js';
import roommateRouter from './routes/roommateRoutes.js';
import correo from './utils/correo.js';
import { obtenerRoommateRandom } from './utils/randomUser.js';

const app = express();

// Configuracion para enviar correos (reemplaza con tu propia configuración)
const transporter = correo.transporter;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Ruta raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rutas
app.use('/api/v1/gastos', gastoRouter);
app.use('/api/v1/roommates', roommateRouter);

// Rutas para obtener roommates y gastos
app.get('/roommates', async (req, res) => {
    try {
        const data = await fs.readFile(path.join(__dirname, 'data', 'roommates.json'), 'utf-8');
        const roommates = JSON.parse(data);
        res.status(200).json({ roommates });
    } catch (error) {
        console.error('Error al obtener los roommates:', error);
        res.status(500).json({ message: 'Error al obtener los roommates' });
    }
});

app.get('/gastos', async (req, res) => {
    try {
        const data = await fs.readFile(path.join(__dirname, 'data', 'gastos.json'), 'utf-8');
        const gastos = JSON.parse(data);
        res.status(200).json({ gastos });
    } catch (error) {
        console.error('Error al obtener los gastos:', error);
        res.status(500).json({ message: 'Error al obtener los gastos' });
    }
});

// Ruta para agregar un nuevo roommate
app.post('/roommate', async (req, res) => {
    try {
        const nuevoRoommate = await obtenerRoommateRandom();
        const data = await fs.readFile(path.join(__dirname, 'data', 'roommates.json'), 'utf-8');
        const roommates = JSON.parse(data);
        roommates.push(nuevoRoommate);
        await fs.writeFile(path.join(__dirname, 'data', 'roommates.json'), JSON.stringify(roommates, null, 2));
        res.status(200).json({ message: 'Nuevo roommate agregado', roommate: nuevoRoommate });
    } catch (error) {
        console.error('Error al agregar un nuevo roommate:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

// Configuración del puerto y arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`El servidor está funcionando en http://localhost:${PORT}`);
});