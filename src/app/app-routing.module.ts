import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'create-account', pathMatch: 'full' }, //canActivate: [LoginGuard]
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

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
