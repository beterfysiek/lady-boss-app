import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
var HomePage = /** @class */ (function () {
    function HomePage(auth, afs, toastController, router) {
        this.auth = auth;
        this.afs = afs;
        this.toastController = toastController;
        this.router = router;
    }
    HomePage.prototype.logout = function () {
        this.auth.logout();
    };
    HomePage.prototype.toast = function (text) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: text,
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
    HomePage.prototype.nav = function (to) {
        this.router.navigateByUrl(to);
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService,
            AngularFirestore,
            ToastController,
            Router])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map