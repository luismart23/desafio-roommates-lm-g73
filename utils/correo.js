import nodemailer from 'nodemailer';
import { getAllRoommates } from '../models/roommateModel.js'; // Importar getAllRoommates

// Configuracion para enviar correos 
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'luisesteban.art@gmail.com',
        pass: 'Luis2323$'
    }
});

async function enviarCorreoNuevoGasto(newGasto) {
    try {
        // Obtén los correos de los roommates 
        const roommates = await getAllRoommates();
        const to = roommates.map(r => r.email).join(',');

        const mailOptions = {
            from: 'luisesteban.art@gmail.com',
            to,
            subject: 'Nuevo Gasto',
            text: `Se ha registrado un nuevo gasto: ${newGasto.descripcion} por ${newGasto.monto}`
        };

        await transporter.sendMail(mailOptions);
        console.log('Correo electrónico enviado correctamente');
    } catch (error) {
        console.error('Error al enviar correo:', error);
        throw error;
    }
}

export default {
    enviarCorreoNuevoGasto,
    transporter // Exportar transporter
};