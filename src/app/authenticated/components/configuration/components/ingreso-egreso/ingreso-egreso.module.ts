import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IngresoEgresoRoutingModule } from './ingreso-egreso-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { IngresosEgresosComponent } from './ingresos-egresos/ingresos-egresos.component';
import { IngresoEgresoCreateComponent } from './ingreso-egreso-create/ingreso-egreso-create.component';
import { IngresoEgresoShowComponent } from './ingreso-egreso-show/ingreso-egreso-show.component';
import { IngresoEgresoService } from 'src/app/core/services/configuration/ingreso-egreso.service';
import { TokenInterceptorService } from 'src/app/core/services/token-interceptor.service';


@NgModule({
  declarations: [
  	IngresoEgresoComponent,
  	IngresosEgresosComponent,
  	IngresoEgresoCreateComponent,
  	IngresoEgresoShowComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IngresoEgresoRoutingModule
  ],
  providers:
  [
    IngresoEgresoService,    
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi: true
    },
  ],
})
export class IngresoEgresoModule { }
