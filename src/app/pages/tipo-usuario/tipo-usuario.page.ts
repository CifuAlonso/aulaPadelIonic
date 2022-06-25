import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProfesorService } from 'src/app/services/profesor.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Profesor, Usuario } from 'src/interfaces/interfaces';
import { AlumnoUsuario } from '../../../interfaces/interfaces';
import { AlumnoUsuarioService } from '../../services/alumno-usuario.service';

@Component({
  selector: 'app-tipo-usuario',
  templateUrl: './tipo-usuario.page.html',
  styleUrls: ['./tipo-usuario.page.scss'],
})
export class TipoUsuarioPage implements OnInit {

  usuario: Usuario={};
  
  constructor(private usuarioService:UsuarioService,
    private profesorService:ProfesorService,
    private alumnoUsuarioService:AlumnoUsuarioService, 
    private navCtrl:NavController) { }

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
    console.log(this.usuario)    
  }

  async actualizaUsuarioProfesor(){

    let profesor: Profesor={
      usuarioId:this.usuario.id,
      clubId:"0",
      activo:1
      }
      const profesorCreado = await this.profesorService.postProfesor(profesor);
      this.usuario.tipo=2;
      const usuarioActualizado = await this.usuarioService.actualizaUsuario(this.usuario);
      this.navCtrl.navigateRoot( 'main/tabs/home', { animated:true});
     
  }

  async actualizaUsuarioAlumno(){

    let alumno: AlumnoUsuario={
      usuarioId:this.usuario.id,
      profesorId:"0",
      nacimiento:"",
      activo:1
    }
    const alumnoCreado = await this.alumnoUsuarioService.postAlumnoUsuario(alumno);
    this.usuario.tipo=1;
    const usuarioActualizado = await this.usuarioService.actualizaUsuario(this.usuario);
    this.navCtrl.navigateRoot( 'main/tabs/home', { animated:true});
    
  }

 async actualizaUsuarioClub(){
    this.usuario.tipo=3;
    const usuarioActualizado = await this.usuarioService.actualizaUsuario(this.usuario);
    this.navCtrl.navigateRoot( 'main/tabs/home', { animated:true});
  }

}
