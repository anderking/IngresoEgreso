import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';


@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
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
    ContainerComponent,
  ]
})
export class SharedModule { }
