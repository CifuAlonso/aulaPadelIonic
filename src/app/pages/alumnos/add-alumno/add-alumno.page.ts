import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Alumno, Usuario } from '../../../../interfaces/interfaces';
import * as moment from 'moment';
import { UsuarioService } from '../../../services/usuario.service';
import { AlumnoService } from '../../../services/alumno.service';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-add-alumno',
  templateUrl: './add-alumno.page.html',
  styleUrls: ['./add-alumno.page.scss'],
})
export class AddAlumnoPage implements OnInit {

  nombre: string = "";
  apellidos: string = "";
  email: string = "";
  telefono: string = "";
  fecha: any;
  usuario: Usuario = {};
  nivel: string = "0"
  observaciones:string;

  constructor(private modalController: ModalController,
    private usuarioService: UsuarioService,
    private alumnoService: AlumnoService,
    private uiService: UiServiceService) { }

  async ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
  }


  async ionViewDidEnter() {
    this.usuario = this.usuarioService.getUsuario();
  }

  async  cerrar() {
    this.modalController.dismiss();

  }

  sleep(ms = 0) {
    return new Promise((r) => setTimeout(r, ms));
  }
  async guardarAlumno() {
    let alumno: Alumno={
    nombre: this.nombre,
    apellidos: this.apellidos,
    email: this.email,
    telefono: this.telefono,
    nivel: this.nivel,
    nacimiento: moment(this.fecha).format('DD-MM-YYYY'),
    profesorId: this.usuario.id,
    observaciones: this.observaciones
    }

    const alumnoCreado = await this.alumnoService.postAlumnoProfesor(alumno);
    if (alumnoCreado){
      this.uiService.alertaInformativa('El alumno ha sido creado');
      this.cerrar()
      await this.sleep(1000);
      window.location.reload();
    } else {
      this.uiService.alertaInformativa('Error al crear el alumno')
      this.cerrar()
    }
  }

}
