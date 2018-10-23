import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Activity } from '../../models/activity';
import { ApiConteudoProvider } from '../../providers/api-conteudo/api-conteudo';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apiConteudo: ApiConteudoProvider
  ) {

  }

  ionViewWillLoad() {
    this.apiConteudo.getBaloesCronograma(() => {
      console.log(this.activities);
      this.activities = this.apiConteudo.baloes;
    });

  }

  ionViewDidLoad() {



    console.log('ionViewDidLoad CronogramaPage');
  }

}
