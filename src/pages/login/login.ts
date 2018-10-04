import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DaoProvider } from '../../providers/dao/dao';
import { Usuario } from '../../models/usuario';
import { Events } from 'ionic-angular';
import { UsuarioAtivoProvider } from '../../providers/usuario-ativo/usuario-ativo';
import { MenuPage } from '../menu/menu';
import { InscricaoPage } from '../inscricao/inscricao';
import { ApiUsuariosProvider } from '../../providers/api-usuarios/api-usuarios';
import { ToastController } from 'ionic-angular';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private credencial: string;
  private senha: string;

  constructor(public navCtrl: NavController,
    public usuarioAtivoProvider: UsuarioAtivoProvider,
    public daoProvider: DaoProvider,
    public navParams: NavParams,
    public apiUsuarios: ApiUsuariosProvider,
    private toastCtrl: ToastController,
    public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    /* this.daoProvider.verificaUsuarioAtivo(
       () => {
 
         let usuario = this.daoProvider.usuario;
         console.log(usuario);
         this.usuarioAtivoProvider.setUsuario(usuario);
         this.navCtrl.setRoot(MenuPage);
         console.log("login efetuado com sucesso!")
       }, () => {
         return;
       }); {
 
     } */
  }

  goToInscricaoPage() {
    this.navCtrl.pop();
    this.navCtrl.push(InscricaoPage);
  }

  fazLogin() {
    this.apiUsuarios.loginUsuario(this.credencial, this.senha, () => {
      this.presentToast();
      this.navCtrl.pop();
    });
  }

  efetuaLogin() {
    /*
        let usuario: Usuario = {
          nome: this.credencial,
          senha: this.senha
        }
    
        // Entra aqui o método que conversa com o Back-end
    
        this.daoProvider.validaLogin(usuario, () => {
          if (this.daoProvider.match == true) {
            usuario.firstLogin = true;
            this.usuarioAtivoProvider.setUsuario(usuario);
    
    
            //   this.events.publish('usuario-criado', usuario);
            this.navCtrl.setRoot(HomePage);
            console.log("login efetuado com sucesso!")
          }
        });
        */
  }

  presentToast() {
    let usuario = this.usuarioAtivoProvider.getUsuario()
    let loginConfirmadoToast = this.toastCtrl.create({

      message: 'Usuário: ' + usuario + ' logado com sucesso!',
      duration: 3000,
      position: 'top'
    });

    loginConfirmadoToast.present()
  }
}
