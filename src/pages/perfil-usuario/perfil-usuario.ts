import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioAtivoProvider } from '../../providers/usuario-ativo/usuario-ativo';

/**
 * Generated class for the PerfilUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil-usuario',
  templateUrl: 'perfil-usuario.html',
})
export class PerfilUsuarioPage {

  public fotoPerfil: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public usuarioAtivo: UsuarioAtivoProvider) {

  }

  ionViewWillEnter() {
    this.fotoPerfil = '../../assets/imgs/empt-user.png';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilUsuarioPage');
  }

}
