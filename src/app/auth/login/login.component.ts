import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  public isLoading: boolean;
  
  private _subcriptionLogin: Subscription = new Subscription();

  constructor(
    private _authService: AuthService,
    private _store: Store<AppState>
  ) { }

  ngOnInit() {
    this._subcriptionLogin = this._store.select('ui').subscribe(ui => {
      this.isLoading = ui.isLoading;
    });
  }

  ngOnDestroy() {
    this._subcriptionLogin.unsubscribe();
  }

  onSubmit(data: any) {
    this._authService.loginUser(data.email, data.password);
  }

}
