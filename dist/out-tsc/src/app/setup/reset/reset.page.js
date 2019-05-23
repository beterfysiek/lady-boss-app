import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
var ResetPage = /** @class */ (function () {
    function ResetPage(authService, toastCtrl, router) {
        this.authService = authService;
        this.toastCtrl = toastCtrl;
        this.router = router;
    }
    ResetPage.prototype.reset = function () {
        var _this = this;
        if (!this.email)
            return this.presentToastWithOptions('Fill in your email address');
        this.authService.forgotPassword(this.email)
            .then(function () {
            _this.presentToastWithOptions('Succesfully send resetlink to ' + _this.email);
            _this.router.navigateByUrl('/home');
        })
            .catch(function (er) {
            _this.presentToastWithOptions('Error: ' + er.message);
        });
    };
    ResetPage.prototype.presentToastWithOptions = function (message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: message,
                            showCloseButton: true,
                            position: 'top',
                            closeButtonText: 'Sluiten',
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
    ResetPage = tslib_1.__decorate([
        Component({
            selector: 'app-reset',
            templateUrl: './reset.page.html',
            styleUrls: ['./reset.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService,
            ToastController,
            Router])
    ], ResetPage);
    return ResetPage;
}());
export { ResetPage };
//# sourceMappingURL=reset.page.js.map