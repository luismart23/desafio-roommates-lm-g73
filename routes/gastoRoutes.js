import express from 'express';
import gastoController from '../controllers/gastoController.js';

const router = express.Router();

// Rutas para gastos
router.get('/', gastoController.getAllGastos);
router.post('/', gastoController.crearGasto);
router.put('/:id', gastoController.actualizarGasto);
router.delete('/:id', gastoController.eliminarGasto);

export default router;

