import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
var ManualsPage = /** @class */ (function () {
    function ManualsPage(router) {
        this.router = router;
        this.manuals = [
            {
                title: 'Currency features'
            },
            {
                title: 'Charts and calculations'
            },
            {
                title: 'Meta trader'
            }
        ];
    }
    ManualsPage.prototype.nav = function (to) {
        this.router.navigateByUrl(to);
    };
    ManualsPage.prototype.ngOnInit = function () {
    };
    ManualsPage = tslib_1.__decorate([
        Component({
            selector: 'app-manuals',
            templateUrl: './manuals.page.html',
            styleUrls: ['./manuals.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router])
    ], ManualsPage);
    return ManualsPage;
}());
export { ManualsPage };
//# sourceMappingURL=manuals.page.js.map