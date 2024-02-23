import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RegisterRequest } from '../../interfaces/registerRequest.interface';
import { AuthService } from '../../services/auth.service';
import { AuthSuccess } from '../../interfaces/authSuccess.interface';
import { take } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  public hide = true;
  public onError = false;

  public form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    userName: [
      '',
      [Validators.required, Validators.min(3), Validators.max(20)],
    ],
    password: [
      '',
      // Au moins une minuscule, majuscule, chiffre, caractère spécial, pas d'espace, mini 8 caractères
      [Validators.required, Validators.min(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+!=*])(?=\S+$).{8,}$/),], 
    ],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
  ) {}

  public submit(): void {
    const registerRequest = this.form.value as RegisterRequest;
    this.authService.register(registerRequest).pipe(take(1)).subscribe({
      next: (response: AuthSuccess) => {
        localStorage.setItem('token', response.token);
        this.authService.me().subscribe(() => {
          this.router.navigate(['/posts']);
        });
      },
      error: () => {
        this.onError = true;
      },
    });
  }

  public goBack(): void {
    this.location.back();
  }
}
