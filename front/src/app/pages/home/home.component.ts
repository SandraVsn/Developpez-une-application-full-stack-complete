import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../feature/auth/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    // this.authService.me().subscribe({
    //   next: (user) => {
    //     if(user){
    //       this.router.navigate(['/posts']);
    //     }
    //   },
    // });
  }
}
