import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
var InvoicesPage = /** @class */ (function () {
    function InvoicesPage(auth, router, afs) {
        var _this = this;
        this.auth = auth;
        this.router = router;
        this.afs = afs;
        this.count = 4;
        this.limits$ = new BehaviorSubject(this.count);
        this.invoices = combineLatest(this.limits$).pipe(switchMap(function (_a) {
            var limit = _a[0];
            return afs.collection("payed/" + _this.auth.currentUser.uid + "/invoices", function (ref) {
                var query = ref;
                query = query.orderBy('paydate', 'desc').limit(limit);
                return query;
            }).valueChanges();
        }));
    }
    InvoicesPage.prototype.loadmore = function () {
        this.count = this.count + 2;
        this.limits$.next(this.count);
    };
    InvoicesPage.prototype.nav = function (to) {
        this.router.navigateByUrl(to);
    };
    InvoicesPage = tslib_1.__decorate([
        Component({
            selector: 'app-invoices',
            templateUrl: './invoices.page.html',
            styleUrls: ['./invoices.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService,
            Router,
            AngularFirestore])
    ], InvoicesPage);
    return InvoicesPage;
}());
export { InvoicesPage };
//# sourceMappingURL=invoices.page.js.map