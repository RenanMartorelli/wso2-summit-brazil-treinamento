import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiUsuariosProvider } from '../../providers/api-usuarios/api-usuarios';
import { Usuario } from '../../models/usuario';
import { LoginPage } from '../login/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


/**
 * Generated class for the InscricaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inscricao',
  templateUrl: 'inscricao.html',
})
export class InscricaoPage {

  public nome: string;
  public sobrenome: string;
  public nomeUsuario: string;
  public email: string;
  public senha: string;
  public confirmarSenha: string;
  public numeroTelefone: string;
  public cargo: string;
  public empresa: string;
  public pais: string;
  public estado: string;
  public areaDeInteresse: string;
  private inscricaoForm: FormGroup;
  private senhaConfirmada: boolean;
  private existeErroServidor: boolean;
  private tentouEnviar: boolean;
  private mensagemErro: string;

  public paises = [
    "Brasil", "Argentina", "Afeganistão", "Chile", "Albânia", "Argélia", "Andorra", "Angola", "Anguilla", "Antígua e Barbuda", "Arménia", "Aruba", "Austrália", "Áustria", "Azerbaijão", "Bahamas"
    , "Bahrain", "Bangladesh", "Barbados", "Bielorrússia", "Bélgica", "Belize", "Benin", "Bermudas", "Butão", "Bolívia", "Bósnia e Herzegovina", "Botsuana", " Ilhas Virgens Britânicas",
    , "Brunei", "Bulgária", "Burkina Faso", "Burundi", "Camboja", "Camarões", "Canadá", "Cabo Verde", "Ilhas Caimão", "Chade", "China ", " Colômbia ", " Congo ", " Ilhas Cook ", " Costa Rica "
    , "Costa do Marfim", "Croácia", "Navio de Cruzeiro", "Cuba", "Chipre", "República Checa", "Dinamarca", "Djibuti", "Dominica", "República Dominicana", "Equador", "Egito", "El Salvador", "Guiné Equatorial"
    , "Estónia", "Etiópia", "Ilhas Falkland", "Ilhas Faroé", "Fiji", "Finlândia", "França", "Polinésia Francesa", "Índias Ocidentais Francesas", "Gabão", "Gâmbia", "Geórgia", "Alemanha", "Gana"
    , "Gibraltar", "Grécia", "Gronelândia", "Granada", "Guam", "Guatemala", "Guernsey", "Guiné", "Guiné-Bissau", "Guiana", "Haiti", "Honduras", "Hong Kong", "Hungria", "Islândia", "Índia"
    , "Indonésia", "Irã", "Iraque", "Irlanda", "Ilha de Man", "Israel", "Itália", "Jamaica", "Japão", "Jersey", "Jordânia", "Cazaquistão", "Quénia", "Kuwait", "República do Quirguizistão", "Laos", "Letónia"
    , "Líbano", "Lesoto", "Libéria", "Líbia", "Liechtenstein", "Lituânia", "Luxemburgo", "Macau", "Macedónia", "Madagáscar", "Malawi", "Malásia", " Maldivas ", " Mali ", " Malta ", " Mauritânia"
    , "Maurícia", "México", "Moldávia", "Mónaco", "Mongólia", "Montenegro", "Montserrat", "Marrocos", "Moçambique", "Namíbia", "Nepal", "Países Baixos", " Antilhas Holandesas ", " Nova Caledônia"
    , "Nova Zelândia", "Nicarágua", "Níger", "Nigéria", "Noruega", "Omã", "Paquistão", "Palestina", "Panamá", "Papua Nova Guiné", "Paraguai", "Peru ", " Filipinas ", " Polónia ", " Portugal ",
    , "Porto Rico", "Catar", "Reunião", "Roménia", "Rússia", "Ruanda", "São Pedro e Miquelon", "Samoa", "São Marino", "Satélite", "Arábia Saudita", "Senegal", "Serbia", "Seychelles"
    , "Serra Leoa", "Singapura", "Eslováquia", "Eslovénia", "África do Sul", "Coreia do Sul", "Espanha", "Sri Lanka", "São Cristóvão e Nevis", "Santa Lúcia", "São Vicente", "Santa Lúcia", "Sudão"
    , "Suriname", "Suazilândia", "Suécia", "Suíça", "Síria", "Taiwan", "Tajiquistão", "Tanzânia", "Tailândia", "Timor Leste", "Togo", "Tonga", "Trinidad e Tobago", "Tunísia "
    , "Turquia", "Turcomenistão", "Turks & Caicos", "Uganda", "Ucrânia", "Emirados Árabes Unidos", "Reino Unido", "Estados Unidos", "Ilhas Menores Distantes dos Estados Unidos", "Uruguai",
    , "Uzbequistão", "Venezuela", "Vietnã", "Ilhas Virgens (EUA)", "Iêmen", "Zâmbia", "Zimbábue"];


  constructor(
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    public apiUsuarios: ApiUsuariosProvider,
    public navParams: NavParams,
    public formBuilder: FormBuilder) {
    this.senhaConfirmada = true;
    this.tentouEnviar = false;
    this.existeErroServidor = false;
    this.inscricaoForm = formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.maxLength(30)])], //1° letra maiuscula e o resto minuscula
      sobrenome: ['', Validators.compose([Validators.required, Validators.maxLength(60)])], //1° letra maiuscula e o resto minuscula
      nomeUsuario: ['', Validators.compose([Validators.required, Validators.pattern(/\w+\.*\w*/g), Validators.minLength(6), Validators.maxLength(60)])], //não pode estar repetido - async - regex
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(64)])], // regex de e-mail, também não pode estar repetido - async
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmarSenha: ['', Validators.compose([Validators.required, Validators.minLength(6)])], // igual ao campo senha
      numeroTelefone: ['', Validators.compose([Validators.required, Validators.minLength(12)])], // criar máscara
      cargo: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(50)])],
      empresa: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(35)])],
      pais: ['Brasil', Validators.compose([Validators.required])],
      estado: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(35)])],
      areaDeInteresse: ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscricaoPage');
  }

  confirmaSenha() {

    console.log(this.inscricaoForm.controls.numeroTelefone.value);
    console.log("confirma senha acionado");
    if (this.inscricaoForm.controls.confirmarSenha.value != this.inscricaoForm.controls.senha.value) {
      this.senhaConfirmada = false;
    } else this.senhaConfirmada = true;
  }


  novoUsuario() {

    if (!this.validaForm()) return;

    let areaDeInteresseFormatada: string
    console.log(this.inscricaoForm.controls.areaDeInteresse.value);
    this.areaDeInteresse = this.inscricaoForm.controls.areaDeInteresse.value;
    for (let i = 0; i < this.areaDeInteresse.length; i++) {
      if (i == 0) {
        areaDeInteresseFormatada = this.areaDeInteresse[i];
      } else {
        areaDeInteresseFormatada = areaDeInteresseFormatada + ", " + this.areaDeInteresse[i];
      }
    }

    console.log(areaDeInteresseFormatada);
    let usuario: Usuario = {
      nome: this.firstLetterUCase(this.inscricaoForm.controls.nome.value.toLocaleLowerCase()),
      sobrenome: this.firstLetterUCase(this.inscricaoForm.controls.sobrenome.value.toLocaleLowerCase()),
      nomeUsuario: this.inscricaoForm.controls.nomeUsuario.value,
      email: this.inscricaoForm.controls.email.value,
      senha: this.inscricaoForm.controls.senha.value,
      numeroTelefone: this.inscricaoForm.controls.numeroTelefone.value,
      cargo: this.inscricaoForm.controls.cargo.value,
      empresa: this.inscricaoForm.controls.empresa.value,
      estado: this.inscricaoForm.controls.estado.value,
      pais: this.inscricaoForm.controls.pais.value,
      areaDeInteresse: areaDeInteresseFormatada,
    }
    this.apiUsuarios.criaUsuario(usuario, () => {
      //callback de sucesso
      this.presentToast();
      this.navCtrl.pop();
      this.navCtrl.push(LoginPage, {
        credencial: this.inscricaoForm.controls.nomeUsuario.value,
        senha: this.inscricaoForm.controls.senha.value,
      });


    }, (erro: string) => {
      //callback de erro
      this.existeErroServidor = true;
      this.mensagemErro = erro;


    });
    console.log('funcao funcionando');
  }

  validaForm() {
    if (!this.inscricaoForm.valid) {
      this.tentouEnviar = true;
      return false;
    } else return true;
  }

  presentToast() {
    let realizaInscricaoToast = this.toastCtrl.create({

      message: "Inscrição realizada com sucesso!",
      duration: 3000,
      position: 'top'
    });

    realizaInscricaoToast.present()
  }

  firstLetterUCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
