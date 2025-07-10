import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'listar-peliculas',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'agregar-pelicula',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'editar-pelicula/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => []
  },
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
