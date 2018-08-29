import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { Geolocation } from '@ionic-native/geolocation';
import { AgendaPage } from '../pages/agenda/agenda';
import { UsuarioAtivoProvider } from '../providers/usuario-ativo/usuario-ativo';
import { Usuario } from '../models/usuario';
import { Events } from 'ionic-angular';
import { DaoProvider } from '../providers/dao/dao';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  usuario: Usuario;
  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any }>;

  constructor(

    public events: Events,
    public usuarioAtivoProvider: UsuarioAtivoProvider,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private daoProvider: DaoProvider,
    private geolocation: Geolocation,
    private alertCtrl: AlertController,
    private backgroundGeolocation: BackgroundGeolocation) {
    this.initializeApp();

    this.usuario = {
      nome: '',
      senha: ''
    }

    events.subscribe('usuario logado', (usuario) => {
      this.usuario = usuario;
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Coordenadas', component: AgendaPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ionViewWillLoad() {
    this.usuario = this.usuarioAtivoProvider.getUsuario();
  }

  chamaAlertLogout() {
    let alert = this.alertCtrl.create({
      title: 'Tem certeza que deseja deslogar?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.daoProvider.deletaUsuarioAtivo();
            this.nav.setRoot(LoginPage);
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
