import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { RastreadorLocalizacaoProvider } from '../../providers/rastreador-localizacao/rastreador-localizacao';
import { UsuarioAtivoProvider } from '../../providers/usuario-ativo/usuario-ativo';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { PlatformLocation } from '@angular/common';
import { CapturaSmsProvider } from '../../providers/captura-sms/captura-sms';
import { AutenticacaoDigitalProvider } from '../../providers/autenticacao-digital/autenticacao-digital';

declare var SMS: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private mostraSlidesIniciais: boolean;
  public usuario: Usuario;
  public mensagemSecreta: string;

  @ViewChild(Slides) slides: Slides;

  constructor(
    public capturaSmsProvider: CapturaSmsProvider,
    public platform: Platform,
    public androidPermissions: AndroidPermissions,
    public usuarioAtivoProvider: UsuarioAtivoProvider,
    public rastreadorLocalizacao: RastreadorLocalizacaoProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public autenticacaoDigital: AutenticacaoDigitalProvider) {
    this.mensagemSecreta = 'Mensagem secreta está oculta!';

    // this.usuario = this.navParams.get('usuarioLogado');
    //  this.events.subscribe('usuario-criado', (usuario) => {
    //   this.usuario = usuario;
    // });

  }

  ionViewDidLoad() {
    this.usuario = this.usuarioAtivoProvider.getUsuario();
    console.log(this.usuario);
    this.mostraSlides();

  }

  mostraSlides() {
    if (this.usuario.firstLogin == true) {
      this.mostraSlidesIniciais = true
    } else this.mostraSlidesIniciais = false;
  }

  fechaSlides() {
    this.mostraSlidesIniciais = false;
    this.usuarioAtivoProvider.firstLoginToggle();
  }

  pedePermissaoSms() {
    this.capturaSmsProvider.pedePermissaoSms();
  }

  aguardaSms() {
    this.capturaSmsProvider.escutaPorSms();
  }

  goToSlide() {
    this.slides.slideTo(2, 500);
  }

  iniciaRastreamento() {
    this.rastreadorLocalizacao.comecaRastrear();
  }

  interrompeRastreamento() {
    this.rastreadorLocalizacao.terminaRastrear();
  }

  desbloqueiaMensagem() {
    this.autenticacaoDigital.validaDigital(() => {
      this.mensagemSecreta = 'BAZINGA!';
    });
  }

}
