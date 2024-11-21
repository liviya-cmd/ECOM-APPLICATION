import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component'; 
import { GridviewComponent } from './gridview/gridview.component';
import { CategoryComponent } from './category/category.component';


const routes: Routes = [
  { path: 'product', component: ProductComponent },
  {path:'gridview',component:GridviewComponent},
  {path:'category',component:CategoryComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
