import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlumnoService } from 'src/app/services/alumno.service';
import { GrupoAlumnoService } from 'src/app/services/grupo-alumno.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Alumno, Grupo, GrupoAlumnos, Usuario } from 'src/interfaces/interfaces';
import { ClaseService } from '../../../../services/clase.service';
import { Clase } from '../../../../../interfaces/interfaces';

@Component({
  selector: 'app-add-alumno-clase',
  templateUrl: './add-alumno-clase.page.html',
  styleUrls: ['./add-alumno-clase.page.scss'],
})
export class AddAlumnoClasePage implements OnInit {

  seccion: string
  alumnosGrupo: GrupoAlumnos[] = []
  alumnosTotales: Alumno[] = []
  alumnosNoGrupo: Alumno[] = []
  listaAlumnos: Alumno[] = []
  nombre: string = "";
  descripcion: string = "";
  usuario: Usuario = {};
  grupo: Grupo;
  clase:Clase;
  claseId:string;
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
    private claseService: ClaseService,
    private uiService: UiServiceService,
    private usuarioService: UsuarioService) { }


  async ngOnInit() {
    
  }

  async ionViewDidEnter() {
    this.getDatos();
  }

  async getDatos(){
    this.cargando=true;
    this.usuario = this.usuarioService.getUsuario();
    this.grupoId = await this.grupoService.getGrupoIdActual();
    await this.claseService.getClaseIdActual().then(claseId=>{
      this.claseId=claseId
    })
    await this.claseService.getClase(this.claseId).then((clase:Clase)=>{
      this.clase=clase
    })
    console.log(this.clase)
    if (this.clase.alumnosId === '0'){
      await this.grupoAlumnoService.getGrupoAlumno(this.grupoId).then((grupoAlumno: GrupoAlumnos[]) => {
        this.alumnosGrupo =grupoAlumno;
      })
      await this.alumnoService.getAlumnosProfesor(this.usuario.id).then((alumnos: Alumno[]) => {
        this.alumnosTotales = alumnos
      })
      this.alumnosTotales.forEach(alumno => {
        let encontrado = this.alumnosGrupo.find(alum => alum.alumnoId == alumno.id)
        if (!encontrado) {
          this.alumnosNoGrupo.push(alumno)
        }
  
      });

    } else {
      
      let idAlumnosGrupo = this.clase.alumnosId.split(",");
      console.log(idAlumnosGrupo);
      await this.alumnoService.getAlumnosProfesor(this.usuario.id).then((alumnos: Alumno[]) => {
        this.alumnosTotales = alumnos
      })
      this.alumnosTotales.forEach(alumno => {
        let encontrado = idAlumnosGrupo.find(alum => alum == alumno.id)
        if (!encontrado) {
          this.alumnosNoGrupo.push(alumno)
        }
  
      });
    }
  
   
    this.cargando=false;
  }

  cerrar() {
    this.modalController.dismiss();
    window.location.reload();
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

    console.log(this.listaAlumnos)
    console.log(this.alumnosGrupo);
    let alumnosId="";
    if (this.clase.alumnosId === '0'){
      for (let alumno of this.alumnosGrupo){
        alumnosId = alumnosId+","+alumno.alumnoId
      }
      alumnosId = alumnosId.slice(1)

      for (let alumno of this.listaAlumnos){
        alumnosId = alumnosId+","+alumno.id
      }
      this.clase.alumnosId = alumnosId
    } else {
      for (let alumno of this.listaAlumnos){
        this.clase.alumnosId = this.clase.alumnosId+","+alumno.id
      }
    }
  

    const claseModificada = await this.claseService.putClase(this.clase);
    if (claseModificada){
      this.uiService.alertaInformativa('Se han añadido los alumnos a la clase');
      await this.sleep(1000)
      this.cerrar()
    
    } else {
      this.uiService.alertaInformativa('Error al actualizar')
      
    }


  }

  
 sleep(ms = 0) {
  return new Promise((r) => setTimeout(r, ms));
}
}
