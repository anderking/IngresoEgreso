import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import * as fireBase from 'firebase'
import { map, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { ActivateLoadingAction, DeactivateLoadingAction } from '../../store/actions/ui.actions';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { SetItemsAction, UnsetItemsAction } from '../../store/actions/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  private _IngresoEgresoItemsSubscription: Subscription = new Subscription();
  private _IngresoEgresoListenerSubscription: Subscription = new Subscription();

  constructor(
    private _afAuth: AngularFireAuth,
    private _authService: AuthService,
    private _router: Router,
    private _afDB: AngularFirestore,
    private _store: Store<AppState>,
  ) {
  }

  cancelSubscription() {
    this._IngresoEgresoListenerSubscription.unsubscribe();
    this._IngresoEgresoItemsSubscription.unsubscribe();
    this._store.dispatch(new UnsetItemsAction());
  }

  //Creamos un IngresoEgreso dentro de la collection de usuarios colocando otra collection de items que guardarán todos los IngresoEgreso
  createIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const user = this._authService.getUser();
    return this._afDB.doc(`${user.uid}/ingresos-egresos`)
      .collection('items').add({ ...ingresoEgreso })
  }

  //Escuchamos todos los IngresoEgreso registrados.
  initIngresoEgresoListener() {
    this._store.select('auth')
      .pipe(filter(auth => auth.user != null))
      .subscribe(auth => {
        this.getIngresoEgresoItems(auth.user.uid);
      })
  }

  //Obtenemos los items de los IngresoEgreso de forma asincrona, si se produce un cambio, este se verá reflajado de forma inmediata ya que estamos siempre escuchando la collection de items desde la BD de FireBase a traves de esta función. luego le asignamos el id del usuario a cada uno de esos items para identificar a que usuario pertenecen esos items
  getIngresoEgresoItems(uid: string) {
    this._afDB.collection(`${uid}/ingresos-egresos/items`).snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map((data: any) => {
            return {
              uid: data.payload.doc.id,
              ...data.payload.doc.data(),
            };
          });
        })
      )
      .subscribe((items: any[]) => {
        this._store.dispatch(new SetItemsAction(items));
      });
  }

  //Eliminamos un IngresoEgreso
  deleteIngresoEgreso(uid: string) {
    const user = this._authService.getUser();
    return this._afDB.doc(`${user.uid}/ingresos-egresos/items/${uid}`)
      .delete();
  }
}
