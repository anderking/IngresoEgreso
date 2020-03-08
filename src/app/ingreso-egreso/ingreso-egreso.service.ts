import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import * as fireBase from 'firebase'
import { map, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivateLoadingAction, DeactivateLoadingAction } from '../shared/ui.actions';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { IngresoEgreso } from './ingreso-egreso.model';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  IngresoEgresoListenerSubscription:Subscription = new Subscription();
  IngresoEgresoItemsSubscription:Subscription = new Subscription();

  constructor(
    public afAuth: AngularFireAuth,
    public authService:AuthService,
    private router:Router,
    private afDB:AngularFirestore,
    private store:Store<AppState>,
  ) {
   }

   cancelSubscription(){
    this.IngresoEgresoListenerSubscription.unsubscribe();
    this.IngresoEgresoItemsSubscription.unsubscribe();
    this.store.dispatch(new UnsetItemsAction());
   }

  createIngresoEgreso(ingresoEgreso:IngresoEgreso){
    const user = this.authService.getUser();
    return this.afDB.doc(`${user.uid}/ingresos-egresos`)
    .collection('items').add({...ingresoEgreso})
  }

  initIngresoEgresoListener(){
    this.store.select('auth')
    .pipe(filter(auth=>auth.user!=null))
    .subscribe(auth=>{
      this.getIngresoEgresoItems(auth.user.uid);
    })
  }

  getIngresoEgresoItems(uid:string){
    this.afDB.collection(`${uid}/ingresos-egresos/items`).snapshotChanges()
    .pipe(
      map(docData=>{
        return docData.map((data:any)=>{
          return {
            uid: data.payload.doc.id,
            ...data.payload.doc.data(),

          };
        });
      })
    )
    .subscribe((items:any[])=>{
      this.store.dispatch(new SetItemsAction(items));
    });
  }

  deleteIngresoEgreso(uid:string){
    const user = this.authService.getUser();
    return this.afDB.doc(`${user.uid}/ingresos-egresos/items/${uid}`)
    .delete();
  }
}
