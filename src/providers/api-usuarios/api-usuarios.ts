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

  private _scimAdminToken: string;

  constructor(
    public http: HttpClient,
    public usuarioAtivo: UsuarioAtivoProvider) {
    console.log('Hello ApiUsuariosProvider Provider');
  }

  pedeTokenConexao() {
    /* OAUTH2 POST */
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
        this._scimAdminToken = data.access_token;
      });

  }

  loginUsuario(usuario, senha, cb) {
    /* OAUTH2 POST */
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
          let idUsuario = (this.parseJwt(data.id_token));
          idUsuario = idUsuario.sub;
          console.log(idUsuario);

          this.pegaDadosUsuario(idUsuario, data.access_token, data.refresh_token, () => {
            cb();
          });
        }
      })
  }

  pegaDadosUsuario(idUsuario, access_token, refresh_token, cb) {
    /* O SCIM2 GET */
    const url = 'https://localhost:9443/scim2/Users/' + idUsuario;
    const httpOptions = {
      headers: new HttpHeaders({
        "Accept": "application/json",
        "Authorization": "Bearer " + this._scimAdminToken
      })
    };

    this.http.get(url, httpOptions)
      .map((res: Response) => <LoginToken>res)
      .subscribe(data => {
        console.log(data);
        this.usuarioAtivo.setUsuario(data, idUsuario);
        this.usuarioAtivo.setAccessTokens(access_token, refresh_token);
        cb();
      })
  }

  criaUsuario(usuario, cb) {
    /* SCIM2 POST */
    let nomeUsuario = usuario.nome + '.' + usuario.sobrenome;
    const url = 'https://localhost:9443/scim2/Users';
    const httpOptions = {
      headers: new HttpHeaders({
        "Accept": "application/json",
        "Authorization": "Bearer " + this._scimAdminToken
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
        "employeeNumber": "",
        "costCenter": "",
        "organization": usuario.empresa,
        "division": usuario.areaDeInteresse,
        "department": usuario.cargo,
        "manager": {
          "managerId": "",
          "displayName": ""
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
        cb(nomeUsuario);
      })

  }

  atualizaUsuario(usuario, cb) {
    /* SCIM2 PUT */
    let nomeUsuario = usuario.nome + '.' + usuario.sobrenome;
    const url = 'https://localhost:9443/scim2/Users/' + usuario.id;
    const httpOptions = {
      headers: new HttpHeaders({
        "Accept": "application/json",
        "Authorization": "Bearer " + this._scimAdminToken
      })
    };

    this.http.put(url, {
      "schemas": [],
      "name": {
        "familyName": usuario.nome,
        "givenName": usuario.sobrenome
      },
      "userName": nomeUsuario,
      "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
        "employeeNumber": "",
        "costCenter": "",
        "organization": usuario.empresa,
        "division": usuario.areaDeInteresse,
        "department": usuario.cargo,
        "manager": {
          "managerId": "",
          "displayName": ""
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
        this.usuarioAtivo.setUsuario(data, usuario.id);
        cb();
      })
  }

  uploadImagemUsuario(usuario) {
    /* SCIM2 PUT - PRECISA ARRUMAR */
    let nomeUsuario = usuario.nome + '.' + usuario.sobrenome;
    const url = 'https://localhost:9443/scim2/Users';
    const httpOptions = {
      headers: new HttpHeaders({
        "Accept": "application/json",
        "Authorization": "Bearer " + this._scimAdminToken
      })
    };

    this.http.put(url, {
      "schemas": [],
      "userName": nomeUsuario,

    }, httpOptions)
      .map((res: Response) => <LoginToken>res)
      .subscribe(data => {
        console.log(data);
      })

  }

  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  };

}
