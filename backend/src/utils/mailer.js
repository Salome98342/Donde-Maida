const nodemailer = require('nodemailer');

// Configura aquí tu email (puede ser Gmail, Outlook, etc.)
const transporter = nodemailer.createTransport({
    service: 'gmail',
});

const sendWeeklyReport = async (buffer) => {
    const mailOptions = {
        from: 'salomerodriguezmoscoso@gmail.com',
        to: 'salome.rodriguez@correounivalle.edu.co',
        subject: '📊 Reporte Semanal de Ventas',
        text: 'Adjunto encontrarás el reporte de ventas de esta semana.',
        attachments: [
            {
                filename: 'reporte_semanal.xlsx',
                content: buffer,
                contentType:
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
        ]
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendWeeklyReport;
