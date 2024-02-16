import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../components/header/header.component';
import { PostApiService } from '../../services/post-api.service';
import { Post } from '../../interfaces/post.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './list.component.html',
})
export class ListComponent {
  constructor(private postApiService: PostApiService) {}

  public posts: Post[] = [];
  public loaded = false;
  public onError = false;

  ngOnInit(): void {
    this.postApiService.getAll().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loaded = true;
      },
      error: () => this.onError = true,
    });
  }
}
