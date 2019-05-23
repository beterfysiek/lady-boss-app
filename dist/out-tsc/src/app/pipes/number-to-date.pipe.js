import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var NumberToDatePipe = /** @class */ (function () {
    function NumberToDatePipe() {
    }
    NumberToDatePipe.prototype.transform = function (value, args) {
        var addMonths;
        if (args === '10') {
            addMonths = 1;
        }
        else if (args === '55') {
            addMonths = 6;
        }
        else if (args === '100') {
            addMonths = 12;
        }
        var startdate = new Date(value);
        var enddate = new Date((startdate.setMonth(startdate.getMonth() + addMonths)));
        return enddate;
    };
    NumberToDatePipe = tslib_1.__decorate([
        Pipe({
            name: 'numberToDate'
        })
    ], NumberToDatePipe);
    return NumberToDatePipe;
}());
export { NumberToDatePipe };
//# sourceMappingURL=number-to-date.pipe.js.map