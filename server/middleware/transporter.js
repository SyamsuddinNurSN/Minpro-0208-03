const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'amanhidayat39@gmail.com',
        pass: 'jicc xffu iahk yvts'
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter