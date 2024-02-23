import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../feature/auth/services/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly router = inject(Router)
  private readonly authService = inject(AuthService)

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.me().pipe(take(1)).subscribe({
        next: () => {
          this.router.navigate(['/posts'])
        }
      });
    }
  }
}
