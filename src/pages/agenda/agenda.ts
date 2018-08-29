import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UsuarioAtivoProvider } from '../../providers/usuario-ativo/usuario-ativo';
import { Usuario } from '../../models/usuario';
import { Coordenada } from '../../models/coordenada';
import { DaoProvider } from '../../providers/dao/dao';


@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html'
})
export class AgendaPage {

  usuario: Usuario;
  coordenadas: Coordenada[];

  constructor(
    public daoProvider: DaoProvider,
    public usuarioAtivoProvider: UsuarioAtivoProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {

    this.usuario = this.usuarioAtivoProvider.getUsuario()

  }

  ionViewDidLoad() {
    this.coordenadas = this.daoProvider.pegaCoordenadas()
  }


}
