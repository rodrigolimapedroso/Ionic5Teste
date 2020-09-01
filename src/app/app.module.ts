import {  ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { CreatePage} from '../pages/Create/create.page';
import { Conexao } from '../providers/conexao';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    AppComponent,
    CreatePage
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot({
      rippleEffect: false,
      mode: 'md'
    }),
    IonicStorageModule.forRoot()
  ],
  entryComponents: [
    CreatePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    Conexao
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
