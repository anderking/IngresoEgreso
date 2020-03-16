import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoService } from 'src/app/core/services/configuration/ingreso-egreso.service';
import { ActivateLoadingAction, DeactivateLoadingAction } from 'src/app/core/store/actions/ui.actions';
import { IngresoEgreso } from 'src/app/core/models/ingreso-egreso.model';

@Component({
  selector: 'app-ingreso-egreso-create',
  templateUrl: './ingreso-egreso-create.component.html',
  styles: []
})
export class IngresoEgresoCreateComponent implements OnInit, OnDestroy {

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
    const ingresoEgreso:IngresoEgreso = { ...this.formGroup.value, type: this.type };
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
