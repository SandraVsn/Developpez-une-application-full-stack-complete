import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TopicApiService } from '../../services/topic-api.service';
import { Topic } from '../../interfaces/topic.interface';
import { UserService } from '../../../../services/user.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [HeaderComponent, MatIconModule, MatButtonModule],
  templateUrl: './list.component.html',
})
export class ListComponent {

  constructor(private topicApiService: TopicApiService, private userService: UserService, private authService: AuthService){}

  public topics: Topic[] = []
  public userTopics: Topic[] = []
  public loaded = false;
  public onError = false;

  ngOnInit(): void {
    this.topicApiService.getAll().subscribe({
      next: (topics) => {
        this.topics = topics;
        this.getUserTopics()
        this.loaded = true;
      },
      error: () => this.onError = true,
    });
  }

  subscribe(topicId: number){
    this.userService.subscribeToTopic(topicId).subscribe({
      next: () => this.getUserTopics(), 
      error: () => this.onError = true
    })
  }

  getUserTopics(){
    this.authService.me().subscribe({
      next: (user) => {
        this.userTopics = user.topics;
      },
      error: () => this.onError = true,
    });
  }

  disabled(topicId: number){
    return this.userTopics.find(topic => topic.id === topicId)
  }

}
