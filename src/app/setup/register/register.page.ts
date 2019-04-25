import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  email: string;
  pass: string;

  constructor(
    private authService: AuthService,
    private toastCtrl: ToastController,
  ) {}

  register() {
    if (!this.email || !this.pass) return this.presentToastWithOptions('Fill in the blanks')

    this.authService.signupEmail(this.email, this.pass)
        .then(() => {
          this.presentToastWithOptions('Account is created!');

          let user: any = firebase.auth().currentUser;
          user.sendEmailVerification().then(
            () => { 
              this.presentToastWithOptions('Succesfully registered your account');
             }
          ).catch(
            (err) => {
              this.presentToastWithOptions('Error: ' + err.message);
            }
          )

        }).catch(
          (err) => {
            this.presentToastWithOptions('Error: ' + err.message);
          })

      .catch(er => {
        this.presentToastWithOptions('Error: ' + er.message);
      })
  }

  async presentToastWithOptions(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Close',
      duration: 2000
    });
    toast.present();
  }

}
