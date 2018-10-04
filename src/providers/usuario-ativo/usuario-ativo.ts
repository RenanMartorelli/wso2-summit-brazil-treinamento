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
  accessTokenUsuario: string;
  refreshTokenUsuario: string;
  
  public usuario: Usuario = {
    nome: "",
    sobrenome: "",
    email: "",
    senha: "",
    numeroTelefone: "",
    cargo: "",
    empresa: "",
    pais: "",
    estado: "",
    areaDeInteresse: "",
  }
  constructor(
    public events: Events
  ) {
    console.log('Hello UsuarioAtivoProvider Provider');
  }

  setUsuarioAtual(usuario, access_token, refresh_token) {

    this.usuario.nome = usuario;
    this.accessTokenUsuario = access_token;
    this.refreshTokenUsuario = refresh_token;
    this.events.publish('usuario logado', usuario);
  }

  getUsuario() {
    return this.usuario;
  }
  getAccessToken() {
    return this.accessTokenUsuario;
  }

  getRefreshToken() {
    return this.refreshTokenUsuario;
  }

}
