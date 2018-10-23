
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Usuario } from '../../models/usuario';
import { Coordenada } from '../../models/coordenada';

/*
  Generated class for the DaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DaoProvider {
  public match: boolean
  public usuario: Usuario;
  constructor(
    private storage: Storage) {

    console.log('Hello DaoProvider Provider');
  }


  verificaUsuarioAtivo(cbSucesso, cbFalha) {
    this.storage.get('usuarioAtivo').then((usuario) => {
      if (usuario != null) {
        this.usuario = usuario;
        cbSucesso();
      } else cbFalha();
    });
  }

  setUsuarioAtivo(usuario: Usuario) {
    let chave: string = 'usuarioAtivo'
    this.storage.set(chave, usuario)
  }

  deletaUsuarioAtivo() {
    this.storage.remove('usuarioAtivo')
  }


  insereUsuario(usuario: Usuario) {
    console.log(usuario);
    let chave: string = usuario.nome;
    this.storage.set(chave, usuario).then(() => {
      console.log("Usuário" + usuario.nome + "logado com sucesso!");
    });
  }


  /* insereCoordenada(coordenada: Coordenada) {

    console.log(coordenada);
    let chave: string = coordenada.usuario.nome + ' ' + coordenada.date;
    this.storage.set(chave, coordenada).then(() => {
      console.log("Deveria ter funfado")
    });
  } */

  /*pegaCoordenadas() {
    let coordenadas: Coordenada[] = [];
    this.storage.forEach((coordenada: Coordenada) => {

      let tipoObjeto: object = Object.keys(coordenada);  //checa o tipo de objeto a ser guardado
      if (tipoObjeto[0] == "latitude") {
        if (coordenada.usuario.nome == this.usuarioAtivoProvider.usuario.nome) {
          coordenadas.push(coordenada);
        }
      }
    });
    return coordenadas;
  } */
}
