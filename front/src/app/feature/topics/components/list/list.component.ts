import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../../components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TopicApiService } from '../../services/topic-api.service';
import { Topic } from '../../interfaces/topic.interface';
import { UserService } from '../../../../services/user.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Observable, catchError, of, take } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MatIconModule, MatButtonModule],
  templateUrl: './list.component.html',
})
export class ListComponent {
  private readonly topicApiService = inject(TopicApiService);
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);

  public topics$!: Observable<Topic[] | undefined>;
  public userTopics: Topic[] = [];
  public onError = false;

  ngOnInit(): void {
    this.topics$ = this.topicApiService.getAll().pipe(
      catchError(() => {
        this.onError = true;
        return of(undefined);
      })
    );
    this.getUserTopics();
  }

  subscribe(topicId: number) {
    this.userService
      .subscribeToTopic(topicId)
      .pipe(take(1))
      .subscribe({
        next: () => this.getUserTopics(),
        error: () => (this.onError = true),
      });
  }

  getUserTopics() {
    this.authService
      .me()
      .pipe(
        take(1),
        catchError(() => {
          this.onError = true;
          return of(undefined);
        })
      )
      .subscribe({
        next: (user) => {
          if (user) {
            this.userTopics = user?.topics;
          } else {
            throw new Error('User not found');
          }
        },
      });
  }

  disabled(topicId: number) {
    return this.userTopics.find((topic) => topic.id === topicId);
  }
}
