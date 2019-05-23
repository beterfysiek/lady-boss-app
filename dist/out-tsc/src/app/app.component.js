import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PushNotifService } from './services/push-notif.service';
import { AuthService } from './services/auth.service';
import { Firebase } from '@ionic-native/firebase/ngx';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar, auth, fcm, toastController, firebase) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.auth = auth;
        this.fcm = fcm;
        this.toastController = toastController;
        this.firebase = firebase;
        this.initializeApp();
    }
    AppComponent.prototype.presentToast = function (message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('push message', message);
                        return [4 /*yield*/, this.toastController.create({
                                message: message,
                                duration: 3000
                            })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    AppComponent.prototype.notificationSetup = function () {
        var _this = this;
        this.firebase.subscribe('subscriber');
        this.firebase.subscribe('subscribers');
        this.fcm.getToken();
        this.fcm.onNotifications().subscribe(function (msg) {
            if (_this.platform.is('ios')) {
                _this.presentToast(msg.aps.alert);
            }
            else {
                _this.presentToast(msg.body);
            }
        });
    };
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
           // _this.splashScreen.hide();
            _this.notificationSetup();
        });
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar,
            AuthService,
            PushNotifService,
            ToastController,
            Firebase])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map