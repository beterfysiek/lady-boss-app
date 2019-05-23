import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
var AuthService = /** @class */ (function () {
    function AuthService(auth, splashScreen, afs, router, platform) {
        var _this = this;
        this.auth = auth;
        this.splashScreen = splashScreen;
        this.afs = afs;
        this.router = router;
        this.platform = platform;
        this.initialHref = window.location.href;
        this.authState = null;
        this.auth.authState.subscribe(function (state) {
            _this.authState = state;
            (!state) ? _this.router.navigateByUrl('/create-account') : _this.router.navigateByUrl('/home');
            if (!state)
                return;
            _this.hasSubscription = null;
            _this.isMember();
            //this.getProfile();
        }, function (err) {
            console.log('auth.service, authstate error: ', err);
        });
    }
    Object.defineProperty(AuthService.prototype, "authenticated", {
        get: function () {
            return this.authState !== null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "currentUser", {
        get: function () {
            return this.authenticated ? this.auth.auth.currentUser : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "currentUserObservable", {
        get: function () {
            return this.auth.authState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "currentUserId", {
        get: function () {
            console.log('currentuserid', this.authenticated ? this.auth.auth.currentUser.uid : '');
            return this.authenticated ? this.auth.auth.currentUser.uid : '';
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.logout = function () {
        var _this = this;
        this.dontHide = true;
        this.auth.auth.signOut()
            .then(function () {
            if (_this.platform.is('ios')) {
                _this.splashScreen.show();
            }
            window.location = _this.initialHref;
        });
    };
    AuthService.prototype.signupEmail = function (email, password) {
        return this.auth.auth.createUserWithEmailAndPassword(email, password);
    };
    AuthService.prototype.forgotPassword = function (email) {
        return this.auth.auth.sendPasswordResetEmail(email);
    };
    AuthService.prototype.login = function (mail, pass) {
        return this.auth.auth.signInWithEmailAndPassword(mail, pass);
    };
    AuthService.prototype.signOut = function () {
        this.auth.auth.signOut();
    };
    AuthService.prototype.isMember = function () {
        var _this = this;
        var psub = this.afs.doc("payed/" + this.auth.auth.currentUser.uid).valueChanges();
        psub.subscribe(function (payobj) {
            var addMonths;
            if (payobj.price === '10') {
                addMonths = 1;
            }
            else if (payobj.price === '55') {
                addMonths = 6;
            }
            else if (payobj.price === '100') {
                addMonths = 12;
            }
            console.log('addomonts', addMonths, payobj);
            var startdate = new Date(payobj.paydate);
            var enddate = new Date((startdate.setMonth(startdate.getMonth() + addMonths)));
            // enddate is later then today then subscribe
            _this.hasSubscription = (new Date(enddate) > new Date) ? true : false;
        });
    };
    AuthService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireAuth,
            SplashScreen,
            AngularFirestore,
            Router,
            Platform])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map