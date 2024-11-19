import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component'; 

<<<<<<< HEAD

=======
>>>>>>> 7f2d747b8bb0a80ce6a9a658f119522f5ed2ef8b
const routes: Routes = [
  { path: 'product', component: ProductComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
