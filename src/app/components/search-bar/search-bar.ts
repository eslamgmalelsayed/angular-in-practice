import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-bar',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar implements OnInit {
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  // Emitters
  @Output() searchQuery = new EventEmitter<string>();

  // Data
  label = 'Search for movies...';
  formData!: FormGroup;

  ngOnInit(): void {
    this.formData = this.fb.group({
      searchQuery: ['', Validators.required],
    });
  }

  // Methods
  onSubmit() {
    const query = this.formData.get('searchQuery')?.value || '';
    if (!this.formData.valid || !query.trim()) {
      this.snackBar.open('Please enter a valid search query', 'Close', {
        duration: 2000,
        panelClass: ['error-snackbar'],
      });
      return;
    }

    this.searchQuery.emit(query);
  }
}
