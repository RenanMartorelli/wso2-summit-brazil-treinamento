import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { DaoProvider } from '../providers/dao/dao';
import { IonicStorageModule } from '@ionic/storage';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { RastreadorLocalizacaoProvider } from '../providers/rastreador-localizacao/rastreador-localizacao';
import { AgendaPage } from '../pages/agenda/agenda';
import { UsuarioAtivoProvider } from '../providers/usuario-ativo/usuario-ativo';
import { DateParserProvider } from '../providers/date-parser/date-parser';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { CapturaSmsProvider } from '../providers/captura-sms/captura-sms';
import { NotificacaoLocalProvider } from '../providers/notificacao-local/notificacao-local';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AutenticacaoDigitalProvider } from '../providers/autenticacao-digital/autenticacao-digital';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AgendaPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'WSO2_CONF_APP_DATABASE',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AgendaPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    RastreadorLocalizacaoProvider,
    BackgroundGeolocation,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DaoProvider,
    UsuarioAtivoProvider,
    DateParserProvider,
    AndroidPermissions,
    CapturaSmsProvider,
    NotificacaoLocalProvider,
    LocalNotifications,
    AutenticacaoDigitalProvider,
    FingerprintAIO
  ]
})
export class AppModule { }
