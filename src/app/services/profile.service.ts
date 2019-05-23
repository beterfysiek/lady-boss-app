import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public form: FormGroup;
  profileUrl
  formIsDirty: boolean;

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {

    this.form = new FormGroup({
      profilepicture: new FormControl(''),
      username: new FormControl('', Validators.required),
      bio: new FormControl('', Validators.required),
      from: new FormControl('', Validators.required),
    });

    this.auth.auth.authState.subscribe(state => {
      if (!state) return;

      this.afs.doc<any>(`users/${state.uid}`)
        .valueChanges()
        .subscribe(val => {

          this.form.patchValue({
            profilepicture: val.profilepicture,
            username: val.username,
            bio: val.bio,
            from: val.from
          })

          const ref = this.storage.ref(val.profilepicture);
          this.profileUrl = ref.getDownloadURL();
          this.formIsDirty = false;
        })
    })
  }
  
}
