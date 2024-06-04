import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const roommatesFilePath = './data/roommates.json';

async function getAllRoommates() {
    try {
        const data = await fs.promises.readFile(roommatesFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer roommates.json:', error);
        throw error;
    }
}

async function crearRoommate(newRoommate) {
    try {
        newRoommate.id = uuidv4();
        const roommates = await getAllRoommates();
        roommates.push(newRoommate);
        await fs.promises.writeFile(roommatesFilePath, JSON.stringify(roommates, null, 2));
    } catch (error) {
        console.error('Error al crear roommate:', error);
        throw error;
    }
}

async function actualizarRoommate(id, updatedRoommate) {
    try {
        const roommates = await getAllRoommates();
        const roommateIndex = roommates.findIndex(r => r.id === id);
        if (roommateIndex !== -1) {
            roommates[roommateIndex] = { ...roommates[roommateIndex], ...updatedRoommate };
            await fs.promises.writeFile(roommatesFilePath, JSON.stringify(roommates, null, 2));
            return true; // Regresa true si el roommate se actualizó correctamente
        } else {
            throw new Error('Roommate no encontrado');
        }
    } catch (error) {
        console.error('Error al actualizar roommate:', error);
        throw error; // Re-lanza el error para que sea manejado por el controlador
    }
}

async function eliminarRoommate(id) {
    try {
        const roommates = await getAllRoommates();
        const roommateIndex = roommates.findIndex(r => r.id === id);
        if (roommateIndex !== -1) {
            roommates.splice(roommateIndex, 1); // Elimina el roommate de la lista
            await fs.promises.writeFile(roommatesFilePath, JSON.stringify(roommates, null, 2));
            return true; // Regresa true si el roommate se eliminó correctamente
        } else {
            throw new Error('Roommate no encontrado');
        }
    } catch (error) {
        console.error('Error al eliminar roommate:', error);
        throw error; // Re-lanza el error para que sea manejado por el controlador
    }
}

export { getAllRoommates, crearRoommate, actualizarRoommate, eliminarRoommate };
