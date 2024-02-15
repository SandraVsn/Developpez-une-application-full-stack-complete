import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { UpdateUser } from '../interfaces/updateUser.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:9000/api/user';

  constructor(private httpClient: HttpClient) {}

  public getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/${id}`);
  }

  public update(updateUserDto: UpdateUser): Observable<User> {
    return this.httpClient.post<User>(this.url, updateUserDto);
  }

  public subscribeToTopic(topicId: number): Observable<User> {
    return this.httpClient.post<User>(`${this.url}/subscribe/${topicId}`, null);
  }

  public unsubscribeFromTopic(topicId: number): Observable<User> {
    return this.httpClient.delete<User>(`${this.url}/unsubscribe/${topicId}`);
  }
}
