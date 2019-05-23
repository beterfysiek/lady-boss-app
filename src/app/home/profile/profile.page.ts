import { Component, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActionSheetController, ToastController, Platform } from '@ionic/angular';
import { ImgService } from 'src/app/services/img.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {


  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  show: boolean;
  profileUrl: Observable<string | null>;


  constructor(
    private storage: AngularFireStorage,
    private auth: AuthService,
    private actionSheetController: ActionSheetController,
    private imgService: ImgService,
    private toastCtrl: ToastController,
    public platform: Platform,
    private domSanitizer: DomSanitizer,
    private ngZone: NgZone,
    public profile: ProfileService,
    private router: Router,
    private afs: AngularFirestore
  ) { 
        // used for knowing if form inputs need to be saved
        this.profile.formIsDirty = false;
        this.profile.form.valueChanges.subscribe(val =>{
          console.log(val);
          this.profile.formIsDirty = true;
        } )

    }

    ngOnDestroy() {
      // set form to clean on page leave
      this.profile.formIsDirty = false;
    }
  


  nav(to: string) {
    if(this.profile.formIsDirty === true) this.afs
    .doc(`users/${this.auth.currentUserId}`)
    .update(this.profile.form.value)
    .then(suc=> this.presentToastWithOptions('Changes are saved successfuly'))
    .catch(er => this.presentToastWithOptions('Something went wrong.. changes not saved'));
    this.router.navigateByUrl(to);
  }

  uploadFileBrowser(event) {
    const file = event.target.files[0];
    const filePath = `users/${this.auth.auth.auth.currentUser.uid}/profile-picture/profile.jpg`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.show = true;
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.profile.form.patchValue({
          profilepicture: `users/${this.auth.auth.auth.currentUser.uid}/profile-picture/profile.jpg`
        })
        this.downloadURL.subscribe(url => (document.getElementById('img-preview') as any).src = url)
      })
    )
      .subscribe()
  }

  uploadFile(base64: string): void {
    console.log('uploadfile!!')
    const metadata = {
      contentType: 'image/jpeg',
    };
    console.log('sanitize profile url')
    const profile_url = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64, ' + base64);
    console.log('sanitized: ', profile_url);
    const firePath = `users/${this.auth.auth.auth.currentUser.uid}/profile-picture/profile.jpg`;
    const ref = this.storage.ref(firePath);
    this.show = true;
    console.log('ref', ref);
    ref.putString(base64, 'base64', metadata)
      .then(() => {

        this.profile.form.patchValue({
          profilepicture: `users/${this.auth.auth.auth.currentUser.uid}/profile-picture/profile.jpg`
        })


        this.downloadURL = ref.getDownloadURL();
        this.downloadURL.subscribe(url => this.ngZone.run(() => (document.getElementById('img-preview') as any).src = url))
      })
      .catch(er => {
        // this.img = false;
        console.log(er);
      });

  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose image',
      buttons: [{
        text: 'Open library',
        icon: 'images',
        handler: () => {
          console.log('before accessing library')
          const base64 = this.imgService.library();
          console.log('after accesing', base64)
          base64.then(val => {
            console.log('done library', val)
            this.uploadFile(val);
          })
            .catch(er => {
              this.presentToastWithOptions(`Failed: ${er.message}`)
            })
        }
      }, {
        text: 'Take picture',
        icon: 'camera',
        handler: () => {
          const base64 = this.imgService.takePicture();
          console.log('picture took', base64)
          base64.then(val => {
            console.log('pic done', val);
            this.uploadFile(val);
          })
            .catch(er => {
              this.presentToastWithOptions(`Failed: ${er.message}`);
            });
        }
      }, {
        text: 'Close',
        icon: 'close',
        role: 'cancel',
      }]
    });
    await actionSheet.present();
  }

  async presentToastWithOptions(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Done',
      duration: 2000
    });
    toast.present();
  }

}
