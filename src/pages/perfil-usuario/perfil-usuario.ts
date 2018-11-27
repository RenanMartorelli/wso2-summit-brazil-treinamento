import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioAtivoProvider } from '../../providers/usuario-ativo/usuario-ativo';
import { ImagePicker } from '@ionic-native/image-picker';
import { UpdateUsuarioPage } from '../update-usuario/update-usuario';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usuarioAtivo: UsuarioAtivoProvider,
    public imagePicker: ImagePicker) {

  }

  escolheFoto() {
    console.log("Requisitando permissão");
    this.imagePicker.requestReadPermission();

    let options = {
      maximumImagesCount: 1
    };

    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    }, (err) => {
      console.log("Deu errado, nao pegou imagem nenhuma!");
    });
  }

  ionViewWillEnter() {
    this.fotoPerfil = '../../assets/imgs/empt-user.png';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilUsuarioPage');
  }

  abreOpcoesPage() {
    this.navCtrl.push('UpdateUsuarioPage');
  }

  toggleChat() {

  }

  deslogar() {
    this.usuarioAtivo.removeUsuario();
    this.navCtrl.pop();
  }

}
