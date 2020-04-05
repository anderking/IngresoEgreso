import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { ModalsComponent } from './modals/modals.component';


@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ModalsComponent,
    ContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ModalsComponent,
    ContainerComponent,
  ]
})
export class SharedModule { }
