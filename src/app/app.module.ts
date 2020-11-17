import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { webUserNgService } from './services/userNg.service';
import { StartgameComponent } from './startgame/startgame.component';
import { CookieService } from 'ngx-cookie-service';
import { DixitmainpageComponent } from './dixitmainpage/dixitmainpage.component';
import { matchNgService } from './services/matchNg.service';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    StartgameComponent,
    DixitmainpageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [webUserNgService,matchNgService, CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
