import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../../components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostApiService } from '../../services/post-api.service';
import { CommentApiService } from '../../services/comment-api.service';
import { CommonModule, Location } from '@angular/common';
import { Post } from '../../interfaces/post.interface';
import { MatIconModule } from '@angular/material/icon';
import { Comment } from '../../interfaces/comment.interface';
import { Observable, catchError, map, of, take } from 'rxjs';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './detail.component.html',
})
export class DetailComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly postApiService = inject(PostApiService);
  private readonly commentApiService = inject(CommentApiService);
  private readonly location = inject(Location);

  public onError = false;
  public post$!: Observable<Post | undefined>;
  public comments$!: Observable<Comment[] | undefined>;

  public form: FormGroup = this.fb.group({
    content: ['', [Validators.required, Validators.minLength(3)]],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.post$ = this.postApiService.getOne(id).pipe(
      map((post) => {
        if (post) {
          return post;
        } else {
          this.router.navigate(['/posts']);
          throw new Error('Post not found');
        }
      }),
      catchError(() => {
        this.onError = true;
        return of(undefined);
      })
    );
    this.comments$ = this.commentApiService.getAllByPostId(id).pipe(
      catchError(() => {
        this.onError = true;
        return of(undefined);
      })
    );
  }

  submit(postId: number) {
    console.log(postId)
    const commentDto = {
      content: this.form.value.content,
      postId,
    };
    this.comments$ = this.commentApiService.create(commentDto).pipe(take(1));
    this.form.reset();
  }

  goBack() {
    this.location.back();
  }
}
