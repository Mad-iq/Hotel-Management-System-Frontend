import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../../core/auth/auth.service';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import {MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,private snackBar: MatSnackBar, private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = null;

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.loading = false;
        console.log('Login successful');
         this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
  const message = err.error?.error || 'Registration failed. Please try again.';
  this.snackBar.open(message, 'Close', {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['snackbar-error']
  });
  console.error(err);
      },
    });
  }
}
