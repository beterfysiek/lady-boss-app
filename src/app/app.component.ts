import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PushNotifService } from './services/push-notif.service';
import { AuthService } from './services/auth.service';
import { Firebase } from '@ionic-native/firebase/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private auth: AuthService,
    private fcm: PushNotifService,
    public toastController: ToastController,
    private firebase: Firebase
  ) {
    this.initializeApp();

  }

  private async presentToast(message) {
    console.log('push message', message);
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  private notificationSetup() {
    this.firebase.subscribe('subscriber');
    this.firebase.subscribe('subscribers');
    this.fcm.getToken();

    this.fcm.onNotifications().subscribe(
      (msg) => {
        if (this.platform.is('ios')) {
          this.presentToast(msg.aps.alert);
        } else {
          this.presentToast(msg.body);
        }
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // this.splashScreen.hide();
      this.notificationSetup();
      this.presentToastinf();
    });
  }

  async presentToastinf() {
    const toast = await this.toastController.create({
      message: 'THIS IS TEST VERSION 1.0',
      duration: 8000
    });
    toast.present();
  }
}
