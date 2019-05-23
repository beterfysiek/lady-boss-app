import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
var CreateAccountPage = /** @class */ (function () {
    function CreateAccountPage(afAuth, toastCtrl, router) {
        this.afAuth = afAuth;
        this.toastCtrl = toastCtrl;
        this.router = router;
    }
    CreateAccountPage.prototype.login = function () {
        var _this = this;
        if (!this.email || !this.pass)
            return this.presentToast('Fill in both email and password.');
        this.afAuth.auth
            .signInWithEmailAndPassword(this.email, this.pass)
            .then(function (succes) {
            _this.presentToast('Signed in successful!');
        })
            .catch(function (err) { return _this.presentToast('Oops, ' + err.message + ' Please try again.'); });
    };
    CreateAccountPage.prototype.signOut = function () {
        var _this = this;
        this.afAuth.auth.signOut()
            .then(function (succes) { return _this.presentToast('Signed out'); })
            .catch(function (err) { return _this.presentToast('Oops, ' + err.message + ' Please try again.'); });
    };
    CreateAccountPage.prototype.forgotPassword = function () {
        this.router.navigateByUrl('/reset');
    };
    CreateAccountPage.prototype.newAccount = function () {
        this.router.navigateByUrl('/register');
    };
    CreateAccountPage.prototype.presentToast = function (message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: message,
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
    CreateAccountPage = tslib_1.__decorate([
        Component({
            selector: 'app-create-account',
            templateUrl: './create-account.page.html',
            styleUrls: ['./create-account.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireAuth,
            ToastController,
            Router])
    ], CreateAccountPage);
    return CreateAccountPage;
}());
export { CreateAccountPage };
//# sourceMappingURL=create-account.page.js.map