import * as tslib_1 from "tslib";
import { AngularFirestore } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
var SignalsPage = /** @class */ (function () {
    function SignalsPage(afs, router) {
        this.afs = afs;
        this.router = router;
        this.count = 4;
        this.limits$ = new BehaviorSubject(this.count);
        this.signals = combineLatest(this.limits$).pipe(switchMap(function (_a) {
            var limit = _a[0];
            return afs.collection('signals', function (ref) {
                var query = ref;
                query = query.orderBy('date', 'desc').limit(limit);
                return query;
            }).valueChanges();
        }));
    }
    SignalsPage.prototype.loadmore = function () {
        this.count = this.count + 2;
        this.limits$.next(this.count);
    };
    SignalsPage.prototype.nav = function (to) {
        this.router.navigateByUrl(to);
    };
    SignalsPage = tslib_1.__decorate([
        Component({
            selector: 'app-signals',
            templateUrl: './signals.page.html',
            styleUrls: ['./signals.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFirestore,
            Router])
    ], SignalsPage);
    return SignalsPage;
}());
export { SignalsPage };
//# sourceMappingURL=signals.page.js.map