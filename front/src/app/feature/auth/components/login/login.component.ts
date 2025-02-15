import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { AuthSuccess } from '../../interfaces/authSuccess.interface';
import { LoginRequest } from '../../interfaces/loginRequest.interface';
import { User } from '../../../../interfaces/user.interface';
import { retry, take } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public hide = true;
  public onError = false;
  public badCredentials = false;

  public form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.min(3)]],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
  ) {}

  public submit(): void {
    const loginRequest = this.form.value as LoginRequest;
    this.authService.login(loginRequest).pipe(take(1)).subscribe({
      next: (response: AuthSuccess) => {
        localStorage.setItem('token', response.token);
        this.authService.me().subscribe((user: User) => {
          this.router.navigate(['/posts']);
        });
        this.router.navigate(['/posts']);
      },
      error: ({ error }) => {
        if (error === 'Bad credentials') {
          this.badCredentials = true;
        } else {
          this.onError = true;
          localStorage.removeItem('token');
          retry(1);
        }
      },
    });
  }

  public goBack(): void {
    this.location.back();
  }
}
