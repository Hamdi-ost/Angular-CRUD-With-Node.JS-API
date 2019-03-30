import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/product/list/list.component';
import { EditComponent } from './components/product/edit/edit.component';
import { CreateComponent } from './components/product/create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  { path: 'add-product', component: CreateComponent },
  { path: 'edit-product', component: EditComponent},
  { path: '', component: ListComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    CreateComponent,
    EditComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
