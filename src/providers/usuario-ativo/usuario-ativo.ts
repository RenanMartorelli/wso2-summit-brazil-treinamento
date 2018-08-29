import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { Events } from 'ionic-angular';

/*
  Generated class for the UsuarioAtivoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioAtivoProvider {

  usuario: Usuario;
  constructor(
    public events: Events
  ) {
    console.log('Hello UsuarioAtivoProvider Provider');
  }

  setUsuario(usuario) {

    this.usuario = usuario;
    this.events.publish('usuario logado', usuario);
  }

  getUsuario() {
    return this.usuario;
  }

  firstLoginToggle() {
    if (this.usuario.firstLogin == true) {
      this.usuario.firstLogin = false;
    }
  }

}
