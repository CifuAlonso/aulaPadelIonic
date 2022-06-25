import { Component, OnInit } from '@angular/core';
import { Clase, NivelPlanificacionExplora, Planificacion, Semana, SemanaExplora, Usuario } from '../../../../../interfaces/interfaces';
import { ClaseService } from '../../../../services/clase.service';
import { NavController, AlertController } from '@ionic/angular';
import { PlanificacionesService } from 'src/app/services/planificaciones.service';
import { NivelPlanificacionExploraService } from 'src/app/services/nivel-planificacion-explora.service';
import { SemanaService } from 'src/app/services/semana.service';
import { SemanaExploraService } from 'src/app/services/semana-explora.service';
import * as moment from 'moment';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-edita-clase',
  templateUrl: './edita-clase.page.html',
  styleUrls: ['./edita-clase.page.scss'],
})
export class EditaClasePage implements OnInit {

  cargando:boolean;
  claseId:string;
  clase:Clase;
  fecha:any;
  horaInicio: string;
  horaFin: string;
  observaciones:string;
  semanaId:string;
  puntuacion:number;
  tipoPlanificacion:string;
  muestraSemanas:boolean;
  muestraSemanasExplora:boolean;
  planificaciones: Planificacion[] 
  planificacionIdActual:number;
  nivelesPlanificacionExplora: NivelPlanificacionExplora[]
  nivelPlanificacionExplora: NivelPlanificacionExplora
  planificacion: Planificacion 
  planificacionId:string;
  semanas: Semana[]
  semanasExplora: SemanaExplora[]
  semana: Semana;
  semanaExplora: SemanaExplora;
  perteneceConjunto: boolean=false;
  usuario:Usuario

  constructor( private claseService:ClaseService,
    private navCtrl:NavController,
    private planificacionService: PlanificacionesService,
    private nivelExploraService: NivelPlanificacionExploraService,
    private semanaService: SemanaService,
    private semanaExploraService: SemanaExploraService,
    private uiService: UiServiceService,
    private alertController: AlertController,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  async ionViewDidEnter(){
    this.cargando=true;
    this.perteneceConjunto=false;
    this.usuario = this.usuarioService.getUsuario();
    await this.claseService.getClaseIdActual().then(claseId=>{
      this.claseId = claseId
    })
    await this.claseService.getClase(this.claseId).then(async (clase:Clase)=>{
      this.clase = clase
      if (this.clase.conjuntoClases){
        this.perteneceConjunto=true;
      }
      this.fecha = moment(this.clase.fecha,'DD-MM-YYYY').toString()
      this.horaInicio = this.clase.horaInicio;
      this.horaFin = this.clase.horaFin
      this.observaciones = this.clase.observaciones
      this.tipoPlanificacion = this.clase.tipoPlanificacion
      if (this.tipoPlanificacion === 'propia'){
        await this.getDatosPlanificaciones()
      } else if (this.tipoPlanificacion === 'aulapadel'){
       await  this.getDatosNivelesExplora()
      }
      
    });
    this.cargando=false;
    
 }

 cerrar(){
  this.navCtrl.navigateRoot( 'main/tabs/clase', { animated:true})
}

segmentChangedPlanificacion(event) {
  this.muestraSemanas=false,
  this.muestraSemanasExplora=false;
  this.tipoPlanificacion = event.detail.value
  if (this.tipoPlanificacion === 'propia'){
    this.nivelesPlanificacionExplora = undefined;
    this.semanaExplora = undefined
    this.getDatosPlanificaciones()
  } else if (this.tipoPlanificacion === 'aulapadel'){
    this.planificacion = undefined;
    this.semana = undefined
    this.getDatosNivelesExplora()
  }
  
}


async getDatosPlanificaciones() {
this.muestraSemanas = false;
  await this.planificacionService.getPlanificacionesUsuario(this.clase.profesorId).then((planificaciones: Planificacion[]) => {
    this.planificaciones = planificaciones
  })
  this.planificaciones.forEach(planificacion => { 
    if(planificacion.id===this.clase.planificacionId){
      this.planificacion = planificacion
   
    }
    
  });
  await this.getSemanasPlanificacion()

}

async getDatosNivelesExplora(){
  this.muestraSemanas = false;

  await this.nivelExploraService.getNiveles().then((niveles:NivelPlanificacionExplora[])=>{
    this.nivelesPlanificacionExplora = niveles
    this.nivelesPlanificacionExplora.forEach(nivel => {
      if (nivel.categoriaId === '1'){
        nivel.titulo = "Menores-"+nivel.titulo
      } else {
        nivel.titulo = "Adultos-"+nivel.titulo
      }
      if (nivel.id === this.clase.planificacionId){
        this.nivelPlanificacionExplora = nivel
      }
      
    });
  })

  await this.getSemanasPlanificacionExplora()

}

async retrasaClases(){
  const fechaRetrasada = moment(this.fecha).add(7,'days').format('DD-MM-YYYY')
  const alert = await this.alertController.create({
  
    header: 'Retrasar clase',
    message: '¿Estás seguro? Esta clase pertenece a un conjunto de clases ya programadas. Al retrasarla al '+fechaRetrasada+', todas las futuras clases serán retrasadas también',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
   
        handler: (blah) => {
         
        }
      }, {
        text: 'Sí, estoy seguro',
        handler: async () => {
          const claseActualizada = await this.claseService.retrasaClases(this.clase,this.usuario.id);
          if (claseActualizada){
            this.uiService.alertaInformativa('Se han retrasado las clases');
            this.cerrar()
          }
        }
      }
    ]
  });

