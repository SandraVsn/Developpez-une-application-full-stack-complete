import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';




@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatMenuModule, MatIconModule, MatListModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  constructor(private router: Router) {}
  public ROUTES = [
    { path: '/posts', label: 'Articles' },
    { path: '/topics', label: 'Thèmes' },
  ];

  isActive(path: string): boolean {
    return this.router.url === path;
  }
}
