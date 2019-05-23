import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ResetPage } from './reset.page';
var routes = [
    {
        path: '',
        component: ResetPage
    }
];
var ResetPageModule = /** @class */ (function () {
    function ResetPageModule() {
    }
    ResetPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ResetPage]
        })
    ], ResetPageModule);
    return ResetPageModule;
}());
export { ResetPageModule };
//# sourceMappingURL=reset.module.js.map