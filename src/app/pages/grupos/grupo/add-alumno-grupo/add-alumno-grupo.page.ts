import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Alumno, GrupoAlumnos, Usuario, Grupo } from '../../../../../interfaces/interfaces';
import { GrupoAlumnoService } from '../../../../services/grupo-alumno.service';
import { AlumnoService } from '../../../../services/alumno.service';
import { GrupoService } from '../../../../services/grupo.service';

@Component({
  selector: 'app-add-alumno-grupo',
  templateUrl: './add-alumno-grupo.page.html',
  styleUrls: ['./add-alumno-grupo.page.scss'],
})
export class AddAlumnoGrupoPage implements OnInit {

  seccion: string
  alumnosGrupo: GrupoAlumnos[] = []
  alumnosTotales: Alumno[] = []
  alumnosNoGrupo: Alumno[] = []
  listaAlumnos: Alumno[] = []
  nombre: string = "";
  descripcion: string = "";
  usuario: Usuario = {};
  grupo: Grupo;
  planificacionId: string;
  trimestreId: string;
  grupoId: string;
  actualizaSemana: boolean = false;
  terminoBusqueda: string = '';
  cargando:boolean = false;

  constructor(private modalController: ModalController,
    private grupoAlumnoService: GrupoAlumnoService,
    private alumnoService: AlumnoService,
    private grupoService: GrupoService,
    private uiService: UiServiceService,
    private usuarioService: UsuarioService) { }


  async ngOnInit() {
    this.cargando=true;
    this.usuario = this.usuarioService.getUsuario();
    this.grupoId = await this.grupoService.getGrupoIdActual();
    await this.grupoAlumnoService.getGrupoAlumno(this.grupoId).then((grupoAlumno: GrupoAlumnos[]) => {
      this.alumnosGrupo =grupoAlumno;
    })
    await this.alumnoService.getAlumnosProfesor(this.usuario.id).then((alumnos: Alumno[]) => {
      this.alumnosTotales = alumnos
    })
    this.alumnosTotales.forEach(async(alumno) => {
      let encontrado = this.alumnosGrupo.find(alum => alum.alumnoId == alumno.id)
      if (!encontrado) {
        await this.alumnoService.getAvatar(alumno.profesorId, alumno.avatar).then(async (avatarBlob: Blob) => {

          await this.createImageFromBlob(alumno, avatarBlob)

        })
        this.alumnosNoGrupo.push(alumno)
      }

    });
    await this.sleep(1000)
    this.cargando=false;
  }

  async createImageFromBlob(alumno, image: Blob) {
    let FileReader: new () => FileReader = ((window as any).FileReader as any).__zone_symbol__OriginalDelegate;
    let reader = new FileReader();

    reader.onload = () => {
      alumno.foto = reader.result;
    };
    if (image) {
      reader.readAsDataURL(image);
    }
  }
  sleep(ms = 0) {
    return new Promise((r) => setTimeout(r, ms));
  }

  async ionViewDidEnter() {
    //  this.ngOnInit();
  }

  cerrar() {
    this.modalController.dismiss();
  }

  /*
  searchChanged(event){
    this.alumnos = this.alumnosTotales.filter(item => event.detail.value === '' || item.nivel === +event.detail.value);
    
  }
*/


  addAlumnoLista(alumno: Alumno) {
    let index = this.listaAlumnos.indexOf(alumno)
    if (index === -1) {
      this.listaAlumnos.push(alumno);
    } else {
      this.listaAlumnos.splice(index, 1)
    }
  }

  async addAlumnosGrupo() {
    let index = 0
    let indexLista = this.listaAlumnos.length
    console.log(indexLista)
    this.listaAlumnos.forEach(async alumno => {
      // ejercicio.grupoEjerciciosId = this.idGrupo;
      let grupoAlumno: GrupoAlumnos = {
        usuarioId: this.usuario.id,
        alumnoId: alumno.id,
        grupoId: this.grupoId
      }
      index++;
      console.log(index)

      const grupoAlumnoCreado = await this.grupoAlumnoService.postGrupoAlumno(grupoAlumno);

    });

    if (index===indexLista) {
      this.uiService.alertaInformativa('Se han añadido los alumnos');
      this.cerrar()
    } 

  }

}
