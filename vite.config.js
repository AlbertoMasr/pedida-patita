import fs from 'fs';

export default {
    server: {
        host: process.env.VITE_IP || '0.0.0.0',
        port: 3000,
        https: {
            key: fs.readFileSync('./SSL/cert.key'),
            cert: fs.readFileSync('./SSL/cert.crt')
        }
    }
}