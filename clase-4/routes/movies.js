import { Router } from "express";
import { MovieController } from "../controllers/movies.js";

/* const ACCEPTED_ORIGINS = [
    'http://localhost:8000',
]; */

export const moviesRouter = Router();

moviesRouter.get('/', MovieController.getAll);
moviesRouter.post('/', MovieController.create);

moviesRouter.get('/:id', MovieController.getById);
moviesRouter.patch('/:id', MovieController.update);
moviesRouter.delete('/:id', MovieController.delete);

/* moviesRouter.options('/movies/:id', (req,res) => {
    const origin = req.header('origin');
    if(ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Acces-Control-Allow-Origin', origin);
        res.header('Acces-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
        res.send();
    }
}); */