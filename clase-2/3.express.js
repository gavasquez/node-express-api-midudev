
const ditto = require('../pokemon/ditto.json');
const express = require('express');

const app = express();
app.disable('x-powered-by');

const PORT = process.env.PORT ?? 1234;

//* Middlewares
// se puede poner para rutas en especifico o metodos en especifico
//* Ruta
/* app.use('/pokemon/*',(req, res, next) => {
    console.log('Mi primer pokemon');
    next();
}); */
//* Metodo get
/* app.get((req, res, next) => {
    console.log('Mi primer middleware');
    next();
}); */

/* app.use((req, res, next) => {
    if(req.method !== 'POST') return next();
    if(req.headers['content-type'] !== 'application/json') return next();
    let body = '';

    req.on('data', chunk => {
        console.log(chunk.toString());
        body += chunk.toString();
    });

    req.on('end', () => {
        const data = JSON.parse(body);
        data.timestamp = Date.now();
        req.body = data;
        next();
    });
}); */

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Mi Página</h1>')
});

app.get('/pokemon/ditto', (req, res) => {
    res.json(ditto)
});

app.post('/pokemon', (req, res) => {
    res.status(201).json(req.body);
    /* let body = '';

    req.on('data', chunk => {
        console.log(chunk.toString());
        body += chunk.toString();
    });

    req.on('end', () => {
        const data = JSON.parse(body);
        data.timestamp = Date.now();
        res.status(201).json(data);
    }); */
});

// la ultima a la que va llegar, not found
app.use((req, res) => {
    res.status(404).send('<h1>404</h1>');
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})