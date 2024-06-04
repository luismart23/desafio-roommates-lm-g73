import express from 'express';
import roommateController from '../controllers/roommateController.js';

const router = express.Router();

// Rutas para roommates
router.get('/', roommateController.getAllRoommates);
router.post('/random', roommateController.crearRoommate);
router.put('/:id', roommateController.actualizarRoommate); // Ruta para actualizar roommate
router.delete('/:id', roommateController.eliminarRoommate); // Ruta para eliminar roommate

export default router;
