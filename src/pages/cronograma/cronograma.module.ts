import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CronogramaPage } from './cronograma';

@NgModule({
  declarations: [
    CronogramaPage,
  ],
  imports: [
    IonicPageModule.forChild(CronogramaPage),
  ],
})
export class CronogramaPageModule {}
