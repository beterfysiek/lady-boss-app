import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PushNotifService {


  constructor(private firebase: Firebase,
              private afs: AngularFirestore,
              private platform: Platform,
              private auth: AuthService) {}

  async getToken() {
    let token;

    if (this.platform.is('android')) {
      token = await this.firebase.getToken();
    }

    if (this.platform.is('ios')) {
      token = await this.firebase.getToken();
      await this.firebase.grantPermission();
    }

    this.saveToken(token);
  }

  private saveToken(token) {
    if (!token) return;

    const devicesRef = this.afs.collection('devices');

    const data = {
      token,
      userId: this.auth.currentUserId ? this.auth.currentUserId : null
    };

    return devicesRef.doc(token).set(data);
  }

  onNotifications() {
    return this.firebase.onNotificationOpen();
  }
}