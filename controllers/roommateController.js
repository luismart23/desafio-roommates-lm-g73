import { getAllRoommates, crearRoommate, actualizarRoommate, eliminarRoommate } from '../models/roommateModel.js';
import { obtenerRoommateRandom } from '../utils/randomUser.js';

const roommateController = {
    getAllRoommates: async (req, res) => {
        try {
            const roommates = await getAllRoommates();
            res.status(200).json(roommates);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener roommates' });
        }
    },

    crearRoommate: async (req, res) => {
        try {
            const newRoommate = await obtenerRoommateRandom();
            await crearRoommate(newRoommate);
            res.status(201).json({ message: 'Roommate creado', roommate: newRoommate });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al agregar roommate' });
        }
    },

    actualizarRoommate: async (req, res) => {
        try {
            const id = req.params.id; // Obtener el ID del roommate desde la ruta
            await actualizarRoommate(id, req.body); // Llama a la función del modelo
            res.status(200).json({ message: 'Roommate actualizado' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar roommate' });
        }
    },

    eliminarRoommate: async (req, res) => { // Función para eliminar
        try {
            const id = req.params.id; // Obtener el ID del roommate desde la ruta
            await eliminarRoommate(id); // Llama a la función del modelo
            res.status(200).json({ message: 'Roommate eliminado' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar roommate' });
        }
    }
};

export default roommateController;
