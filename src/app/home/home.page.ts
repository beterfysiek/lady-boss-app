import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    public auth: AuthService,
    public afs: AngularFirestore,
    public toastController: ToastController,
    public router: Router
  ) {
   
  }

  logout() {
    this.auth.logout();
  }

  async toast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

  nav(to: string) {
    this.router.navigateByUrl(to);
  }
}
