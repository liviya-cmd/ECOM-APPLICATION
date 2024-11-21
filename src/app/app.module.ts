import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';  
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';  
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';  

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { environment } from '../environments/environment'; 
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard'; 

const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'product', component: ProductComponent },
  { path: 'user', component: UserComponent },
  { path: 'home', component: HomeComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    HeaderComponent,
    SidebarComponent,
    UserComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes), // Setup the router with the routes defined above
    AngularFireModule.initializeApp(environment.firebase),  
    AngularFireDatabaseModule, 
    AngularFirestoreModule,
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()),
    AuthGuard, // Provide the AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
