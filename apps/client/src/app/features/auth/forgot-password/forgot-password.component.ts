import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  forgotPasswordForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { email } = this.forgotPasswordForm.value;
    const { error } = await this.authService.resetPasswordForEmail(email);

    this.isLoading = false;

    if (error) {
      this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
    } else {
      this.successMessage = 'Un email de réinitialisation a été envoyé à votre adresse email.';
      this.forgotPasswordForm.reset();
    }
  }
}