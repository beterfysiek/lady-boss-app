import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PushNotifService {


  constructor(private firebase: Firebase,
    private afs: AngularFirestore,
    private platform: Platform,
    private auth: AuthService,
    private http: HttpClient,
    ) { }

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

  private saveToken(token): void {
    if (!token) return;

    const devicesRef = this.afs.collection('devices');
    const authsub = this.auth.auth.authState.subscribe(state => {
    const data = {
      token,
      userId: state.uid
    };

    devicesRef.doc(state.uid).set(data);
    
    authsub.unsubscribe();
  });
  }

  onNotifications() {
    return this.firebase.onNotificationOpen();
  }
}