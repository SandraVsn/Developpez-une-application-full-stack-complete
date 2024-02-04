import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthSuccess } from '../interfaces/authSuccess.interface';
import { RegisterRequest } from '../interfaces/registerRequest.interface';
import { LoginRequest } from '../interfaces/loginRequest.interface';
import { User } from '../../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:9000/api/auth';

  constructor(private httpClient: HttpClient) {}

  public register(registerRequest: RegisterRequest): Observable<AuthSuccess> {
    return of({ token: 'Token' });
    return this.httpClient.post<AuthSuccess>(
      `${this.url}/register`,
      registerRequest
    );
  }

  public login(loginRequest: LoginRequest): Observable<AuthSuccess> {
    return of({ token: 'Token' });
    return this.httpClient.post<AuthSuccess>(`${this.url}/login`, loginRequest);
  }

  public me(): Observable<User> {
    const user: User = {
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
    return of(user);
    return this.httpClient.get<User>(`${this.url}/me`);
  }
}
