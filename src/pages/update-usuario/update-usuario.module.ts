import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateUsuarioPage } from './update-usuario';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    UpdateUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateUsuarioPage),
    BrMaskerModule
  ],
})
export class UpdateUsuarioPageModule { }
