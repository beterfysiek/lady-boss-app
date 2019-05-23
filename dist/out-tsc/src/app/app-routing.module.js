import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { LoginGuard } from './guards/auth.guard';
var routes = [
    { path: '', redirectTo: 'create-account', pathMatch: 'full' },
    { path: 'home', loadChildren: './home/home.module#HomePageModule' },
    { path: 'create-account', loadChildren: './setup/create-account/create-account.module#CreateAccountPageModule', canActivate: [LoginGuard] },
    { path: 'profile', loadChildren: './home/profile/profile.module#ProfilePageModule' },
    { path: 'invoices', loadChildren: './home/invoices/invoices.module#InvoicesPageModule' },
    { path: 'signals', loadChildren: './home/signals/signals.module#SignalsPageModule' },
    { path: 'about-us', loadChildren: './home/about-us/about-us.module#AboutUsPageModule' },
    { path: 'manuals', loadChildren: './home/manuals/manuals.module#ManualsPageModule' },
    { path: 'register', loadChildren: './setup/register/register.module#RegisterPageModule' },
    { path: 'reset', loadChildren: './setup/reset/reset.module#ResetPageModule' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map