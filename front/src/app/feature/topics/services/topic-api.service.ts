import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../interfaces/topic.interface';

@Injectable({
  providedIn: 'root',
})
export class TopicApiService {
  private url = 'http://localhost:9000/api/topic';

  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(this.url);
  }
}
