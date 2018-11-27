import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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


  funcaoHttpExemplo() {
    const url = 'https://meuexemplo:0000/'
    const httpOptions = {
      headers: new HttpHeaders({
        "tituloHeaderHttp": "conteudoHeaderHttp"
      })
    }
    this.http.post(url, "conteudo da requisição", httpOptions)
      .map((res: Response) => res)
      .subscribe(data => {
        // manipular o json da resposta da requisição
      })
  }






  pedeTokenConexao() {
    /* POST usando OAUTH2  */

  }

  loginUsuario(email, senha, cbSucesso, cbErro) {
    /* POST usando OAUTH2  */

  }

  pegaDadosUsuario(idUsuario, access_token, refresh_token, cb) {
    /* GET usando a API SCIM  */

  }

  criaUsuario(usuario, cbSucesso, cbErro) {
    /* SCIM2 POST */

  }

  atualizaUsuario(usuario, cbSucesso, cbErro) {
    /* PUT usando a API SCIM  */

  }

  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }

  /*
  INFORMAÇÕES ÚTEIS. 
    - Pode ser necessário criar um modelo de objeto para poder manipular o json de resposta da API,
    para tanto, vá em src/models e crie uma nova classe seguindo o modelo de outras já existentes
  
    
  FUNÇÕES ÚTEIS.
    - btoa(string) -> retorna string codificada em base64
    - atob(stringBase64) -> retorna string decodificada
    - this.parseJwt(token) -> retorna token JWT decodificado
    */





  // ****** COLA DA APLICAÇÃO EM FUNCIONAMENTO ********


  // pedeTokenConexao() {
  //   /* POST usando OAUTH2  */
  //   const url = 'https://localhost:9443/oauth2/token'
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       "Authorization": "Basic " + btoa('59LPtymVyB6q8XcDTuAFMWgNHtMa:tDSw41NeHjudwEUmZ_MNV77epVIa')
  //     })
  //   }
  //   this.http.post(url, "grant_type=password&username=admin&password=admin", httpOptions)
  //     .map((res: Response) => <LoginToken>res)
  //     .subscribe(data => {
  //       console.log(data.access_token);
  //       this._scimAdminToken = data.access_token;
  //     });
  // }

  // loginUsuario(email, senha, cbSucesso, cbErro) {
  //   /* POST usando OAUTH2  */
  //   const url = ' https://localhost:9443/oauth2/token'
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       "Authorization": "Basic " + btoa('59LPtymVyB6q8XcDTuAFMWgNHtMa:tDSw41NeHjudwEUmZ_MNV77epVIa')
  //     })
  //   }
  //   console.log(email);
  //   this.http.post(url, `grant_type=password&username=${email}&password=${senha}&scope=openid`, httpOptions)
  //     .map((res: Response) => <LoginToken>res)

  //     .subscribe(data => {
  //       console.log(data);
  //       if (data.access_token != null) {
  //         console.log('logado com sucesso!');
  //         let idUsuario = (this.parseJwt(data.id_token));
  //         idUsuario = idUsuario.sub;
  //         console.log(idUsuario);

  //         this.pegaDadosUsuario(idUsuario, data.access_token, data.refresh_token, () => {
  //           cbSucesso();
  //         });
  //       }
  //     },
  //     error => {
  //       console.log("esse é o erro:");
  //       console.log(error);
  //       cbErro();
  //     }
  //     );
  // }

  // pegaDadosUsuario(idUsuario, access_token, refresh_token, cb) {
  //   /* GET usando a API SCIM  */
  //   const url = 'https://localhost:9443/scim2/Users/' + idUsuario;
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       "Accept": "application/json",
  //       "Authorization": "Bearer " + this._scimAdminToken
  //     })
  //   };

  //   this.http.get(url, httpOptions)
  //     .map((res: Response) => <LoginToken>res)
  //     .subscribe(data => {
  //       let usuario = data;
  //       this.usuarioAtivo.setUsuario(usuario, idUsuario);
  //       this.usuarioAtivo.setAccessTokens(access_token, refresh_token);
  //       cb();
  //     })
  // }

  // criaUsuario(usuario, cbSucesso, cbErro) {
  //   /* SCIM2 POST */
  //   const url = 'https://localhost:9443/scim2/Users';
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       "Accept": "application/json",
  //       "Authorization": "Bearer " + this._scimAdminToken
  //     })
  //   };

  //   this.http.post(url, {
  //     "schemas": [],
  //     "name": {
  //       "familyName": usuario.nome,
  //       "givenName": usuario.sobrenome
  //     },
  //     "userName": usuario.nomeUsuario,
  //     "password": usuario.senha,
  //     "emails": [
  //       {
  //         "primary": true,
  //         "value": usuario.email,
  //         "type": "work"
  //       }
  //     ],
  //     "addresses": [
  //       {
  //         "type": "work",
  //         "region": usuario.estado,
  //         "country": usuario.pais,
  //         "formatted": usuario.pais + " / " + usuario.estado,
  //         "primary": true
  //       },
  //     ],
  //     "phoneNumbers": [
  //       {
  //         "value": usuario.numeroTelefone,
  //         "type": "mobile"
  //       },
  //     ]

  //   }, httpOptions)
  //     .map((res: Response) => <LoginToken>res)
  //     .subscribe(data => {
  //       console.log(data);
  //       cbSucesso();
  //     }, error => {
  //       let erro: string;
  //       console.log(error);
  //       if (error.status == 409) {
  //         let erro = "Já existe um usuário com esse nome!"
  //         console.log(erro);
  //       } else {
  //         erro = "Ops, algo deu errado, tente novamente mais tarde!"
  //         console.log(erro);
  //       }
  //       cbErro(erro);
  //     }
  //     )
  // }

  // atualizaUsuario(usuario, cbSucesso, cbErro) {
  //   /* PUT usando a API SCIM  */
  //   const url = 'https://localhost:9443/scim2/Users/' + usuario.id;
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       "Accept": "application/json",
  //       "Authorization": "Bearer " + this._scimAdminToken
  //     })
  //   };

  //   this.http.put(url, {
  //     "schemas": [],
  //     "name": {
  //       "familyName": usuario.nome,
  //       "givenName": usuario.sobrenome
  //     },
  //     "userName": usuario.nomeUsuario,
  //     "emails": [
  //       {
  //         "primary": true,
  //         "value": usuario.email,
  //         "type": "work"
  //       }
  //     ],
  //     "addresses": [
  //       {
  //         "type": "work",
  //         "region": usuario.estado,
  //         "country": usuario.pais,
  //         "formatted": usuario.pais + " / " + usuario.estado,
  //         "primary": true
  //       },
  //     ],
  //     "phoneNumbers": [
  //       {
  //         "value": usuario.numeroTelefone,
  //         "type": "mobile"
  //       },
  //     ]

  //   }, httpOptions)
  //     .map((res: Response) => <LoginToken>res)
  //     .subscribe(data => {
  //       console.log(data);
  //       this.usuarioAtivo.setUsuario(data, usuario.id);
  //       cbSucesso();
  //     },
  //     error => {
  //       console.log(error);
  //       cbErro();
  //     })
  // }




}
