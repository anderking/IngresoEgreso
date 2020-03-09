import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  public isLoading: boolean;

  public _subcriptionRegister: Subscription = new Subscription();

  constructor(
    private _authService: AuthService,
    private _store: Store<AppState>
  ) { }

  ngOnInit() {
    this._subcriptionRegister = this._store.select('ui').subscribe(ui => {
      this.isLoading = ui.isLoading;
    });
  }

  ngOnDestroy() {
    this._subcriptionRegister.unsubscribe();
  }

  onSubmit(data: any) {
    this._authService.createUser(data.email, data.password, data.firstName);
  }

}
