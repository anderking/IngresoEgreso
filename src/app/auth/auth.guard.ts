import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor
  (
    private authService: AuthService,
    private router: Router,
  )
  {
  }

  canLoad(){
    return this.authService.isAuth().pipe(take(1))
  }
  
}
