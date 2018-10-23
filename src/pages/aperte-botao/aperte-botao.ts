import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiConteudoProvider } from '../../providers/api-conteudo/api-conteudo';

/**
 * Generated class for the RecadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aperte-botao',
  templateUrl: 'aperte-botao.html',
})
export class AperteBotaoPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiConteudo: ApiConteudoProvider
  ) {
  }

  private _counter: number
  private passouDoLimite: boolean
  ionViewDidLoad() {
    this._counter = 0;
    this.passouDoLimite = false;
    console.log('ionViewDidLoad RecadosPage');
  }

  clicaBotao() {
    this._counter++;
    this.apiConteudo.touchBotao();
    if (this._counter > 100) {
      this.passouDoLimite = true;
    }
  }

}
