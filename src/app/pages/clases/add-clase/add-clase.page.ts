import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { ClaseService } from 'src/app/services/clase.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Clase, Grupo, Usuario } from 'src/interfaces/interfaces';
import { Planificacion, Semana, Alumno, NivelPlanificacionExplora, SemanaExplora } from '../../../../interfaces/interfaces';
import { PlanificacionesService } from '../../../services/planificaciones.service';
import { SemanaService } from '../../../services/semana.service';
import { ProfesorService } from '../../../services/profesor.service';
import { GrupoService } from '../../../services/grupo.service';
import { NivelPlanificacionExploraService } from '../../../services/nivel-planificacion-explora.service';
import { SemanaExploraService } from '../../../services/semana-explora.service';

@Component({
  selector: 'app-add-clase',
  templateUrl: './add-clase.page.html',
  styleUrls: ['./add-clase.page.scss'],
})
export class AddClasePage implements OnInit {


  nombre: string = "";
  apellidos: string = "";
  email: string = "";
  telefono: string = "";
  fecha: any;
  fechaInicio: string;
  fechaFin: string;
  horaInicio: string;
  horaFin: string;
  usuario: Usuario = {};
  grupos: Grupo[] = [];
  grupoId: string = '0';
  alumnoId: string = '0';
  alumnos: Alumno[] = [];
  nivel: string = "0"
  observaciones: string;
  tipoPlanificacion:string="";
  planificaciones: Planificacion[] 
  nivelesPlanificacionExplora: NivelPlanificacionExplora[]
  nivelPlanificacionExplora: NivelPlanificacionExplora
  planificacion: Planificacion 
  semanas: Semana[]
  semanasExplora: SemanaExplora[]
  semanaId: string = '0';
  semana: Semana;
  semanaExplora: SemanaExplora;
  muestraSemanas: boolean = false;
  tipoClase = "";
  cantidadClases = "";
  muestraGrupos: boolean = false;
  muestraAlumnos: boolean = false;
  diasSemanaClase = [];
  muestraPlanificacionesPropias=false;
  muestraSemanasExplora=false;

  constructor(private modalController: ModalController,
    private usuarioService: UsuarioService,
    private claseService: ClaseService,
    private uiService: UiServiceService,
    private planificacionService: PlanificacionesService,
    private nivelExploraService: NivelPlanificacionExploraService,
    private profesorService: ProfesorService,
    private grupoService: GrupoService,
    private semanaService: SemanaService,
    private semanaExploraService: SemanaExploraService) { }

  async ngOnInit() {
    this.planificaciones = [];
    this.tipoPlanificacion="";
    this.tipoClase="";
    this.cantidadClases="";
    this.muestraPlanificacionesPropias=false;
    this.muestraSemanasExplora=false;
    this.usuario = this.usuarioService.getUsuario();
    this.getDatosPlanificaciones();
  }


  async ionViewDidEnter() {
    this.ngOnInit()
  }

  async cerrar() {
    this.modalController.dismiss();

  }

  segmentChanged(event) {
    this.tipoClase = event.detail.value
    if (this.tipoClase === 'alumno') {
      this.getAlumnos()
    } else if (this.tipoClase === 'grupo') {
      this.getGrupos()
    }
  }

  segmentCantidadClases(event) {
    this.cantidadClases = event.detail.value

    if (this.cantidadClases === 'unica') {
     // this.getAlumnos()
    } else if (this.cantidadClases === 'multiple') {
    //  this.getGrupos()
    }
  }

  segmentChangedPlanificacion(event) {
    this.muestraSemanas=false,
    this.muestraSemanasExplora=false;
    this.tipoPlanificacion = event.detail.value
    if (this.tipoPlanificacion === 'propia'){
      this.getDatosPlanificaciones()
    } else if (this.tipoPlanificacion === 'aulapadel'){
      this.getDatosNivelesExplora()
    }
    
  }

  async getAlumnos() {
    this.muestraGrupos = false;
    this.grupoId = "0";
    await this.profesorService.getAlumnosProfesor(this.usuario.id).then((alumnos: Alumno[]) => {
      this.alumnos = alumnos
    });
    this.muestraAlumnos = true;
  }

