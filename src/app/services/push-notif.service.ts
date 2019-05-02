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
    private http: HttpClient) { }

  async getToken() {
    let token;

    if (this.platform.is('android')) {
      token = await this.firebase.getToken();
    }

    if (this.platform.is('ios')) {
      token = await this.firebase.getToken();
      await this.firebase.grantPermission();
    }
    this.subscribeToTopic(token);
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

  subscribeToTopic(token) {
    console.log('going to get subscribed to topic subscriber');
    const topic = 'subscriber';
    console.log('fetch(', 'https://iid.googleapis.com/iid/v1/'+token+'/rel/topics/'+topic);
      fetch('https://iid.googleapis.com/iid/v1/'+token+'/rel/topics/'+topic, {
        method: 'POST',
        headers: new Headers({
          'Authorization': 'key=AIzaSyD8eCLULMR09_jHANlZCvAsDplkvrsn2OY',
          'Content-Type': 'application/json'
        })
      }).then(response => {
        if (response.status < 200 || response.status >= 400) {
          throw 'Error subscribing to topic: '+response.status + ' - ' + response.text();
        }
        console.log('Subscribed to "'+topic+'"');
      }).catch(error => {
        console.error('SOMETHING GOES WRONG', error);
      })
  }
}