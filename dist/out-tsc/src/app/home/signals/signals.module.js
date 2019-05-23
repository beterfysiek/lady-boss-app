import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SignalsPage } from './signals.page';
var routes = [
    {
        path: '',
        component: SignalsPage
    }
];
var SignalsPageModule = /** @class */ (function () {
    function SignalsPageModule() {
    }
    SignalsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [SignalsPage]
        })
    ], SignalsPageModule);
    return SignalsPageModule;
}());
export { SignalsPageModule };
//# sourceMappingURL=signals.module.js.map