  async getGrupos() {
    this.muestraAlumnos = false;
    this.alumnoId = "0";
    await this.grupoService.getGruposProfesor(this.usuario.id).then((grupos: Grupo[]) => {
      this.grupos = grupos
    })
    this.muestraGrupos = true
  }

  async getDatosPlanificaciones() {

    await this.planificacionService.getPlanificacionesUsuario(this.usuario.id).then((planificaciones: Planificacion[]) => {
      this.planificaciones = planificaciones
    })
    let profeClub:any = await this.profesorService.getClubProfesor(this.usuario.id)
    if (profeClub !== null){
      await this.planificacionService.getPlanificacionesUsuario(profeClub.clubId).then((planificaciones:Planificacion[])=>{
        for (let planificacion of planificaciones){
        this.planificaciones.push(planificacion)
        }
      })
    }
  }

  async getDatosNivelesExplora(){
    await this.nivelExploraService.getNiveles().then((niveles:NivelPlanificacionExplora[])=>{
      this.nivelesPlanificacionExplora = niveles
      this.nivelesPlanificacionExplora.forEach(nivel => {
        if (nivel.categoriaId === '1'){
          nivel.titulo = "Menores-"+nivel.titulo
        } else {
          nivel.titulo = "Adultos-"+nivel.titulo
        }
        
      });
    })
  }


  async getSemanasPlanificacion(event) {
    await this.semanaService.getSemanasPlanificacion(event.detail.value, this.usuario.id).then((semanas: Semana[]) => {
      this.semanas = semanas
    })
    this.muestraSemanas = true
  }

  
  async getSemanasPlanificacionExplora(event) {
    await this.semanaExploraService.getSemanasPlanificacion(event.detail.value).then((semanas: SemanaExplora[]) => {
      this.semanasExplora = semanas
    })
    this.muestraSemanasExplora = true
  }

  async getSemanaSeleccionada(event) {
    this.semanaId = event.detail.value
    console.log(this.semanaId)
  }

  sleep(ms = 0) {
    return new Promise((r) => setTimeout(r, ms));
  }
  async guardarClase() {
    if (this.tipoClase === "") {
      this.uiService.alertaInformativa('Selecciona el tipo de clase');
    } else {
      if (this.tipoPlanificacion==="propia"){
      await this.semanaService.getSemana(this.semanaId).then((semana: Semana) => {
        this.semana = semana
      })
    } else{
      await this.semanaExploraService.getSemana(this.semanaId).then((semana:SemanaExplora)=>{
        this.semanaExplora = semana
      })
    }

      if (this.cantidadClases === 'unica') {
        this.creaClaseUnica()
      } else if (this.cantidadClases === 'multiple') {
        this.creaClaseMultiple()
      } else {
        this.uiService.alertaInformativa('Selecciona el tipo de clase');
      }

    }
  }

