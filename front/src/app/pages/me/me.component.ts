import { Component } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { UserService } from '../../services/user.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TopicApiService } from '../../feature/topics/services/topic-api.service';
import { Topic } from '../../feature/topics/interfaces/topic.interface';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../feature/auth/services/auth.service';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [
    HeaderComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './me.component.html',
})
export class MeComponent {
  public loaded = false;
  public onError = false;
  public user!: User;
  public topics!: Topic[];
  public updated: boolean = false;
  public form!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private sessionService: SessionService,
    private fb: FormBuilder
  ) {}

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
