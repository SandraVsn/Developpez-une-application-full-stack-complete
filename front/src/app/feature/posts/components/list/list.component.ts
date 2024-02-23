import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../../components/header/header.component';
import { PostApiService } from '../../services/post-api.service';
import { Post } from '../../interfaces/post.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './list.component.html',
})
export class ListComponent {
  
  private readonly postApiService = inject(PostApiService) 

  public posts$!: Observable<Post[] | undefined>;
  public onError = false;

  ngOnInit(): void {
    this.posts$ = this.postApiService.getAll().pipe(catchError(()=>{
      this.onError = true;
      return of(undefined);
    }));
  }
}
