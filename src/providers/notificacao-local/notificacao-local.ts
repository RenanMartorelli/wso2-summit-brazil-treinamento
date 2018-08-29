import { LocalNotifications } from '@ionic-native/local-notifications';
import { Injectable } from '@angular/core';

/*
  Generated class for the NotificacaoLocalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificacaoLocalProvider {

  constructor(
    private localNotifications: LocalNotifications
  ) {
    console.log('Hello NotificacaoLocalProvider Provider');
  }

  criaNotificacaoCodigo(codigo) {

    let mensagem: string = 'Seu código é ' + codigo;
    this.localNotifications.schedule({
      id: 1,
      title: 'Código de Acesso',
      text: mensagem,
      color: 'FF5000',
      trigger: { at: new Date(new Date().getTime() + 5) },
      icon: '../../assets/imgs/ic_stat_fiber_pin.png',
      smallIcon: '../../assets/imgs/ic_stat_fiber_pin.png',
      led: 'FF0000',
      sound: null
    });
  }
}
