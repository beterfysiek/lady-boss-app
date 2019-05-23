import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
var ProfileService = /** @class */ (function () {
    function ProfileService(auth, afs, storage) {
        var _this = this;
        this.auth = auth;
        this.afs = afs;
        this.storage = storage;
        this.form = new FormGroup({
            profilepicture: new FormControl(''),
            username: new FormControl('', Validators.required),
            bio: new FormControl('', Validators.required),
            from: new FormControl('', Validators.required),
        });
        this.auth.auth.authState.subscribe(function (state) {
            if (!state)
                return;
            _this.afs.doc("users/" + state.uid)
                .valueChanges()
                .subscribe(function (val) {
                _this.form.patchValue({
                    profilepicture: val.profilepicture,
                    username: val.username,
                    bio: val.bio,
                    from: val.from
                });
                var ref = _this.storage.ref(val.profilepicture);
                _this.profileUrl = ref.getDownloadURL();
                _this.formIsDirty = false;
            });
        });
    }
    ProfileService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService,
            AngularFirestore,
            AngularFireStorage])
    ], ProfileService);
    return ProfileService;
}());
export { ProfileService };
//# sourceMappingURL=profile.service.js.map