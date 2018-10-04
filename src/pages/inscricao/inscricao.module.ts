import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InscricaoPage } from './inscricao';

@NgModule({
  declarations: [
    InscricaoPage,
  ],
  imports: [
    IonicPageModule.forChild(InscricaoPage),
  ],
})
export class InscricaoPageModule {}
