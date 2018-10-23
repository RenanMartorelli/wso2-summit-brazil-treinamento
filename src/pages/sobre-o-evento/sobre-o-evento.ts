import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConteudoTexto } from '../../models/conteudoTexto';
import { ApiConteudoProvider } from '../../providers/api-conteudo/api-conteudo';

/**
 * Generated class for the SobreOEventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sobre-o-evento',
  templateUrl: 'sobre-o-evento.html',
})
export class SobreOEventoPage {

  public textoParagrafos: string[] = [];

  private _conteudo = [];



  constructor(public navCtrl: NavController, public navParams: NavParams,
    private apiConteudo: ApiConteudoProvider) {
    this._conteudo = [
      {
        Header: '',
        texto: ''
      },
      {
        Header: '',
        texto: ''
      },
      {
        Header: '',
        texto: ''
      },
      {
        Header: '',
        texto: ''
      },
    ];
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SobreOEventoPage');
  }

  ionViewWillLoad() {
    this.getTextoPagina();
  }

  formataTexto() {
    for (let i = 0; i < this._conteudo.length; i++) {
      let paragrafos;
      paragrafos = this._conteudo[i].texto
      paragrafos = paragrafos.split(/\r?\n/);
      console.log(paragrafos);
      this.textoParagrafos[i] = paragrafos;
    }
  }

  getTextoPagina() {
    this.apiConteudo.getTextoSobreEvento(() => {
      this._conteudo = this.apiConteudo.textoSobreEvento;
      this.formataTexto();


      console.log(this._conteudo);
    });
  }

}
