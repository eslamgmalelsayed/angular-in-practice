import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchBar } from './search-bar/search-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchBar],
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
