import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { UpdateUser } from '../interfaces/updateUser.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:9000/api/user';

  private user: User = {
    id: 1,
    userName: 'test',
    email: 'test@mail.com',
    created_at: new Date(),
    updated_at: new Date(),
    topics: [
      {
        id: 1,
        name: 'topic',
        description: 'topic',
      },
      {
        id: 2,
        name: 'topic2',
        description: 'topic2',
      },
      {
        id: 3,
        name: 'topic3',
        description: 'topic3',
      },
    ],
  };

  constructor(private httpClient: HttpClient) {}

  public getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/${id}`);
  }

  public update(updateUserDto: UpdateUser): Observable<User> {
    this.user.userName = updateUserDto.userName
    this.user.email = updateUserDto.email
    return of(this.user)
    return this.httpClient.post<User>(this.url, updateUserDto);
  }

  public subscribeToTopic(topicId: number): Observable<User> {
    this.user.topics.push({ id: topicId, name: 'New', description: 'New' });
    return of(this.user);
    return this.httpClient.post<User>(`${this.url}/subscribe/${topicId}`, null);
  }

  public unsubscribeFromTopic(topicId: number): Observable<User> {
    this.user.topics.filter((topic) => topic.id !== topicId);
    return of(this.user);
    return this.httpClient.delete<User>(`${this.url}/unsubscribe/${topicId}`);
  }
}
