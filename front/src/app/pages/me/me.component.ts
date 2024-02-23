import { Component, inject } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Topic } from '../../feature/topics/interfaces/topic.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../feature/auth/services/auth.service';
import { Observable, catchError, of, take, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [
    CommonModule,
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

  private readonly router = inject(Router)
  private readonly authService = inject(AuthService)
  private readonly userService = inject(UserService)
  private readonly fb = inject(FormBuilder)

  public loaded = false;
  public onError = false;
  public user$!: Observable<User | undefined>;
  public topics!: Topic[];
  public updated: boolean = false;
  public form!: FormGroup;



  ngOnInit(): void {
    this.user$ = this.authService.me().pipe(
      tap(user =>{
        this.topics = user.topics
        this.form = this.fb.group({
          userName: [
            user.userName,
            [Validators.required, Validators.minLength(3)],
          ],
          email: [user.email, [Validators.required, Validators.email]],
        });
      }),
      catchError(() => {
        this.onError = true;
        return of(undefined);
      })
    )
  }

  unsubscribe(topicId: number) {
    this.userService.unsubscribeFromTopic(topicId).pipe(take(1)).subscribe({
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
   this.user$ = this.userService.update(this.form.value).pipe(take(1));
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
