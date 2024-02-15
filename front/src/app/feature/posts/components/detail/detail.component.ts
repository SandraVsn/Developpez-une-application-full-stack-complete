import { Component } from '@angular/core';
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
import { Location } from '@angular/common';
import { Post } from '../../interfaces/post.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
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
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, 
    private postApiService: PostApiService, 
    private commentApiService: CommentApiService,
    private location: Location
  ) {}

  public loaded = false;
  public onError = false;
  public postId!: number;
  public post!: Post;
  public comments: Comment[] = []

  public form: FormGroup = this.fb.group({
    description: ['', [Validators.required, Validators.minLength(3)]],
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.postApiService.getOne(id).subscribe({
            next: (post) => {
              this.post = post
              this.loaded = true
            }
          })
          this.commentApiService.getAllByPostId(id).subscribe({

          })
          
        } else {
          this.router.navigate(['/posts']);
        }
      },
      error: () => (this.onError = true),
    });
  }

  submit() {}

  goBack(){
    this.location.back();
  }
}
