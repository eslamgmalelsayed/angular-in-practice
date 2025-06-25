import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss'
})
export class SearchBar {
  title = 'Search Movies';
  label = 'Search';
  model = new FormControl('');
  form = new FormGroup({
    search: this.model
  });
  @Output() onSearch = new EventEmitter<string>();
  
  // Methods
  onSubmit(e: Event) {
    e.preventDefault();
    this.onSearch.emit(this.model.value || '');
  }
}
