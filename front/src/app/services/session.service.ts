import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public isLogged = signal(false);
  public user: User | undefined;

  public logIn(user: User): void {
    this.user = user;
    this.isLogged.update(val => val = true);
  }

  public logOut(): void {
    localStorage.removeItem('token');
    this.user = undefined;
    this.isLogged.update(val => val = false);
  }
}
