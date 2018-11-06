import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { Events } from 'ionic-angular';
import { DaoProvider } from '../dao/dao';
import { NavController } from 'ionic-angular/navigation/nav-controller';

/*
  Generated class for the UsuarioAtivoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioAtivoProvider {
  public accessTokenUsuario: string;
  public refreshTokenUsuario: string;
  public idUsuario: string;
  public isLogado: boolean;
  public chatDisponivel: boolean;
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
    aceitaMensagens: true
  }

  constructor(
    public events: Events,
    public daoUsuarios: DaoProvider
  ) {
    this.isLogado = false;
    console.log('Hello UsuarioAtivoProvider Provider');
    console.log(this.usuario);

  }

  setAccessTokens(access_token, refresh_token) {
    this.accessTokenUsuario = access_token;
    this.refreshTokenUsuario = refresh_token;
  }

  setUsuario(usuario, id_usuario) {
    console.log(usuario);
    this.usuario = {
      nome: "", sobrenome: "", nomeUsuario: "", email: "", senha: "",
      numeroTelefone: "", cargo: "", empresa: "", pais: "",
      estado: "", areaDeInteresse: "", id: "", aceitaMensagens: true
    }

    this.usuario.nome = usuario.name.familyName;
    this.usuario.sobrenome = usuario.name.givenName;
    this.usuario.nomeUsuario = usuario.userName;
    this.usuario.email = usuario.emails[0].value;
    this.usuario.numeroTelefone = usuario.phoneNumbers[0].value;
    let endereco = usuario.addresses[0].value.split(" / ");
    this.usuario.pais = endereco[0];
    this.usuario.estado = endereco[1];
    this.usuario.cargo = usuario.EnterpriseUser.department;
    this.usuario.empresa = usuario.EnterpriseUser.organization;
    this.usuario.areaDeInteresse = usuario.EnterpriseUser.division;
    this.usuario.id = id_usuario;

    this.daoUsuarios.setUsuarioAtivo(this.usuario);
    console.log(this.usuario);
  }

  getUsuarioAtivoFromDAO() {
    this.daoUsuarios.verificaUsuarioAtivo(() => {
      this.usuario = this.daoUsuarios.usuario;
      console.log("Tornando o isLogado true no UsuarioAtivo.ts")
      this.isLogado = true;
      this.events.publish('usuário carregado');
    }, () => {
      console.log("Não conseguiu pegar nada do Banco de dados");
    });
  }

  removeUsuario() {
    this.usuario = {
      nome: "",
      sobrenome: "",
      nomeUsuario: "",
      email: "",
      senha: "",
      numeroTelefone: "",
      cargo: "",
      empresa: "",
      pais: "",
      estado: "",
      areaDeInteresse: "",
      id: "",
      aceitaMensagens: true
    }
    this.isLogado = false;
    this.daoUsuarios.deletaUsuarioAtivo();
  }


  getNomeCompleto(): string {
    return (this.usuario.nome + " " + this.usuario.sobrenome);
  }

  toggleAceitaMensagens() {
    if (this.usuario.aceitaMensagens == true) {
      this.usuario.aceitaMensagens = false
    } else {
      this.usuario.aceitaMensagens = true
    }
  }

}
