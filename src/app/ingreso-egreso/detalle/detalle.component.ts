import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2'
import { ActivateLoadingAction, DeactivateLoadingAction } from 'src/app/shared/ui.actions';
import { filter, tap } from 'rxjs/operators';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit {

  items:IngresoEgreso[]=[];
  public isLoading:boolean;

  subcriptionIE:Subscription = new Subscription();
  subscriptionLoading:Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private _ingresoEgresoService: IngresoEgresoService
    ) { }

  ngOnInit() {
    this.store.dispatch(new ActivateLoadingAction());

    this.subscriptionLoading= this.store.select('ui').subscribe( ui => {
      this.isLoading = ui.isLoading;
    });
    
    this.subcriptionIE = this.store.select('IE').pipe(
      filter(IE => IE.items!=null),
    )
    .subscribe(IE => {
      this.items = IE.items;
      if(this.items.length>=0){
        this.store.dispatch(new DeactivateLoadingAction());
      }
    })
  }

  delete(item:IngresoEgreso){
    this._ingresoEgresoService.deleteIngresoEgreso(item.uid)
    .then( ()=>{
      Swal.fire({
        icon: 'success',
        title: 'Excelente!',
        text: 'IngresoEgreso Creado Correctamente',
      })
    })
    .catch(error=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    })
  }

  ngOnDestroy(): void {
    this.subcriptionIE.unsubscribe();
    this.subscriptionLoading.unsubscribe();
  }

}
