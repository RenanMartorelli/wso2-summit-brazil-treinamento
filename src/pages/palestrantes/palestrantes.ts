import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Palestrante } from '../../models/palestrante';
import { ApiConteudoProvider } from '../../providers/api-conteudo/api-conteudo';

/**
 * Generated class for the PalestrantesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-palestrantes',
  templateUrl: 'palestrantes.html',
})
export class PalestrantesPage {
  public palestrantes: Palestrante[]

  @ViewChild(Slides) slides: Slides;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiConteudo: ApiConteudoProvider) {
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad PalestrantesPage');

    this.palestrantes = [];
    this.apiConteudo.getPalestrantes(() => {
      this.palestrantes = this.apiConteudo.palestrantes;
      console.log(this.palestrantes);
    })

  }

}
