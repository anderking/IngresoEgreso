import { Injectable, OnInit } from '@angular/core';
import { CanLoad, Router  } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, OnInit {

  constructor
  (
    private authService: AuthService,
    private router: Router,
  ){
  }

  ngOnInit(): void {
  }

  canLoad(){
    return this.authService.isAuth().pipe(take(1))
  }
  
}
