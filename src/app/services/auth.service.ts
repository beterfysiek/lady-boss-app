import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { User } from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: User;
  initialHref: any = window.location.href;
  dontHide: boolean;
  hasSubscription: boolean;

  private invoicesCollection: AngularFirestoreCollection<any>;
  public invoices: Observable<any[]>;

  constructor(
    public auth: AngularFireAuth,
    private splashScreen: SplashScreen,
    private afs: AngularFirestore
  ) {
    this.authState = null;
    this.auth.authState.subscribe(state => {

      this.authState = state;
      if (!state) return 'logged out'

      this.invoicesCollection = afs.collection<any>('payed').doc(this.auth.auth.currentUser.uid).collection('invoices');
      this.invoices = this.invoicesCollection.valueChanges();

      this.hasSubscription = null;

      console.log('currentuserid', this.auth.auth.currentUser.uid)

      const psub = this.afs.doc<any>(`payed/${this.auth.auth.currentUser.uid}`).valueChanges();
      psub.subscribe(payobj => {
        console.log('date:', new Date(payobj.paydate));
        let startdate = new Date(payobj.paydate);
        let enddate = new Date((startdate.setMonth(startdate.getMonth() + 18)));

        // enddate is later then today then subscribe
        this.hasSubscription = (new Date(enddate) > new Date) ? true : false;
        console.log('has sub', this.hasSubscription);
      })

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
