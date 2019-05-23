import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(authService, toastCtrl) {
        this.authService = authService;
        this.toastCtrl = toastCtrl;
    }
    RegisterPage.prototype.register = function () {
        var _this = this;
        if (!this.email || !this.pass)
            return this.presentToastWithOptions('Fill in the blanks');
        this.authService.signupEmail(this.email, this.pass)
            .then(function () {
            _this.presentToastWithOptions('Account is created!');
            var user = firebase.auth().currentUser;
            user.sendEmailVerification().then(function () {
                _this.presentToastWithOptions('Succesfully registered your account');
            }).catch(function (err) {
                _this.presentToastWithOptions('Error: ' + err.message);
            });
        }).catch(function (err) {
            _this.presentToastWithOptions('Error: ' + err.message);
        })
            .catch(function (er) {
            _this.presentToastWithOptions('Error: ' + er.message);
        });
    };
    RegisterPage.prototype.presentToastWithOptions = function (message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: message,
                            showCloseButton: true,
                            position: 'top',
                            closeButtonText: 'Close',
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
    RegisterPage = tslib_1.__decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.page.html',
            styleUrls: ['./register.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService,
            ToastController])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.page.js.map