import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { Injectable } from '@angular/core';

/*
  Generated class for the AutenticacaoDigitalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AutenticacaoDigitalProvider {

  constructor(private faio: FingerprintAIO) {
    console.log('Hello AutenticacaoDigitalProvider Provider');
  }

  validaDigital(cbSucesso) {
    this.faio.show({
      clientId: 'Fingerprint-Demo',
      clientSecret: 'password', //Only necessary for Android
      disableBackup: true,  //Only for Android(optional)
      localizedFallbackTitle: 'Use Pin', //Only for iOS
      localizedReason: 'Please authenticate' //Only for iOS
    })
      .then((result: any) => {
        cbSucesso();
        console.log(result)
      })
      .catch((error: any) => console.log(error));

  }


}
