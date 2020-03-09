import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { filter, tap } from 'rxjs/operators';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  public user:User;

  private _subscription:Subscription = new Subscription();

  constructor(
    private _store:Store<AppState>
  ) { }

  ngOnInit() {

    this._subscription = this._store.select('auth').pipe(
      filter(auth=>auth.user!=null)
    )
    .subscribe(auth=>{
      this.user = auth.user;
    });

  }

}