  await alert.present();
}


async getSemanasPlanificacion(event?:any) {
  let id:string;
  
  if (event != undefined){
    id = event.detail.value.id
  } else {
    id = this.planificacion.id
  }

  await this.semanaService.getSemanasPlanificacion(id, this.clase.profesorId).then((semanas: Semana[]) => {
    this.semanas = semanas
  })
  this.semanas.forEach(semana => {
    if (semana.id === this.clase.semanaId){
      this.semana= semana
    }
    
  });
  this.muestraSemanas = true
}


async getSemanasPlanificacionExplora(event?:any) {
  let id:string;

  if (event != undefined){
    id = event.detail.value.id
  } else {
    id = this.nivelPlanificacionExplora.id
  }

  await this.semanaExploraService.getSemanasPlanificacion(id).then((semanas: SemanaExplora[]) => {
    this.semanasExplora = semanas
  })

  this.semanasExplora.forEach(semana => {
    if (semana.id === this.clase.semanaId){
      this.semanaExplora= semana
    }
  });
  this.muestraSemanasExplora = true
}

async getSemanaSeleccionada(event) {
  console.log(event.detail.value.id)
  if (this.tipoPlanificacion === 'propia'){
    this.semanas.forEach(semana => {
      if (semana.id === event.detail.value.id){
        this.semana= semana
      }
    })
  } else if (this.tipoPlanificacion === 'aulapadel'){
    this.semanasExplora.forEach(semana => {
      if (semana.id === event.detail.value.id){
        this.semanaExplora= semana
      }
    })
  }

}


async actualizarClase(){
  this.clase.horaInicio =  this.horaInicio;
  this.clase.horaFin = this.horaFin
  this.clase.fecha = moment(this.fecha).format('DD-MM-YYYY'),
  this.clase.observaciones = this.observaciones;
  this.clase.tipoPlanificacion = this.tipoPlanificacion
  if (this.tipoPlanificacion === 'propia'){
    this.clase.planificacionId = this.planificacion.id
    if (this.semana != undefined){
      this.clase.semanaId = this.semana.id
      this.clase.trimestreId = this.semana.trimestreId
    }

  } else if (this.tipoPlanificacion === 'aulapadel'){
    if (this.semanaExplora != undefined){
      this.clase.planificacionId = this.semanaExplora.nivelId+""
    this.clase.semanaId = this.semanaExplora.id
    this.clase.trimestreId = this.semanaExplora.trimestreId+""
    }
  } else {
    this.clase.planificacionId="0"
    this.clase.semanaId="0"
    this.clase.trimestreId="0"

  }
  if (this.semana === undefined && this.semanaExplora === undefined){
    this.uiService.alertaInformativa('Debes seleccionar una semana');
  } else {
    console.log(this.clase)
    const claseActualizada = await this.claseService.putClase(this.clase);
    if (claseActualizada){
      this.uiService.alertaInformativa('Se ha actualizado la clase');
    }
  }


}
}
