import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import type { Movie } from '@/app/models/movie.model';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss',
})
export class MovieDetails implements OnInit {
  movie: Movie | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Get the movie object from navigation state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.movie = navigation.extras.state['movie'];
    } else {
      const state = history.state;
      if (state && state.movie) {
        this.movie = state.movie;
      }
    }

    if (!this.movie) {
      this.goBack();
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
