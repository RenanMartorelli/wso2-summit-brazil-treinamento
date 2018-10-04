import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Activity } from '../../models/activity';

/**
 * Generated class for the CronogramaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cronograma',
  templateUrl: 'cronograma.html',
})
export class CronogramaPage {

  public activities: Activity[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.activities = [];
    let a = {
      date: new Date(),
      title: '9h-10h: Credenciamento',
      author: 'autor',
      icon: 'card',
      text: 'Com café da manhã aberto para os participantes',
      type: 'text'
    }

    this.activities.push(a);

    let b = {
      date: new Date(),
      title: '10h-11h30: Abertura',
      author: 'Jamile',
      icon: 'microphone',
      text: 'A importância do Cloud Native para o mercado Latino Americano: Cases de sucesso com os produtos da WSO2',
      type: 'text'
    }

    this.activities.push(b);

    let c = {
      date: new Date(),
      title: '11h30-12h30: Keynote',
      author: 'Jamile',
      icon: 'star-outline',
      text: 'O grande momento da Transformação Digital já chegou.',
      type: 'text'
    }

    this.activities.push(c);

    let d = {
      date: new Date(),
      title: '12h30-14h: Almoço',
      author: 'Jamile',
      icon: 'restaurant',
      text: '',
      type: 'text'
    }

    this.activities.push(d);

    let e = {
      date: new Date(),
      title: '14h-15h: Ballerina na prática',
      author: 'Jamile',
      icon: 'code',
      text: 'Explicando com demonstrações em tempo real o poder de uma linguagem Cloud Native',
      type: 'text'
    }

    this.activities.push(e);


  }

  ionViewWillLoad() {

  }

  ionViewDidLoad() {



    console.log('ionViewDidLoad CronogramaPage');
  }

}