  async creaClaseMultiple() {
    let fI = moment(this.fechaInicio).format('DD-MM-YYYY');
    let fF = moment(this.fechaFin).format('DD-MM-YYYY');
    let clase:Clase;
    if(this.semana === undefined && this.nivelPlanificacionExplora === undefined){
       clase = {

        fecha: moment(this.fecha).format('DD-MM-YYYY'),
        profesorId: this.usuario.id,
        observaciones: this.observaciones,
        horaInicio: moment(this.horaInicio).format('HH:mm'),
        horaFin: moment(this.horaFin).format('HH:mm'),
        tipoPlanificacion:'',
        planificacionId: '0',
        trimestreId: '0',
        semanaId: '0',
        grupoId: this.grupoId,
        alumnoId: this.alumnoId,
        conjuntoClases:true
      }
    } else {
      if (this.tipoPlanificacion==='propia'){
        clase = {

          fecha: moment(this.fecha).format('DD-MM-YYYY'),
          profesorId: this.usuario.id,
          observaciones: this.observaciones,
          horaInicio: moment(this.horaInicio).format('HH:mm'),
          horaFin: moment(this.horaFin).format('HH:mm'),
          tipoPlanificacion:this.tipoPlanificacion,
          planificacionId: this.semana.planificacionId,
          trimestreId: this.semana.trimestreId,
          semanaId: this.semana.id,
          grupoId: this.grupoId,
          alumnoId: this.alumnoId,
          conjuntoClases:true
        }
      } else if (this.tipoPlanificacion==='aulapadel'){
        clase = {
     
          fecha: moment(this.fecha).format('DD-MM-YYYY'),
          profesorId: this.usuario.id,
          observaciones: this.observaciones,
          horaInicio: moment(this.horaInicio).format('HH:mm'),
          horaFin: moment(this.horaFin).format('HH:mm'),
          tipoPlanificacion:this.tipoPlanificacion,
          planificacionId: this.semanaExplora.nivelId+"",
          trimestreId: this.semanaExplora.trimestreId+"",
          semanaId: this.semanaExplora.id,
          grupoId: this.grupoId,
          alumnoId: this.alumnoId,
          conjuntoClases:true
        }
      }
   
  }

    let diasSemana = ""
    this.diasSemanaClase.forEach(dia => {
      diasSemana = diasSemana + "," + dia

    });
    const claseCreada = await this.claseService.postClaseMultiple(clase, fI, fF, diasSemana.slice(1));
    if (claseCreada) {
      this.uiService.alertaInformativa('Las clases han sido creadas');
      this.cerrar()
      await this.sleep(1000);
    //  window.location.reload();
    } else {
      this.uiService.alertaInformativa('Error al crear las clases')
      this.cerrar()

    }
  }

  async creaClaseUnica() {
    console.log(this.semana)
    console.log(this.nivelPlanificacionExplora)
  let clase:Clase
    if(this.semana === undefined && this.nivelPlanificacionExplora === undefined){
      
       clase = {
        nivel: +this.nivel,
        fecha: moment(this.fecha).format('DD-MM-YYYY'),
        profesorId: this.usuario.id,
        observaciones: this.observaciones,
        horaInicio: moment(this.horaInicio).format('HH:mm'),
        horaFin: moment(this.horaFin).format('HH:mm'),
        planificacionId: '0',
        trimestreId: '0',
        semanaId: '0',
        grupoId: this.grupoId,
        alumnoId: this.alumnoId,
        conjuntoClases:false
      }
    } else {
      if (this.tipoPlanificacion==='propia'){
        clase = {

          fecha: moment(this.fecha).format('DD-MM-YYYY'),
          profesorId: this.usuario.id,
          observaciones: this.observaciones,
          horaInicio: moment(this.horaInicio).format('HH:mm'),
          horaFin: moment(this.horaFin).format('HH:mm'),
          tipoPlanificacion:this.tipoPlanificacion,
          planificacionId: this.semana.planificacionId,
          trimestreId: this.semana.trimestreId,
          semanaId: this.semana.id,
          grupoId: this.grupoId,
          alumnoId: this.alumnoId,
          conjuntoClases:false
        }
      } else if (this.tipoPlanificacion==='aulapadel'){
        clase = {
     
          fecha: moment(this.fecha).format('DD-MM-YYYY'),
          profesorId: this.usuario.id,
          observaciones: this.observaciones,
          horaInicio: moment(this.horaInicio).format('HH:mm'),
          horaFin: moment(this.horaFin).format('HH:mm'),
          tipoPlanificacion:this.tipoPlanificacion,
          planificacionId: this.semanaExplora.nivelId+"",
          trimestreId: this.semanaExplora.trimestreId+"",
          semanaId: this.semanaExplora.id,
          grupoId: this.grupoId,
          alumnoId: this.alumnoId,
          conjuntoClases:false
        }
      }
   
  }

    const claseCreada = await this.claseService.postClase(clase);
    if (claseCreada) {
      this.uiService.alertaInformativa('La clase ha sido creada');
      this.cerrar()
      await this.sleep(1000);
      window.location.reload();
    } else {
      this.uiService.alertaInformativa('Error al crear la clase')
      this.cerrar()

    }
    
  }


}
