const express = require('express');
const movies = require('./movies.json');
const crypto = require('node:crypto');
const { validateMovie, validatePartialMovie } = require('./schemas/movies');

const app = express();

app.use(express.json());

app.disable('x-powered-by'); // desabilitar el header x-powered-by: Express


app.get('/', (req, res) => {
    console.log('Hola mundo.');
});

const ACCEPTED_ORIGINS = [
    'http://localhost:8000',
];

// Todos los recuersos de sean MOVIES se indentifican con /movies
app.get('/movies', (req, res) => {
    // Tambien se puede poner donde esta consumiendo
    // res.header('Access-Controll-Allow-Ori', 'http://localhost:8080') //Todos los origenes que no sean nuestro propio origen sean permitidos
    res.header('Access-Controll-Allow-Ori', '*') //Todos los origenes que no sean nuestro propio origen sean permitidos
    //* Obtener queryParams
    const { genre } = req.query;
    if(genre) {
        // const filterMovies = movies.filter(movie => movie.genre.includes(genre));
        const filterMovies = movies.filter(
            // some comprueba si algun elemento del arreglo genre cumple la condicion
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        );
        return res.json(filterMovies);
    }
    res.json(movies);
});

//* Movie by id
app.get('/movies/:id', (req, res) => { // path-to-regexp
    const { id } = req.params;
    const movie = movies.find(movie => movie.id === id);
    if(movie) return res.json(movie);

    return res.status(404).json({ message: 'Movie not found'});
});

//* Create Movie
app.post('/movies', (req, res) => {

    const result = validateMovie(req.body);

    if(result.error){
        return res.status(400).json({ error: JSON.parse(result.error.message ) });
    }
    /* const { 
        title,
        year,
        director,
        duration,
        poster,
        rate,
        genre
    } = req.body; */

    const newMovie = {
        id: crypto.randomUUID(), // uuid v4
        ...result.data,
    }

    movies.push(newMovie);

    res.status(201).json(newMovie);
});

app.patch('/movies/:id', (req, res) => {
    const {id} = req.params;
    const result = validatePartialMovie(req.body);

    if(!result.success){
        return res.status(400).json({ message: JSON.parse(result.error.message )});
    }

    const movieIndex = movies.findIndex(movie => movie.id === id);

    if(movieIndex === -1) return res.status(404).json({ message: 'Movie not found'});

    /* const movie = movies[movieIndex]; */
    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = updateMovie;
    return res.json(updateMovie);
});

app.delete('/movies/:id', (req, res) => {

    const { id } = req.params;

    const movieIndex = movies.findIndex(movie => movie.id === id);

    if(movieIndex === -1) {
        return res.status(404).json({ message : 'Movie not found'});
    }

    movies.splice(movieIndex, 1);
    return res.json({ message: 'Movie deleted'});
});

app.options('/movies/:id', (req,res) => {
    const origin = req.header('origin');
    if(ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Acces-Control-Allow-Origin', origin);
        res.header('Acces-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
        res.send();
    }
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});