import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController, AlertController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Usuario } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slideLogin') slides: IonSlides;

  loginUser = {
    email:'',
    password: ''
  };

  registroUser = {
    nombre: '',
    apellidos: '',
    email: '',
    email2:'',
    password:'',
    password2:'',
    telefono:'',
    tipo:1,
    
  };

  constructor( private usuarioService: UsuarioService,
               private navCtrl:NavController,
               private uiService:UiServiceService,
               private alertController:AlertController) { }

  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }

  ngOnInit() {
    
  }

  async cambiaPass(){
    const alert = await this.alertController.create({
      message:"Introduce tu correo electrónico. Si hay un usuario ya creado asociado a él, recibirás una nueva contraseña en tu email",
      inputs: [
          {
              name: 'email',
              type: 'email',
              placeholder: 'Escribe tu email'
          },
          {
            name: 'email2',
            type: 'email',
            placeholder: 'Escribe tu email de nuevo'
        }
      ],
      buttons: [
          {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                 
              }
          }, 
          {
              text: 'Generar contraseña',
              handler: async (alertData) => {
                if (alertData.email === alertData.email2){
                  const nuevaPass = await this.usuarioService.cambiaPassword(alertData.email)
                  if (nuevaPass){
                    this.uiService.alertaInformativa('Email enviado')
                  }
                } else {
                  this.uiService.alertaInformativa('Las contraseñas no coinciden')

                }
                
              }
          }
      ]
  });
  await alert.present();
  }


  async login( fLogin: NgForm ){
    if (fLogin.invalid){
      return;
    }

    const existeUsuario= await this.usuarioService.login( this.loginUser.email, this.loginUser.password);

    if (existeUsuario){
      await this.usuarioService.validaToken();
      let usuario:Usuario = this.usuarioService.getUsuario();
  
      if(usuario.tipo === 0){
        this.navCtrl.navigateRoot( 'tipo-usuario', { animated:true});
      }else {
      this.navCtrl.navigateRoot( 'main/tabs/home', { animated:true});
      }
    } else {
      this.uiService.alertaInformativa('Usuario y/o contraseña incorrectos')
    }
  }

  async registro( fRegistro: NgForm ){
    if (fRegistro.invalid){
      return;
    }

    if (this.registroUser.email2 != this.registroUser.email){
      this.uiService.alertaInformativa('Los emails no coinciden');
      return;
    }

    if (this.registroUser.password2 != this.registroUser.password){
      this.uiService.alertaInformativa('Las contraseñas no coinciden');
      return;
    }

    const usuarioCreado = await this.usuarioService.registro(this.registroUser);

    if (usuarioCreado){
      //this.navCtrl.navigateRoot( 'main/tabs/tab1', { animated:true});
      this.navCtrl.navigateRoot( '/tipo-usuario', { animated:true});
    } else {
      this.uiService.alertaInformativa('Error al crear el usuario')
    }
  }

  mostrarRegistro(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

}
