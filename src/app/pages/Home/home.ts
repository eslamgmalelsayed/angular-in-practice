import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// Components
import { SearchBar } from '@/app/components/search-bar/search-bar';
import { MovieCard } from '@/app/components/movie-card/movie-card';
// Services
import { ApiService } from '@/app/services/api.service';
// Models
import type { Movie, MovieApiResponse } from '@/app/models/movie.model';
// Constants
import { API_ENDPOINTS } from '@/app/constants/api-endpoints';

@Component({
  selector: 'app-home',
  imports: [SearchBar, MovieCard, CommonModule, MatProgressSpinnerModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  // Data
  movies: Movie[] = [];
  isLoading = false;

  constructor(private apiService: ApiService) {}

  // Methods
  onMovieSearch(query: string) {
    this.isLoading = true;
    this.apiService
      .get<Movie>(`${API_ENDPOINTS.SEARCH_MOVIES}${encodeURIComponent(query)}`)
      .subscribe({
        next: (response: MovieApiResponse) => {
          this.movies = response.data;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          // Error handling is done automatically by ErrorHandlerService
        },
      });
  }
}
