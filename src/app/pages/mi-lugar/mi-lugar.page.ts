import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProfesorService } from '../../services/profesor.service';
import { Usuario } from '../../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-mi-lugar',
  templateUrl: './mi-lugar.page.html',
  styleUrls: ['./mi-lugar.page.scss'],
})
export class MiLugarPage implements OnInit {
  usuario: Usuario
  constructor( private navCtrl:NavController, private profesorService: ProfesorService, private usuarioService:UsuarioService) { }

  ngOnInit() {
    this.profesorService.removeProfesorIdActual();
    this.usuario = this.usuarioService.getUsuario();
  }

  goToEjercicios(){
    this.navCtrl.navigateRoot( 'main/tabs/grupo-ejercicios', { animated:true})
  }

  goToGrupos(){
    this.navCtrl.navigateRoot( 'main/tabs/grupos', { animated:true})
  }

  goToPlanificaciones(){
    this.navCtrl.navigateRoot( 'main/tabs/planificaciones', { animated:true})
  }

  goToAlumnos(){
    this.navCtrl.navigateRoot( 'main/tabs/alumnos', { animated:true})
  }

  goToCalendario(){
    this.navCtrl.navigateRoot( 'main/tabs/calendario', { animated:true})
  }

  goToClases(){
    this.navCtrl.navigateRoot( 'main/tabs/clases', { animated:true})
  }
  goToProfesores(){
    this.navCtrl.navigateRoot( 'main/tabs/profesores', { animated:true})
  }

}
