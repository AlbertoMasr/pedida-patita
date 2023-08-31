import fs from 'fs';

export default {
    server: {
        host: '192.168.1.79',
        port: 3000,
        https: {
            key: fs.readFileSync('./SSL/cert.key'),
            cert: fs.readFileSync('./SSL/cert.crt')
        }
    }
}