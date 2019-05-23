import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateAccountPage } from './create-account.page';
var routes = [
    {
        path: '',
        component: CreateAccountPage
    }
];
var CreateAccountPageModule = /** @class */ (function () {
    function CreateAccountPageModule() {
    }
    CreateAccountPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CreateAccountPage]
        })
    ], CreateAccountPageModule);
    return CreateAccountPageModule;
}());
export { CreateAccountPageModule };
//# sourceMappingURL=create-account.module.js.map