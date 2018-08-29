
import { Injectable, NgZone } from '@angular/core';
import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { NotificacaoLocalProvider } from '../notificacao-local/notificacao-local';
declare var SMS: any;
/*
  Generated class for the CapturaSmsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CapturaSmsProvider {

  public remetente: string
  public mensagem: string

  constructor(
    public noticacaoLocal: NotificacaoLocalProvider,
    public zone: NgZone,
    public platform: Platform,
    public androidPermissions: AndroidPermissions,
    public events: Events
  ) {
    console.log('Hello CapturaSmsProvider Provider');
  }

  pedePermissaoSms() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
      success => console.log('Permission granted'),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS)
    );

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);
  }

  escutaPorSms() {
    this.platform.ready().then((readySource) => {

      if (SMS) SMS.startWatch(() => {
        console.log('watching started');
      }, Error => {
        console.log('failed to start watching');
      });

      document.addEventListener('onSMSArrive', (e: any) => {

        this.zone.run(() => {
          this.remetente = e.data.address; // sms retorna um objeto com os parâmetros adress e body
          let a = e.data.body.indexOf("#WSO2")
          if (a == -1) {
            console.log("A mensagem recebida não é do remetente desejado")
          } else {
            console.log('Remetente identificado!')
            let codigo = e.data.body.match(/\d{4}/g);
            if (codigo.length != null) {
              console.log(codigo[0]);
              this.mensagem = codigo[0];
              this.noticacaoLocal.criaNotificacaoCodigo(codigo[0]);
            } else console.log("código não contido na mensagem");
          }
        });


      });

    });

  }

}
