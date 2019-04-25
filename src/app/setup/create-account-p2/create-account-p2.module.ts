import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateAccountP2Page } from './create-account-p2.page';

const routes: Routes = [
  {
    path: '',
    component: CreateAccountP2Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateAccountP2Page]
})
export class CreateAccountP2PageModule {}
