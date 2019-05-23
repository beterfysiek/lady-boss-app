import * as tslib_1 from "tslib";
import { Component, NgZone } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActionSheetController, ToastController, Platform } from '@ionic/angular';
import { ImgService } from 'src/app/services/img.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
var ProfilePage = /** @class */ (function () {
    function ProfilePage(storage, auth, actionSheetController, imgService, toastCtrl, platform, domSanitizer, ngZone, profile, router, afs) {
        var _this = this;
        this.storage = storage;
        this.auth = auth;
        this.actionSheetController = actionSheetController;
        this.imgService = imgService;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.domSanitizer = domSanitizer;
        this.ngZone = ngZone;
        this.profile = profile;
        this.router = router;
        this.afs = afs;
        // used for knowing if form inputs need to be saved
        this.profile.formIsDirty = false;
        this.profile.form.valueChanges.subscribe(function (val) {
            console.log(val);
            _this.profile.formIsDirty = true;
        });
    }
    ProfilePage.prototype.ngOnDestroy = function () {
        // set form to clean on page leave
        this.profile.formIsDirty = false;
    };
    ProfilePage.prototype.nav = function (to) {
        var _this = this;
        if (this.profile.formIsDirty === true)
            this.afs
                .doc("users/" + this.auth.currentUserId)
                .update(this.profile.form.value)
                .then(function (suc) { return _this.presentToastWithOptions('Changes are saved successfuly'); })
                .catch(function (er) { return _this.presentToastWithOptions('Something went wrong.. changes not saved'); });
        this.router.navigateByUrl(to);
    };
    ProfilePage.prototype.uploadFileBrowser = function (event) {
        var _this = this;
        var file = event.target.files[0];
        var filePath = "users/" + this.auth.auth.auth.currentUser.uid + "/profile-picture/profile.jpg";
        var fileRef = this.storage.ref(filePath);
        var task = this.storage.upload(filePath, file);
        this.show = true;
        // observe percentage changes
        this.uploadPercent = task.percentageChanges();
        // get notified when the download URL is available
        task.snapshotChanges().pipe(finalize(function () {
            _this.downloadURL = fileRef.getDownloadURL();
            _this.profile.form.patchValue({
                profilepicture: "users/" + _this.auth.auth.auth.currentUser.uid + "/profile-picture/profile.jpg"
            });
            _this.downloadURL.subscribe(function (url) { return document.getElementById('img-preview').src = url; });
        }))
            .subscribe();
    };
    ProfilePage.prototype.uploadFile = function (base64) {
        var _this = this;
        console.log('uploadfile!!');
        var metadata = {
            contentType: 'image/jpeg',
        };
        console.log('sanitize profile url');
        var profile_url = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64, ' + base64);
        console.log('sanitized: ', profile_url);
        var firePath = "users/" + this.auth.auth.auth.currentUser.uid + "/profile-picture/profile.jpg";
        var ref = this.storage.ref(firePath);
        this.show = true;
        console.log('ref', ref);
        ref.putString(base64, 'base64', metadata)
            .then(function () {
            _this.profile.form.patchValue({
                profilepicture: "users/" + _this.auth.auth.auth.currentUser.uid + "/profile-picture/profile.jpg"
            });
            _this.downloadURL = ref.getDownloadURL();
            _this.downloadURL.subscribe(function (url) { return _this.ngZone.run(function () { return document.getElementById('img-preview').src = url; }); });
        })
            .catch(function (er) {
            // this.img = false;
            console.log(er);
        });
    };
    ProfilePage.prototype.presentActionSheet = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            header: 'Choose image',
                            buttons: [{
                                    text: 'Open library',
                                    icon: 'images',
                                    handler: function () {
                                        console.log('before accessing library');
                                        var base64 = _this.imgService.library();
                                        console.log('after accesing', base64);
                                        base64.then(function (val) {
                                            console.log('done library', val);
                                            _this.uploadFile(val);
                                        })
                                            .catch(function (er) {
                                            _this.presentToastWithOptions("Failed: " + er.message);
                                        });
                                    }
                                }, {
                                    text: 'Take picture',
                                    icon: 'camera',
                                    handler: function () {
                                        var base64 = _this.imgService.takePicture();
                                        console.log('picture took', base64);
                                        base64.then(function (val) {
                                            console.log('pic done', val);
                                            _this.uploadFile(val);
                                        })
                                            .catch(function (er) {
                                            _this.presentToastWithOptions("Failed: " + er.message);
                                        });
                                    }
                                }, {
                                    text: 'Close',
                                    icon: 'close',
                                    role: 'cancel',
                                }]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfilePage.prototype.presentToastWithOptions = function (message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: message,
                            showCloseButton: true,
                            position: 'top',
                            closeButtonText: 'Done',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfilePage = tslib_1.__decorate([
        Component({
            selector: 'app-profile',
            templateUrl: './profile.page.html',
            styleUrls: ['./profile.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireStorage,
            AuthService,
            ActionSheetController,
            ImgService,
            ToastController,
            Platform,
            DomSanitizer,
            NgZone,
            ProfileService,
            Router,
            AngularFirestore])
    ], ProfilePage);
    return ProfilePage;
}());
export { ProfilePage };
//# sourceMappingURL=profile.page.js.map