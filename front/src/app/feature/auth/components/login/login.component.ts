import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

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

  public form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.min(3)]],
  });

  constructor(
    //private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location
  ) //private sessionService: SessionService
  {}

  public submit(): void {
    // const loginRequest = this.form.value as LoginRequest;
    // this.authService.login(loginRequest).subscribe({
    //   next: (response: SessionInformation) => {
    //     this.sessionService.logIn(response);
    //     this.router.navigate(['/sessions']);
    //   },
    //   error: error => this.onError = true,
    // });
  }

  public goBack(): void {
    this.location.back();
  }
}
