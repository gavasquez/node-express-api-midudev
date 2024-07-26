import express, { json } from 'express';
import { moviesRouter } from "../clase-4/routes/movies.js";
import { corsMiddleware } from './middlewares/cors.js';

/* import fs from 'node:fs'
const movies = JSON.parse(fs.readFileSync('./clase-4/movies.json', 'utf-8')); */

// import { readJson } from './utils.js';
// Como leer un json en ESModules recomendado ahora
/* const movies = readJson('./movies.json') */

const app = express();

app.use(json());
app.use(corsMiddleware());
app.disable('x-powered-by');

app.use('/movies', moviesRouter);

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});