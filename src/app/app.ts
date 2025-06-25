import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchBar } from './components/search-bar/search-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchBar, MatToolbarModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'search-movies';
  
  onMovieSearch(query: string) {
    console.log('Searching for:', query);
    // TODO: Implement movie search logic
  }
}
