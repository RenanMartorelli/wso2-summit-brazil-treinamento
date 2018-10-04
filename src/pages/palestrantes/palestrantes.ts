import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Palestrante } from '../../models/palestrante';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad PalestrantesPage');
    this.palestrantes = [];
    let palestrante1 = {
      nome: 'Renan Martorelli',
      curriculo: 'Full-stack Dev e Arquiteto de Soluções Web a mais de 5 anos, especialista em integração de sistemas',
      foto: '../../assets/imgs/FotoLinkedIn.jpg',
      linkLinkedIn: 'https://www.linkedin.com/in/renan-martorelli/',
      tema: 'Integrando sistemas Angular ao WSO Identity Server'
    }
    this.palestrantes.push(palestrante1);

    console.log('ionViewDidLoad PalestrantesPage');

    let palestrante2 = {
      nome: 'João Emilio',
      curriculo: 'Arquiteto de Soluções e Head de vendas e produtos da WSO2 Brasil.',
      foto: '../../assets/imgs/joaoEmilio.jpg',
      linkLinkedIn: 'https://www.linkedin.com/in/joaoemilio/',
      tema: 'Transformação digital e Serverless architecture'
    }
    this.palestrantes.push(palestrante2);
  }

  createPalestrante() {

  }

}
