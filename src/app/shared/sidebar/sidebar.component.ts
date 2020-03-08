import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from 'src/app/ingreso-egreso/ingreso-egreso.service';
import { DeactivateLoadingAction } from '../ui.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  subscrption:Subscription = new Subscription();
  user:User;

  constructor(
    private authService:AuthService,
    private store:Store<AppState>,
    private _ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit() {

    this.subscrption = this.store.select('auth').pipe(
      filter(auth=>auth.user!=null)
    )
    .subscribe(auth=>{
      this.user = auth.user;
    });

  }

  logout(){
    this.authService.logut();
    this._ingresoEgresoService.cancelSubscription();
    this.store.dispatch( new DeactivateLoadingAction());
  }

}
