import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecadosPage } from './recados';

@NgModule({
  declarations: [
    RecadosPage,
  ],
  imports: [
    IonicPageModule.forChild(RecadosPage),
  ],
})
export class RecadosPageModule {}
