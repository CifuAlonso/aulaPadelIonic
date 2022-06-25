import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SemanaExploraService } from 'src/app/services/semana-explora.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SemanaPlanificacionExploraEjercicio, Usuario } from 'src/interfaces/interfaces';
import { EjercicioExploraService } from '../../../../../services/ejercicio-explora.service';
import { SemanaExplora, EjercicioExplora, SeccionExplora, SubSeccionExplora } from '../../../../../../interfaces/interfaces';
import { SemanaEjercicioService } from 'src/app/services/semana-ejercicio.service';
import { SemanaEjercicioExploraService } from 'src/app/services/semana-ejercicio-explora.service';
import iro from '@jaames/iro';

@Component({
  selector: 'app-semana-planificacion-explora',
  templateUrl: './semana-planificacion-explora.page.html',
  styleUrls: ['./semana-planificacion-explora.page.scss'],
})
export class SemanaPlanificacionExploraPage implements OnInit {


  ejerciciosTotales: SemanaPlanificacionExploraEjercicio[] = [];
 


  usuario: Usuario = {};
  terminoBusqueda: string = '';
  nivel = '';
  cargando: boolean
  nombreSemana = '';
  idSemana: string;
  mueveEjercicios = true;
  paginaAnterior:string;
  seccionesId: string[]=[];
  subseccionesId: string[]=[];
  secciones:SeccionExplora[]=[]
  subsecciones: SubSeccionExplora[]=[]
  subseccionesTotales: SubSeccionExplora[]=[]

  // type: SearchType = SearchType.all;

  constructor(
    private usuarioService: UsuarioService,

    private ejercicioService: EjercicioExploraService,
    private semanaEjerciciosService: SemanaEjercicioExploraService,
    private semanaService: SemanaExploraService,
    private navCtrl: NavController,
) { }

  async ngOnInit() {
    this.cargaDatos()

  }

  sleep(ms = 0) {
    return new Promise((r) => setTimeout(r, ms));
  }

  async cargaDatos(){
   
    this.cargando = true;
    this.seccionesId = [];
    this.subseccionesId = [];
    this.secciones= [];
    this.subsecciones = [];
    this.subseccionesTotales = [];

    this.usuario = this.usuarioService.getUsuario();
    await this.semanaService.getPaginaAnterior().then(async paginaAnterior=>{
      this.paginaAnterior = paginaAnterior
    })
    this.idSemana = await this.semanaService.getSemanaIdActual();
    await this.semanaService.getSubSeccionesSeccion().then((subsecciones:SubSeccionExplora[])=>{
      this.subseccionesTotales = subsecciones
    })
    

    /*
    for (let i = 1; i<214;i++){
      await this.semanaService.getSemana(i+"").then((semana: SemanaExplora) => {
        this.nombreSemana = semana.titulo
      })
  
      this.ejerciciosTotales = []
      await this.semanaEjerciciosService.getEjerciciosSemana(i+"").then((ejerciciosSemana: SemanaPlanificacionExploraEjercicio[]) => {
        this.ejerciciosTotales = ejerciciosSemana;
        this.ejerciciosTotales.forEach(async ejercicio => {
          await this.ejercicioService.getEjercicioCodigo(ejercicio.cod_ejercicio).then(async (e:EjercicioExplora)=>{
            if (!e){
              ejercicio.nombreEjercicio=""
           
            } else {
            ejercicio.nombreEjercicio=e.nombre
            if (ejercicio.ejercicioId===0){
            ejercicio.ejercicioId=+e.id;
            const ejercicioActualizado = await this.semanaEjerciciosService.putEjericcioSemana(ejercicio);
           
            }
            }
          })
          
        });
      })
      await this.sleep(3000)
    }

    */

    await this.semanaService.getSemana(this.idSemana).then((semana: SemanaExplora) => {
      this.nombreSemana = semana.titulo
    })

    await this.semanaService.getSeccionesSemana(this.idSemana).then(async (secciones: SeccionExplora[]) => {
      this.secciones = secciones

    })

    this.ejerciciosTotales = []
    await this.semanaEjerciciosService.getEjerciciosSemana(this.idSemana).then(async(ejerciciosSemana: SemanaPlanificacionExploraEjercicio[]) => {
      this.ejerciciosTotales = ejerciciosSemana;
      for (let ejercicio of ejerciciosSemana){
        console.log(ejercicio.subseccionId)
        var subseccion = this.subseccionesTotales.find((x:SubSeccionExplora)=>x.id == ejercicio.subseccionId+"");
        var subseccionFinal = this.subsecciones.find((x:SubSeccionExplora)=>x.id == subseccion.id);
        if (subseccionFinal === undefined){
          subseccion.ejercicios = []
          subseccion.acordeonAbierto=false;
          this.subsecciones.push(subseccion)
        }
      
      }
      
      
      this.ejerciciosTotales.forEach(async ejercicio => {
        await this.ejercicioService.getEjercicioCodigo(ejercicio.cod_ejercicio).then(async (e:EjercicioExplora)=>{
          if (!e){
            ejercicio.nombreEjercicio=""
          } else {
          ejercicio.nombreEjercicio=e.nombre
          if (ejercicio.ejercicioId===0){
          ejercicio.ejercicioId=+e.id;

       
       
        //  const ejercicioActualizado = await this.semanaEjerciciosService.putEjericcioSemana(ejercicio);
         
          }
          }
        })
        
      });
    })


    for (let ejercicio of this.ejerciciosTotales){
   for (let subseccion of this.subsecciones){
     console.log(ejercicio)
     if (ejercicio.subseccionId === +subseccion.id){
      subseccion.ejercicios.push(ejercicio)
     }
   }
   
    }

    for (let seccion of this.secciones){
      seccion.subsecciones = [];
      for (let subseccion of this.subsecciones){
        if (subseccion.seccionId === seccion.id) {
          seccion.subsecciones.push(subseccion)
        }
      }
    }

    for (let seccion of this.secciones){
      if (seccion.subsecciones.length === 0){
        const index = this.secciones.findIndex(obj => obj.id === seccion.id)
        this.secciones.splice(index, 1);
      }
    }

    this.cargando = false
  }

  
  async ionViewWillEnter(){
    await this.sleep(500)
this.cargaDatos()
 }
 
  goToEjercicio(ejercicioId: number) {
    this.ejercicioService.setPaginaAnterior('semanaExplora');
    this.ejercicioService.setEjercicioIdActual(ejercicioId+'');
    this.navCtrl.navigateRoot('main/tabs/ejercicio-explora', { animated: true })
  }

  
  toggleAccordion(subseccion:SubSeccionExplora): void {
    subseccion.acordeonAbierto = !subseccion.acordeonAbierto;
  }

  
  goToAnterior(){
    this.navCtrl.back();
  }
  

}
