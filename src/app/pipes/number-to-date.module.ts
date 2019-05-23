/* pipes.modules.ts */
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NumberToDatePipe } from './number-to-date.pipe';


@NgModule({
  declarations: [NumberToDatePipe],
  imports: [IonicModule],
  exports: [NumberToDatePipe]
})
export class PipesModule {}