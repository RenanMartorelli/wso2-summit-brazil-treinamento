import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilUsuarioPage } from './perfil-usuario';

@NgModule({
  declarations: [
    PerfilUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilUsuarioPage),
  ],
})
export class PerfilUsuarioPageModule {}
