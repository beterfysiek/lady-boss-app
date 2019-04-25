import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: User;
  initialHref: any = window.location.href;
  dontHide: boolean;

  constructor(
    public auth: AngularFireAuth,
    private splashScreen: SplashScreen,
  ) {
    this.authState = null;
    this.auth.authState.subscribe(state => {

      this.authState = state;
      
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
    return this.authenticated ? this.auth.auth.currentUser.uid : '';
  }

  public logout() {
    this.dontHide = true;
    this.auth.auth.signOut()
      .then(() => {
        this.splashScreen.show();
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
}
