import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2'
import { ActivateLoadingAction, DeactivateLoadingAction } from 'src/app/core/store/actions/ui.actions';
import { filter, tap } from 'rxjs/operators';
import { IngresoEgreso } from 'src/app/core/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/core/services/configuration/ingreso-egreso.service';

@Component({
  selector: 'app-ingresos-egresos',
  templateUrl: './ingresos-egresos.component.html',
  styleUrls: ['./ingresos-egresos.component.scss']
})
export class IngresosEgresosComponent implements OnInit {

  public isLoading:boolean;
  public items:IngresoEgreso[]=[];

  private _subcriptionIE:Subscription = new Subscription();
  private _subscriptionLoading:Subscription = new Subscription();

  constructor(
    private _store: Store<AppState>,
    private _ingresoEgresoService: IngresoEgresoService
    ) { }

  ngOnInit() {
    this._store.dispatch(new ActivateLoadingAction());

    this._subscriptionLoading= this._store.select('ui').subscribe( ui => {
      this.isLoading = ui.isLoading;
    });
    
    this._subcriptionIE = this._store.select('IE').pipe(
      filter(IE => IE.items!=null),
    )
    .subscribe(IE => {
      this.items = IE.items;
      if(this.items){
        this._store.dispatch(new DeactivateLoadingAction());
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
    this._subcriptionIE.unsubscribe();
    this._subscriptionLoading.unsubscribe();
  }

}
