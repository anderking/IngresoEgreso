import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from 'src/app/core/services/configuration/ingreso-egreso.service';
import { DeactivateLoadingAction } from '../../core/store/actions/ui.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  public user:User;

  private _subscription:Subscription = new Subscription();

  constructor(
    private _authService:AuthService,
    private _store:Store<AppState>,
    private _ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit() {

    this._subscription = this._store.select('auth').pipe(
      filter(auth=>auth.user!=null)
    )
    .subscribe(auth=>{
      this.user = auth.user;
    });

  }

  logout(){
    this._authService.logut();
    this._ingresoEgresoService.cancelSubscription();
    this._store.dispatch( new DeactivateLoadingAction());
  }

}
