import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-bar',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss'
})
export class SearchBar {
  title = 'Search Movies';
  label = 'Search for movies...';
  searchQuery = new FormControl('');
  form = new FormGroup({
    search: this.searchQuery
  });

  @Output() onSearch = new EventEmitter<string>();
  
  // Methods
  onSubmit() {
    this.onSearch.emit(this.searchQuery.value || '');
  }
}
