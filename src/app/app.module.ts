import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';  
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';  
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';  // Firestore Module
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { environment } from '../environments/environment'; 
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { GridviewComponent } from './gridview/gridview.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  { path: 'product', component: ProductComponent },
  { path: '', redirectTo: '/product', pathMatch: 'full' },
  { path: 'gridview',component:GridviewComponent},
  {path:'category',component:CategoryComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    HeaderComponent,
    SidebarComponent,
    GridviewComponent,
    CategoryComponent
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebaseConfig),  
    AngularFireDatabaseModule ,
    AngularFirestoreModule, 

  ],
  providers: [
    provideFirebaseApp(() => initializeApp({"projectId":"liviya-84582","appId":"1:916427892030:web:295f63311a45dbc627f86f","databaseURL":"https://liviya-84582-default-rtdb.firebaseio.com","storageBucket":"liviya-84582.firebasestorage.app","apiKey":"AIzaSyC45iUioCU1sltnkk-U1TprqPmIkaRvjHI","authDomain":"liviya-84582.firebaseapp.com","messagingSenderId":"916427892030","measurementId":"G-QKQ1P0LRR1"})),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
