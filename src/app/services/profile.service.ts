import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public form : FormGroup;

  constructor( 
    private formBuilder: FormBuilder
    ) {

    this.form = new FormGroup({
      profilepicture: new FormControl(''), 
        username: new FormControl('', Validators.required),
        bio: new FormControl('', Validators.required),
        from: new FormControl('', Validators.required),
      });
  }
  logForm(){
    console.log(this.form.value)
  }
}
