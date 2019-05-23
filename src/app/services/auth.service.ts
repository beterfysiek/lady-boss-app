import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { User } from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: User;
  initialHref: any = window.location.href;
  dontHide: boolean;
  hasSubscription: boolean;

  public invoices: Observable<any[]>;

  constructor(
    public auth: AngularFireAuth,
    private splashScreen: SplashScreen,
    private afs: AngularFirestore,
    private router: Router,
    private platform: Platform,

  ) {
    this.authState = null;
    this.auth.authState.subscribe(state => {

      this.authState = state;
      (!state) ? this.router.navigateByUrl('/create-account') : this.router.navigateByUrl('/home');
      if(!state) return;

      setTimeout(() => {
        this.splashScreen.hide();
        console.log('hide');
      }, 1300);

      this.hasSubscription = null;

     this.isMember();
     //this.getProfile();

    }, err => {
      console.log('auth.service, authstate error: ', err)
    })
  }

  get authenticated(): boolean {
    return this.authState !== null
  }

  get currentUser(): any {
    return this.authenticated ? this.auth.auth.currentUser : null;
  }

  get currentUserObservable(): any {
    return this.auth.authState;
  }

  get currentUserId(): any {
    console.log('currentuserid', this.authenticated ? this.auth.auth.currentUser.uid : '')
    return this.authenticated ? this.auth.auth.currentUser.uid : '';
  }

  public logout() {
    this.dontHide = true;
    this.auth.auth.signOut()
      .then(() => {
        if(this.platform.is('ios')){
        this.splashScreen.show();
      }
        window.location = this.initialHref;
      })
  }

  public signupEmail(email, password) {
    return this.auth.auth.createUserWithEmailAndPassword(email, password)
  }

  public forgotPassword(email) {
    return this.auth.auth.sendPasswordResetEmail(email);
  }

  login(mail, pass) {
    return this.auth.auth.signInWithEmailAndPassword(mail, pass);
  }

  signOut() {
    this.auth.auth.signOut();
  }

  isMember() {
    const psub = this.afs.doc<any>(`payed/${this.auth.auth.currentUser.uid}`).valueChanges();
    psub.subscribe(payobj => {
      let addMonths: number;
    if(payobj.price === '10') {
      addMonths = 1;
    } else if(payobj.price === '55') {
      addMonths = 6;
     } else if(payobj.price === '100') {
      addMonths = 12;
     }
console.log('addomonts', addMonths, payobj)
      let startdate = new Date(payobj.paydate);
      let enddate = new Date((startdate.setMonth(startdate.getMonth() + addMonths)));

      // enddate is later then today then subscribe
      this.hasSubscription = (new Date(enddate) > new Date) ? true : false;
    })
  }

  // getProfile() {
  //   const psub = this.afs.doc<any>(`users/${this.auth.auth.currentUser.uid}`).valueChanges();
  //   psub.subscribe(payobj => {

  //   })
  // }
}
