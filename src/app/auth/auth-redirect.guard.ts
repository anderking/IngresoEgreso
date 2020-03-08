import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectGuard implements CanActivate {

  private IsAuth:boolean;

  constructor
    (
      private authService: AuthService,
      private router: Router,
  ) {
    
  }

  canActivate(){
    return this.authService.isAuthRedirect().pipe(take(1))
  }

}
