import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';  // Use compat for backward compatibility
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';  // Import compat version of database

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { environment } from '../environments/environment'; 
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'product', component: ProductComponent },
  { path: '', redirectTo: '/product', pathMatch: 'full' },
  { path: '**', redirectTo: '/product' }
];


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    HeaderComponent,
    SidebarComponent
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),  // Initialize Firebase
    AngularFireDatabaseModule  // Import the compat version of AngularFireDatabase
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
