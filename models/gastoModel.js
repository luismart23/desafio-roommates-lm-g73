import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const gastosFilePath = './data/gastos.json';

async function getAllGastos() {
    try {
        const data = await fs.promises.readFile(gastosFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer gastos.json:', error);
        throw error;
    }
}

async function crearGasto(newGasto) {
    try {
        newGasto.id = uuidv4(); // Agrega un ID único al gasto
        const gastos = await getAllGastos();
        gastos.push(newGasto);
        await fs.promises.writeFile(gastosFilePath, JSON.stringify(gastos));
    } catch (error) {
        console.error('Error al crear gasto:', error);
        throw error;
    }
}


async function actualizarGasto(id, gastoActualizado) {
    try {
        const gastos = await getAllGastos();
        const gastoIndex = gastos.findIndex(gasto => gasto.id === id);
        if (gastoIndex !== -1) {
            gastos[gastoIndex] = gastoActualizado;
            await fs.promises.writeFile(gastosFilePath, JSON.stringify(gastos));
        } else {
            throw new Error('Gasto no encontrado');
        }
    } catch (error) {
        console.error('Error al actualizar gasto:', error);
        throw error;
    }
}

async function eliminarGasto(id) {
    try {
        const gastos = await getAllGastos();
        const newGastos = gastos.filter(gasto => gasto.id !== id);
        await fs.promises.writeFile(gastosFilePath, JSON.stringify(newGastos));
    } catch (error) {
        console.error('Error al eliminar gasto:', error);
        throw error;
    }
}

export { getAllGastos, crearGasto, actualizarGasto, eliminarGasto };