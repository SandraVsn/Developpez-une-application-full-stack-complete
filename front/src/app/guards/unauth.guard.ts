import {Injectable, inject} from "@angular/core";
import {CanActivateFn, Router} from "@angular/router"; 
import { SessionService } from "../services/session.service";

@Injectable({ providedIn: 'root' })
 export class UnauthGuardService {

 constructor(
 private sessionService: SessionService,
 public router: Router,
 ) { }

 public canActivate(): boolean {
    if (this.sessionService.isLogged()) {
      this.router.navigate(['rentals']);
      return false;
    }
    return true;
  }

 }

export const authGuard: CanActivateFn = (route, state) => {
  return inject(UnauthGuardService).canActivate();
};