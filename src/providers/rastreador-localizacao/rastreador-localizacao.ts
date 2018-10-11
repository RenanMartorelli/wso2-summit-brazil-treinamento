
import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { Subscription } from 'rx';
import { Observable } from 'rxjs/Observable';
import { Coordenada } from '../../models/coordenada';
import { UsuarioAtivoProvider } from '../usuario-ativo/usuario-ativo';
import { DaoProvider } from '../dao/dao';

/*
  Generated class for the RastreadorLocalizacaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RastreadorLocalizacaoProvider {
  lng: number;
  lat: number;
  watch: any;

  constructor(
    public daoProvider: DaoProvider,
    public usuarioAtivoProvider: UsuarioAtivoProvider,
    public zone: NgZone,
    public geolocation: Geolocation,
    public backgroundGeolocation: BackgroundGeolocation) {
    console.log('Hello RastreadorLocalizacaoProvider Provider');
  }

  comecaRastrear() {
    this.comecaRastrearForeground();
    this.comecaRastrearBackground();
  }

  comecaRastrearBackground() {

    /*  let config = {
        desiredAccuracy: 100,
        stationaryRadius: 20,
        distanceFilter: 30,
        stopOnTerminate: false,
        notificationTitle: 'geotracker',
        notificationText: 'Demonstrate background geolocation',
        activityType: 'other',
        debug: true,
        interval: 600000,
        fastestInterval: 500000,
        activitiesInterval: 550000
      };
  
      this.backgroundGeolocation.configure(config).subscribe((location) => {
  
        console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
  
        // Run update inside of Angular's zone
        this.zone.run(() => {
          let coordenada: Coordenada = {
            latitude: location.latitude,
            longitude: location.longitude,
            date: new Date().toISOString(),
            usuario: this.usuarioAtivoProvider.getUsuario(),
            modo: 'background-geolocation'
          }
  
          console.log(coordenada);
          this.daoProvider.insereCoordenada(coordenada);
  
  
          this.lat = location.latitude;
          this.lng = location.longitude;
        });
  
        this.backgroundGeolocation.finish();
  
      }, (err) => {
  
        console.log(err);
  
      });
  
      // Turn ON the background-geolocation system.
      this.backgroundGeolocation.start();
      */
  }

  comecaRastrearForeground() {

    /*
    // Foreground Tracking

    this.geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 600000
    }).then(position => {

      this.zone.run(() => {

        let coordenada: Coordenada = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          date: new Date().toISOString(),
          usuario: this.usuarioAtivoProvider.getUsuario(),
          modo: 'foreground-geolocation'
        }
        console.log(coordenada);
        this.daoProvider.insereCoordenada(coordenada);

        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });

      /* this.serverPush.pushPosition({
         accuracy: loc.coords.accuracy,
         bearing: loc.coords.heading,
         latitude: loc.coords.latitude,
         longitude: loc.coords.longitude,
         speed: loc.coords.speed,
         time: loc.timestamp
       });*/
    // });

  }


  terminaRastrear() {
    /* console.log('stopTracking');
     this.backgroundGeolocation.finish();
 */
  }

}
