import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
var AboutUsPage = /** @class */ (function () {
    function AboutUsPage(router) {
        this.router = router;
    }
    AboutUsPage.prototype.nav = function (to) {
        this.router.navigateByUrl(to);
    };
    AboutUsPage.prototype.ngOnInit = function () {
    };
    AboutUsPage = tslib_1.__decorate([
        Component({
            selector: 'app-about-us',
            templateUrl: './about-us.page.html',
            styleUrls: ['./about-us.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router])
    ], AboutUsPage);
    return AboutUsPage;
}());
export { AboutUsPage };
//# sourceMappingURL=about-us.page.js.map