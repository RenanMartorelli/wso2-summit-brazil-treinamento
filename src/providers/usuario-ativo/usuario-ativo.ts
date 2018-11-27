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
    pais: "",
    estado: "",
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

  setUsuario(jsonUsuarioSCIM, id_usuario) {
    // Define o usuário ativo dentro da aplicação com base nos valores obtidos pela requisição SCIM
    console.log(jsonUsuarioSCIM);
    this.usuario = {
      nome: "",
      sobrenome: "",
      nomeUsuario: "",
      email: "",
      senha: "",
      numeroTelefone: "",
      pais: "",
      estado: "",
      id: "",
    }

    this.usuario.nome = jsonUsuarioSCIM.name.familyName;
    this.usuario.sobrenome = jsonUsuarioSCIM.name.givenName;
    this.usuario.nomeUsuario = jsonUsuarioSCIM.userName;
    this.usuario.email = jsonUsuarioSCIM.emails[0].value;
    this.usuario.numeroTelefone = jsonUsuarioSCIM.phoneNumbers[0].value;
    let endereco = jsonUsuarioSCIM.addresses[0].value.split(" / "); // Quebrar o valor Brasil / SP
    this.usuario.pais = endereco[0];
    this.usuario.estado = endereco[1];
    this.usuario.id = id_usuario;

    this.daoUsuarios.setUsuarioAtivo(this.usuario);
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
    //Limpa o usuário ativo na aplicação e remove-o no cache do celular      
    this.usuario = {
      nome: "",
      sobrenome: "",
      nomeUsuario: "",
      email: "",
      senha: "",
      numeroTelefone: "",
      cargo: "",
      empresa: "",
      id: "",
    }
    this.isLogado = false;
    this.daoUsuarios.deletaUsuarioAtivo();
  }


  getNomeCompleto(): string {
    return (this.usuario.nome + " " + this.usuario.sobrenome);
  }



}
