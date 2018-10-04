import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UsuarioAtivoProvider } from '../usuario-ativo/usuario-ativo';
import { Usuario } from '../../models/usuario';
import { LoginToken } from '../../models/loginToken';

/*
  Generated class for the ApiUsuariosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiUsuariosProvider {

  private _authToken: string;

  constructor(
    public http: HttpClient,
    public usuarioAtivo: UsuarioAtivoProvider) {
    console.log('Hello ApiUsuariosProvider Provider');
  }

  pedeToken() {
    const url = ' https://localhost:9443/oauth2/token'
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + btoa('59LPtymVyB6q8XcDTuAFMWgNHtMa:tDSw41NeHjudwEUmZ_MNV77epVIa')
      })
    }
    this.http.post(url, "grant_type=password&username=admin&password=admin", httpOptions)
      .map((res: Response) => <LoginToken>res)
      .subscribe(data => {
        console.log(data.access_token);
        this._authToken = data.access_token;
      });

  }

  loginUsuario(usuario, senha, cb) {
    const url = ' https://localhost:9443/oauth2/token'
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + btoa('59LPtymVyB6q8XcDTuAFMWgNHtMa:tDSw41NeHjudwEUmZ_MNV77epVIa')
      })
    }
    this.http.post(url, `grant_type=password&username=${usuario}&password=${senha}&scope=openid`, httpOptions)
      .map((res: Response) => <LoginToken>res)
      .subscribe(data => {
        console.log(data);
        if (data.access_token != null) {
          console.log('logado com sucesso!');
          console.log(atob(data.id_token));
          this.usuarioAtivo.setUsuarioAtual(usuario, data.access_token, data.refresh_token);
          cb();
        }
      })
  }

  novoUsuario(usuario) {
    let nomeUsuario = usuario.nome + '.' + usuario.sobrenome;
    const url = 'https://localhost:9443/scim2/Users';
    const httpOptions = {
      headers: new HttpHeaders({
        "Accept": "application/json",
        "Authorization": "Bearer " + this._authToken
      })
    };

    this.http.post(url, {
      "schemas": [],
      "name": {
        "familyName": usuario.nome,
        "givenName": usuario.sobrenome
      },
      "userName": nomeUsuario,
      "password": usuario.senha,
      "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
        "employeeNumber": "1231",
        "costCenter": "13123",
        "organization": usuario.empresa,
        "division": usuario.areaDeInteresse,
        "department": usuario.cargo,
        "manager": {
          "managerId": "123",
          "displayName": "12312"
        }
      },
      "emails": [
        {
          "primary": true,
          "value": usuario.email,
          "type": "work"
        }
      ],
      "addresses": [
        {
          "type": "work",
          "streetAddress": "",
          "locality": "",
          "region": usuario.estado,
          "postalCode": "",
          "country": usuario.pais,
          "formatted": usuario.pais + " / " + usuario.estado,
          "primary": true
        },
      ],
      "phoneNumbers": [
        {
          "value": usuario.numeroTelefone,
          "type": "mobile"
        },
      ]

    }, httpOptions)
      .map((res: Response) => <LoginToken>res)
      .subscribe(data => {
        console.log(data);
      })

  }

  uparImagemUsuario(usuario) {
    let nomeUsuario = usuario.nome + '.' + usuario.sobrenome;
    const url = 'https://localhost:9443/scim2/Users';
    const httpOptions = {
      headers: new HttpHeaders({
        "Accept": "application/json",
        "Authorization": "Bearer " + this._authToken
      })
    };

    this.http.put(url, {
      "schemas": [],
      "name": {
        "familyName": usuario.nome,
        "givenName": usuario.sobrenome
      },
      "userName": nomeUsuario,
      "password": usuario.senha,
      "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
        "employeeNumber": "1231",
        "costCenter": "13123",
        "organization": "Empresa atualizada!",
        "division": usuario.areaDeInteresse,
        "department": usuario.cargo,
        "manager": {
          "managerId": "123",
          "displayName": "12312"
        }
      },
      "emails": [
        {
          "primary": true,
          "value": usuario.email,
          "type": "work"
        }
      ],
      "addresses": [
        {
          "type": "work",
          "streetAddress": "",
          "locality": "",
          "region": usuario.estado,
          "postalCode": "",
          "country": usuario.pais,
          "formatted": usuario.pais + " / " + usuario.estado,
          "primary": true
        },
      ],
      "phoneNumbers": [
        {
          "value": usuario.numeroTelefone,
          "type": "mobile"
        },
      ]

    }, httpOptions)
      .map((res: Response) => <LoginToken>res)
      .subscribe(data => {
        console.log(data);
      })

  }

}
