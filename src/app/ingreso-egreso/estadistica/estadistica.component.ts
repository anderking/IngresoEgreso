import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import { Label } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { filter, tap } from 'rxjs/operators';
import { ActivateLoadingAction, DeactivateLoadingAction } from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  items:IngresoEgreso[]=[];
  public isLoading:boolean;

  subcriptionStadistic:Subscription = new Subscription();
  subscriptionLoading:Subscription = new Subscription();
  totalIngresos:any;
  totalEgresos:any;
  cantIngresos:any;
  cantEgresos:any;

  public pieChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartColors = [
    {
      backgroundColor: ['rgba(40, 167, 69, 1)', 'rgba(220, 53, 69, 1)'],
    },
  ];
  
  constructor(
    private _ingresoEgresoService:IngresoEgresoService,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.store.dispatch(new ActivateLoadingAction());

    this.subscriptionLoading= this.store.select('ui').subscribe( ui => {
      this.isLoading = ui.isLoading;
      //console.log(this.isLoading)
    });


    this.subcriptionStadistic = this.store.select('IE').pipe(
      //tap(x=>console.log(x)),
      filter(IE => IE.items.length>=0),
    )
    .subscribe(IE => {
      this.items = IE.items;
      //console.log(this.items===[])
      this.calculate(this.items);
      if(this.items.length>=0){
        this.store.dispatch(new DeactivateLoadingAction());
      }
    })


  }

  calculate(items:IngresoEgreso[]){
    this.totalIngresos=0;
    this.totalEgresos=0;
    this.cantIngresos=0;
    this.cantEgresos=0;
    items.forEach(item=>{
      if(item.type=='ingreso'){
        this.totalIngresos += item.amount;
        this.cantIngresos++
      }

      if(item.type=='egreso'){
        this.totalEgresos += item.amount;
        this.cantEgresos++
      }
    })
    this.pieChartData = [this.totalIngresos,this.totalEgresos]
  }

  ngOnDestroy(): void {
    this.subcriptionStadistic.unsubscribe();
    this.subscriptionLoading.unsubscribe();
  }

}
