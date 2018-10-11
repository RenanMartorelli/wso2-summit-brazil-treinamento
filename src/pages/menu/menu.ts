import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CronogramaPage } from '../cronograma/cronograma';
import { ChatPage } from '../chat/chat';
import { PalestrantesPage } from '../palestrantes/palestrantes';
import { RecadosPage } from '../recados/recados';
import { InformacoesPage } from '../informacoes/informacoes';
import { SobreOEventoPage } from '../sobre-o-evento/sobre-o-evento';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { InscricaoPage } from '../inscricao/inscricao';
import { ApiUsuariosProvider } from '../../providers/api-usuarios/api-usuarios';
import { UsuarioAtivoProvider } from '../../providers/usuario-ativo/usuario-ativo';
import { ImagePicker } from '@ionic-native/image-picker';
import { Events } from 'ionic-angular/util/events';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  private isLogado: boolean;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public apiUsuarios: ApiUsuariosProvider,
    public usuarioAtivo: UsuarioAtivoProvider,
    public events: Events,
    private imagePicker: ImagePicker) {
    this.events.subscribe('usuário carregado', () => {
      this.liberaMenus();
    });
    this.isLogado = false;
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  ionViewWillEnter() {
    this.liberaMenus();
  }

  liberaMenus() {
    console.log("Antes estava " + this.isLogado);

    if (this.usuarioAtivo.isLogado == true) {
      this.isLogado = true;
    }

    else {
      this.isLogado = false;
    }

    console.log("Agora está " + this.isLogado);
  }

  abreGaleria() {

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

  callMensagensPage() {
    if (this.isLogado == true) {
      this.navCtrl.push('ChatPage');
    }
  }

  showEscolhaInscricao() {
    const escolha = this.alertCtrl.create({
      title: 'Selecione uma das opções',
      buttons: [
        {
          text: 'Já estou inscrito',
          handler: () => {
            this.navCtrl.push(LoginPage);
            console.log('Já estou inscrito clicado');
          }
        }, {
          text: 'Nova inscrição',
          handler: () => {
            this.navCtrl.push(InscricaoPage);
            console.log('Nova inscrição clicado');
          }
        }

      ]
    });
    escolha.present();
  }

}
