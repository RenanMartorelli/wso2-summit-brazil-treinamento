import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Activity } from '../../models/activity';
import { Palestrante } from '../../models/palestrante';


/*
  Generated class for the ApiConteudoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiConteudoProvider {

  public ip : string = 'localhost:9090'; //change here to match the ip of the api server 192.168.99.100:9090

  public baloes: Activity[];
  public palestrantes: Palestrante[];
  textoSobreEvento: any;
  textoInformacoes: any;

  constructor(public http: HttpClient) {
    console.log('Hello ApiConteudoProvider Provider');
  }

  getPalestrantes(cb) {
    const url = 'http://' + this.ip + '/conteudo/palestrantes';
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Encoding": "utf8"
      })
    };

    this.http.get(url, httpOptions)
      .map((res: Response) => <any>res)
      .subscribe(data => {
        console.log(data[0]);
        this.palestrantes = data;
        cb();
      });
  }

  getBaloesCronograma(cb) {
    const url = 'http://' + this.ip + '/conteudo/baloes_cronograma';
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Encoding": "utf8"
      })
    };


    this.http.get(url, httpOptions)
      .map((res: Response) => <any>res)
      .subscribe(data => {
        console.log(data);

        this.baloes = data;
        cb();
      });
  }

  getTextoSobreEvento(cb) {
    const url = 'http://' + this.ip + '/conteudo/texto_sobre_evento';
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Encoding": "utf8"
      })
    };


    this.http.get(url, httpOptions)
      .map((res: Response) => <any>res)
      .subscribe(data => {
        console.log(data);

        this.textoSobreEvento = data;
        cb();
      });
  }

  getTextoInformacoes(cb) {
    const url = 'http://' + this.ip + '/conteudo/texto_informacoes';
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Encoding": "utf8"
      })
    };


    this.http.get(url, httpOptions)
      .map((res: Response) => <any>res)
      .subscribe(data => {
        console.log(data);

        this.textoInformacoes = data;
        cb();
      });
  }

  touchBotao() {
    const url = 'http://' + this.ip + '/conteudo/touch_botao';
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Encoding": "utf8"
      })
    };

    this.http.get(url, httpOptions)
      .map((res: Response) => <any>res)
      .subscribe(data => {
        console.log(data);
        this.palestrantes = data;
      });
  }

}
