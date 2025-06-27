import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@/app/pages/Home/home').then((m) => m.Home),
  },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('@/app/pages/MovieDetails/movie-details').then(
        (m) => m.MovieDetails
      ),
  },
  { path: '**', redirectTo: '' },
];
