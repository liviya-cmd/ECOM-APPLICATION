import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';  // Firebase compatibility mode
import { AngularFireAuthModule } from '@angular/fire/compat/auth';  // Firebase Auth compatibility
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';  // Firebase Database compatibility
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';  // Import Firestore module

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';
import { CategoryComponent } from './category/category.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from './dashboard/dashboard.service';

import { environment } from '../environments/environment';  // Firebase config

const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'product', component: ProductComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'user', component: UserComponent },
  { path: '', redirectTo: '/product', pathMatch: 'full' },
  { path:'dashboard',component:DashboardComponent},
  {path:'category',component:CategoryComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    UserComponent,
    CategoryComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),  // Initialize Firebase with config
    AngularFireAuthModule, 
    AngularFirestoreModule, // Firebase Authentication module (compat)
    AngularFireDatabaseModule,  // Firebase Realtime Database module (compat)
    CommonModule  // Used for common Angular functionality like ngIf, ngFor
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
