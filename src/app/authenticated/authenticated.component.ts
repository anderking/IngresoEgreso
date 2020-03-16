import { Component, OnInit } from '@angular/core';
import { IngresoEgresoService } from '../core/services/configuration/ingreso-egreso.service';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.scss']
})
export class AuthenticatedComponent implements OnInit {

  constructor(
    private _ingresoEgresoService:IngresoEgresoService,
  ) {
  }

  ngOnInit(): void {
    this._ingresoEgresoService.initIngresoEgresoListener();
  }

}
