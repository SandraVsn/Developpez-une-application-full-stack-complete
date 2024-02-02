import {Injectable, inject} from "@angular/core";
import {CanActivateFn, Router} from "@angular/router"; 
import { SessionService } from "../services/session.service";

@Injectable({ providedIn: 'root' })
 export class AuthGuardService {

 constructor(
 private sessionService: SessionService,
 public router: Router,
 ) { }

 public canActivate(): boolean {
    if (!this.sessionService.isLogged()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

 }

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthGuardService).canActivate();
};