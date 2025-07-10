import { Routes } from '@angular/router';
import { ListarPeliculasComponent } from './pages/listar-peliculas/listar-peliculas.component';
import { AgregarPeliculaComponent } from './pages/agregar-pelicula/agregar-pelicula.component';
import { EditarPeliculaComponent } from './pages/editar-pelicula/editar-pelicula.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'listar-peliculas'
    },
    {
        path: 'listar-peliculas',
        component: ListarPeliculasComponent
    },
    {
        path: 'agregar-pelicula',
        component: AgregarPeliculaComponent
    },
    {
        path: 'editar-pelicula/:id',
        component: EditarPeliculaComponent
    },
    {
        path: '**',
        redirectTo: 'listar-peliculas'
    }
];
