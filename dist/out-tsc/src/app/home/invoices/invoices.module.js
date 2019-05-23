import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { InvoicesPage } from './invoices.page';
import { PipesModule } from 'src/app/pipes/number-to-date.module';
var routes = [
    {
        path: '',
        component: InvoicesPage
    }
];
var InvoicesPageModule = /** @class */ (function () {
    function InvoicesPageModule() {
    }
    InvoicesPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                PipesModule
            ],
            declarations: [InvoicesPage]
        })
    ], InvoicesPageModule);
    return InvoicesPageModule;
}());
export { InvoicesPageModule };
//# sourceMappingURL=invoices.module.js.map