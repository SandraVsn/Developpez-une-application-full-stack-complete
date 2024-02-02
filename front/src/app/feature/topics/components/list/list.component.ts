import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TopicApiService } from '../../services/topic-api.service';
import { Topic } from '../../interfaces/topic.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [HeaderComponent, MatIconModule, MatButtonModule],
  templateUrl: './list.component.html',
})
export class ListComponent {

  constructor(private topicApiService: TopicApiService){}

  public topics: Topic[] = [];
  public loaded = false;
  public onError = false;

  ngOnInit(): void {
    this.topicApiService.getAll().subscribe({
      next: (topics) => {
        this.topics = topics;
        this.loaded = true;
      },
      error: () => this.onError = true,
    });
  }

}
