import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';  
import { ProductComponent } from './product/product.component';  
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: LoginComponent },  
  {
    path: '',
    component: HomeComponent,  
    children: [
      { path: 'home', component: HomeComponent },  
      { path: 'product', component: ProductComponent }, 
      { path:'user',component:UserComponent},
 
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
