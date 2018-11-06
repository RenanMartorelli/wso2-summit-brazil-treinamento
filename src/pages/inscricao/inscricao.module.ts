import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InscricaoPage } from './inscricao';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    InscricaoPage,
  ],
  imports: [
    IonicPageModule.forChild(InscricaoPage),
    BrMaskerModule
  ],
})
export class InscricaoPageModule { }
