import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Topic } from '../interfaces/topic.interface';

@Injectable({
  providedIn: 'root',
})
export class TopicApiService {
  private url = 'http://localhost:9000/api/topic';

  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<Topic[]> {
    const topics: Topic[] = [
      {
        id: 1,
        name: 'test',
        description: 'test',
      },
      {
        id: 2,
        name: 'test2',
        description: 'test2',
      },
      {
        id: 3,
        name: 'test3',
        description: 'test3',
      },
    ];
    return of(topics);
    return this.httpClient.get<Topic[]>(this.url);
  }
}
