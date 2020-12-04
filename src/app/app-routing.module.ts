import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DixitmainpageComponent } from './dixitmainpage/dixitmainpage.component';
import { InsertcardsComponent } from './insertcards/insertcards.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { StartgameComponent } from './startgame/startgame.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
    
  },
  {
    path: 'userRegistration',
    component: RegistrationComponent,
    data: { title: 'Registrati' },
    
  },
  {
    path: 'startgame',
    component: StartgameComponent,
    data: { title: 'Inizia il gioco' },
    
  },
  {
    path: 'dixitmainpage',
    component: DixitmainpageComponent,
    data: { title: 'Gioca a Dixit' },
    
  },
  {
    path: '',
    component: LoginComponent,
    data: { title: 'Login' },
    
  },
  {
    path: 'insertcard',
    component: InsertcardsComponent,
    data: { title: 'InsertCard' },
    
  },
  {
    path: 'insertCard',
    component: InsertcardsComponent,
    data: { title: 'InsertCard' },
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


  

 }
