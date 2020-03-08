import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2'
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ActivateLoadingAction, DeactivateLoadingAction } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  public formGroup: FormGroup;
  public type = 'ingreso';
  public isLoading: boolean;
  public subcription: Subscription = new Subscription();

  constructor(
    private _ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      'description': new FormControl('', Validators.required),
      'amount': new FormControl(0, Validators.min(0))
    })
    this.subcription = this.store.select('ui').subscribe(ui => {
      this.isLoading = ui.isLoading;
    });
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  onSubmit() {
    this.store.dispatch(new ActivateLoadingAction());
    const ingresoEgreso = new IngresoEgreso({ ...this.formGroup.value, type: this.type });
    this._ingresoEgresoService.createIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.store.dispatch(new DeactivateLoadingAction());
        this.formGroup.reset({
          amount: 0
        })
        Swal.fire({
          icon: 'success',
          title: 'Excelente!',
          text: 'IngresoEgreso Creado Correctamente',
        })
      })
      .catch(error => {
        this.store.dispatch(new DeactivateLoadingAction());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
      })
  }

}
