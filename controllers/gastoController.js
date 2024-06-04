import { getAllGastos, crearGasto, actualizarGasto, eliminarGasto } from '../models/gastoModel.js';
import correo from '../utils/correo.js';

const gastoController = {
    getAllGastos: async (req, res) => {
        try {
            const gastos = await getAllGastos();
            res.status(200).json(gastos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener gastos' });
        }
    },

    crearGasto: async (req, res) => {
        try {
            const newGasto = req.body;
            await crearGasto(newGasto);
            res.status(201).json({ message: 'Gasto agregado' });

            // Envía correo a los roommates
            await correo.enviarCorreoNuevoGasto(newGasto);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al agregar gasto' });
        }
    },

    actualizarGasto: async (req, res) => {
        try {
            const id = req.params.id;
            await actualizarGasto(id, req.body);
            res.status(200).json({ message: 'Gasto actualizado' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar gasto' });
        }
    },

    eliminarGasto: async (req, res) => {
        try {
            const id = req.params.id;
            await eliminarGasto(id);
            res.status(200).json({ message: 'Gasto eliminado' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar gasto' });
        }
    }
};

export default gastoController;