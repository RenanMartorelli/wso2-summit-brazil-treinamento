import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConteudoTexto } from '../../models/conteudoTexto';
import { ApiConteudoProvider } from '../../providers/api-conteudo/api-conteudo';

/**
 * Generated class for the InformacoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-informacoes',
  templateUrl: 'informacoes.html',
})


export class InformacoesPage {
  public textoParagrafos: string[] = [];
  private _conteudo;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private apiConteudo: ApiConteudoProvider) {
    this._conteudo = [{
      subHeader: '',
      texto: ''
    },
    {
      subHeader: '',
      texto: ''
    },
    {
      subHeader: '',
      texto: ''
    },
    ];
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformacoesPage');
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
    this.apiConteudo.getTextoInformacoes(() => {
      this._conteudo = this.apiConteudo.textoInformacoes;
      console.log(this._conteudo);
      this.formataTexto();
    });
  }

}
