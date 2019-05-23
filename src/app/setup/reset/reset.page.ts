import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage {

  email: string;

  constructor(
    private authService: AuthService,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  reset(){
    if(!this.email) return this.presentToastWithOptions('Fill in your email address')
    this.authService.forgotPassword(this.email)
    .then(() => {
      this.presentToastWithOptions('Succesfully send resetlink to ' + this.email);
      this.router.navigateByUrl('/home')
    })
    .catch((er)=>{
      this.presentToastWithOptions('Error: ' + er.message);
    })
  }

  async presentToastWithOptions(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Sluiten',
      duration: 2000
    });
    toast.present();
  }

  nav(to: string) {
    this.router.navigateByUrl(to);
  }

}
