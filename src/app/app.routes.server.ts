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
    getPrerenderParams: async () => [
      { id: '1' },
      { id: '2' },
      { id: '3' }
    ]
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
