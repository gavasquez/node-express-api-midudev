const http = require('node:http');
const fs = require('node:fs');

const desiredPort = process.env.PORT ?? 1234;

const proccessRequest = (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    if(req.url === '/'){
        res.statusCode = 200;
        res.end('Bienvenido a mi página web1');
    } else if (req.url === '/imagen-bonita') {
        fs.readFile('./placa.png', (error, data) => {
            if(error){
                res.statusCode = 500;
                res.end('<h1>Server error</h1>');
            }else {
                res.setHeader('Content-Type', 'image/png');
                res.end(data);
            }
        });
    }else if (req.url === '/contact'){
        res.end('Contacto');
    }else {
        res.end('404');
    }
}

const server = http.createServer(proccessRequest);

server.listen(desiredPort, () => {
    console.log(`Server listening on port http://localhost:${desiredPort}`);
});