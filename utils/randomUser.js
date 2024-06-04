import fetch from 'node-fetch';

async function obtenerRoommateRandom() {
    try {
        const response = await fetch('https://randomuser.me/api/');
        if (!response.ok) {
            throw new Error('Error al obtener datos de randomuser.me');
        }
        const data = await response.json();
        // Extraemos solo los datos que necesitamos
        const { first, last } = data.results[0].name;
        return {
            nombre: `${first} ${last}`,
            debe: 0, // Inicialmente, el debe es 0
            recibe: 0 // Inicialmente, el recibe es 0
        };
    } catch (error) {
        console.error('Error al obtener roommate random:', error);
        throw error;
    }
}

export { obtenerRoommateRandom };