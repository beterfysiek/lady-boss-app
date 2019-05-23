import * as tslib_1 from "tslib";
/* pipes.modules.ts */
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NumberToDatePipe } from './number-to-date.pipe';
var PipesModule = /** @class */ (function () {
    function PipesModule() {
    }
    PipesModule = tslib_1.__decorate([
        NgModule({
            declarations: [NumberToDatePipe],
            imports: [IonicModule],
            exports: [NumberToDatePipe]
        })
    ], PipesModule);
    return PipesModule;
}());
export { PipesModule };
//# sourceMappingURL=number-to-date.module.js.map