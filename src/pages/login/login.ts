import { Component, ViewChild } from '@angular/core';
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
import { Keyboard } from 'ionic-native';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  @ViewChild('focusInput') primeiroInput;


  private nomeUsuario: string;
  private senha: string;
  private loginForm: FormGroup;
  private submitForm: boolean;
  private loginError: boolean;

  constructor(public navCtrl: NavController,
    public usuarioAtivoProvider: UsuarioAtivoProvider,
    public daoProvider: DaoProvider,
    public navParams: NavParams,
    public apiUsuarios: ApiUsuariosProvider,
    private toastCtrl: ToastController,
    public events: Events,
    public formBuilder: FormBuilder) {

    this.nomeUsuario = this.navParams.get('credencial');
    this.senha = this.navParams.get('senha');
    this.loginForm = formBuilder.group({
      nomeUsuario: [this.nomeUsuario, Validators.compose([Validators.required, Validators.minLength(5)])],
      senha: [this.senha, Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }





  ionViewWillEnter() {
    this.submitForm = false;
    this.loginError = false;
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
    this.nomeUsuario = this.loginForm.controls.nomeUsuario.value;
    this.senha = this.loginForm.controls.senha.value;
    this.submitForm = true;

    console.log(this.submitForm);

    this.apiUsuarios.loginUsuario(this.nomeUsuario, this.senha, () => {
      console.log("Saiu no login.ts")
      this.presentToast();
      this.usuarioAtivoProvider.isLogado = true;
      this.navCtrl.pop();
    }, () => {
      this.loginError = true;
    });
  }

  presentToast() {
    let usuario = this.usuarioAtivoProvider.getNomeCompleto()
    let loginConfirmadoToast = this.toastCtrl.create({

      message: "Bem-vindo(a) " + usuario + "!",
      duration: 3000,
      position: 'top'
    });

    loginConfirmadoToast.present()
  }
}
