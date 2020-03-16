import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryShowComponent } from './category-show/category-show.component';

const routes: Routes = [

	{path: '', component: CategoryComponent, canActivate: [],
		children:
		[
			{path: '', component: CategoriesComponent},
			{path: 'create', component: CategoryCreateComponent},
			{path: 'show', component: CategoryShowComponent},
			{path: '**', redirectTo: '', pathMatch: 'full'},
		]
	},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class CategoryRoutingModule { }
