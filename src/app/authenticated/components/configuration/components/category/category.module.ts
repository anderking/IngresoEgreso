import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryShowComponent } from './category-show/category-show.component';
import { TokenInterceptorService } from 'src/app/core/services/token-interceptor.service';

@NgModule({
  declarations: [
  	CategoryComponent,
  	CategoriesComponent,
  	CategoryCreateComponent,
  	CategoryShowComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CategoryRoutingModule
  ],
  providers:
  [
    //CategoryService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi: true
    },
  ],
})
export class CategoryModule { }
