import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { PayPal } from '@ionic-native/paypal/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';

export const firebaseConfig = {
  apiKey: "AIzaSyD8eCLULMR09_jHANlZCvAsDplkvrsn2OY",
    authDomain: "bon-16e6c.firebaseapp.com",
    databaseURL: "https://bon-16e6c.firebaseio.com",
    projectId: "bon-16e6c",
    storageBucket: "bon-16e6c.appspot.com",
    messagingSenderId: "684070163526"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AngularFirestore,
    PayPal,
    Firebase
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
