import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage {

  email: string;
  pass: string;

  constructor(
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  login() {
    if (!this.email || !this.pass) return this.presentToast('Fill in both email and password.')
    this.afAuth.auth
      .signInWithEmailAndPassword(this.email, this.pass)
      .then(succes => {
        this.presentToast('Signed in successful!');
      })
      .catch(err => this.presentToast('Oops, ' + err.message + ' Please try again.'));
  }

  signOut() {
    this.afAuth.auth.signOut()
      .then(succes => this.presentToast('Signed out'))
      .catch(err => this.presentToast('Oops, ' + err.message + ' Please try again.'));
  }

  forgotPassword() {
    this.router.navigateByUrl('/reset');
  }

  newAccount() {
    this.router.navigateByUrl('/register');
  }

  private async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
