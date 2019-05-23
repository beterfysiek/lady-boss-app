import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ManualsPage } from './manuals.page';
var routes = [
    {
        path: '',
        component: ManualsPage
    }
];
var ManualsPageModule = /** @class */ (function () {
    function ManualsPageModule() {
    }
    ManualsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ManualsPage]
        })
    ], ManualsPageModule);
    return ManualsPageModule;
}());
export { ManualsPageModule };
//# sourceMappingURL=manuals.module.js.map