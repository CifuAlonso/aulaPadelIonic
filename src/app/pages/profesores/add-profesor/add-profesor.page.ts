import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ProfesorService } from '../../../services/profesor.service';
import { Profesor, Usuario } from '../../../../interfaces/interfaces';
import localeEs from '@angular/common/locales/en';

@Component({
  selector: 'app-add-profesor',
  templateUrl: './add-profesor.page.html',
  styleUrls: ['./add-profesor.page.scss'],
})
export class AddProfesorPage implements OnInit {
  registroUser = {
    nombre: '',
    apellidos: '',
    email: '',
    email2:'',
    password:'',
    password2:'',
    telefono:'',
    tipo:2,
    
  };
  usuario:Usuario
  constructor(private modalController: ModalController, private profesorService: ProfesorService,
    private uiService:UiServiceService,private usuarioService: UsuarioService) { }

  ngOnInit() {
    console.log(this.usuario)
  }

  async  cerrar() {
    this.modalController.dismiss();

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

    let profesores: any = await this.profesorService.getProfesoresClub(this.usuario.id)
    if (profesores.length > 4){
      this.uiService.alertaInformativa('No puedes crear más profesores con tu perfil')
      this.cerrar()
    }else {
      const usuarioCreado:any = await this.usuarioService.registroProfe(this.registroUser);
  
      if (usuarioCreado){
      let profe: Profesor = {
        usuarioId: usuarioCreado.usuario.id,
        clubId: this.usuario.id,
        activo: 1
      }
      const profeCreado = await this.profesorService.postProfesor(profe)
      if (profeCreado){
        this.uiService.alertaInformativa('Profesor creado')
        this.cerrar()
       }
       else {
        this.uiService.alertaInformativa('Error al crear al profesor')
  
       } 
      } else {
        this.uiService.alertaInformativa('Error al crear al profesor')
      }
    }
  
  }

}
