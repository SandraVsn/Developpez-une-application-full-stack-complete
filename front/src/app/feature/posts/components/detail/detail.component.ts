import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostApiService } from '../../services/post-api.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    HeaderComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './detail.component.html',
})
export class DetailComponent {

  constructor(
    private router: Router,
    private fb: FormBuilder 
    private postApiService: PostApiService,
    private commentApiService: CommentApi
  ) {}

  public loaded = false;
  public onError = false;
  public form: FormGroup = this.fb.group({
    description: ['', [Validators.required, Validators.minLength(3)]],
  });;

 

  ngOnInit(): void {
    this.authService.me().subscribe({
      next: (user) => {
        this.user = user;
        this.topics = user.topics;
        this.loaded = true;
        this.form = this.fb.group({
          userName: [
            user.userName,
            [Validators.required, Validators.minLength(3)],
          ],
          email: [user.email, [Validators.required, Validators.email]],
        });
      },
      error: () => (this.onError = true),
    });
  }

  unsubscribe(topicId: number) {
    this.userService.unsubscribeFromTopic(topicId).subscribe({
      next: (user) => {
        this.topics = user.topics;
        this.updated = true;
        setTimeout(() => {
          this.updated = false;
        }, 3000);
      },
      error: () => (this.onError = true),
    });
  }

  submit() {
    this.userService.update(this.form.value).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: () => (this.onError = true),
    });
  }

  logout() {
    this.sessionService.logOut();
    this.router.navigate(['/']);
  }

}


