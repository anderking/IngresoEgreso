import { Injectable, OnInit } from '@angular/core';
import { CanLoad, Router, CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectGuard implements OnInit, CanLoad, CanActivate {

  private IsAuth:boolean;

  constructor
    (
      private authService: AuthService,
      private router: Router,
  ){ 
  }

  ngOnInit():void{
  }

  canLoad(){
    return this.authService.isAuthRedirect().pipe(take(1))
  }

  canActivate(){
    return this.authService.isAuthRedirect().pipe(take(1))
  }

}
