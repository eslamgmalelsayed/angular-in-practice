import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
// Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// Models
import type { Movie } from '@/app/models/movie.model';

@Component({
  selector: 'app-movie-card',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {
  @Input() movie!: Movie;

  imageLoading = true;
  imageError = false;

  constructor(private router: Router) {}

  onCardClick(): void {
    this.router.navigate(['/movie', this.movie['#IMDB_ID']], {
      state: { movie: this.movie },
    });
  }

  onImageLoad(): void {
    this.imageLoading = false;
    this.imageError = false;
  }

  onImageError(): void {
    this.imageLoading = false;
    this.imageError = true;
  }
}
