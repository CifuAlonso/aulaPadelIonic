import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AnimacionEjercicioService } from 'src/app/services/animacion-ejercicio.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { EjercicioExploraService } from '../../../../services/ejercicio-explora.service';
import { EjercicioExplora, Usuario } from '../../../../../interfaces/interfaces';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.page.html',
  styleUrls: ['./ejercicios.page.scss'],
})
export class EjerciciosPage implements OnInit {

  ejerciciosTotales:any;
  ejercicios: EjercicioExplora[]=[];
  entradaEnCalor: EjercicioExplora[]=[];
  progresiones: EjercicioExplora[]=[];
  controles: EjercicioExplora[]=[];
  juegos: EjercicioExplora[]=[];
  carros: EjercicioExplora[]=[];
  partidos: EjercicioExplora[]=[];
  bolaViva: EjercicioExplora[]=[];
  explicaciones: EjercicioExplora[]=[];
  detalles: EjercicioExplora[]=[];
  usuario: Usuario={};
  terminoBusqueda: string = '';
  nivel='';
  cargando:boolean
  nombreGrupoEjercicios='';
  idGrupoEjercicios:string;

 // type: SearchType = SearchType.all;

  constructor( 
    private usuarioService:UsuarioService,
    private animacionEjercicioService: AnimacionEjercicioService,
    private ejercicioService:EjercicioExploraService,
  
    private navCtrl:NavController,
  
 ) { }

  async ngOnInit() {
  
  }

  searchChanged(event){
    this.ejercicios = this.ejerciciosTotales.filter(item => event.detail.value === '' || item.grupoEjercicioId === +event.detail.value);
    
  }
  
  async ionViewDidEnter(){
    this.cargando=true;
    /*
    this.idGrupoEjercicios= await this.grupoEjerciciosService.getgrupoEjerciciosIdActual();
    if(this.idGrupoEjercicios != '0'){

      await this.grupoEjerciciosService.getGrupoEjercicios(this.idGrupoEjercicios).then((grupoEjercicios:GrupoEjercicios)=>{
        this.nombreGrupoEjercicios=grupoEjercicios.nombre
      })
    } else {
      this.nombreGrupoEjercicios="Sin grupo"
    }
    */
  
    this.ejercicios=[]
    this.usuario = this.usuarioService.getUsuario();
    await this.ejercicioService.getEjercicios().then(async (ejercicios:EjercicioExplora[])=>{
      this.ejercicios = ejercicios
      this.ejercicios.sort(function(a, b){
        var nameA = a.nombre.toLowerCase(), nameB = b.nombre.toLowerCase();
        if (nameA < nameB) //sort string ascending
         return -1;
        if (nameA > nameB)
         return 1;
        return 0; //default return value (no sorting)
       });
     
       for (let ejercicio of this.ejercicios){
        if (ejercicio.cod_ejercicio.includes("ENTRADA")){
          this.entradaEnCalor.push(ejercicio)
        } else  if (ejercicio.cod_ejercicio.includes("PROGRESION")){
          this.progresiones.push(ejercicio)
        } else if (ejercicio.cod_ejercicio.includes("CONTROL")){
          this.controles.push(ejercicio)
        } else if (ejercicio.cod_ejercicio.includes("JUEGOS")){
          this.juegos.push(ejercicio)
        } else if (ejercicio.cod_ejercicio.includes("CARROS")){
          this.carros.push(ejercicio)
        } else if (ejercicio.cod_ejercicio.includes("PARTIDO")){
          this.partidos.push(ejercicio)
        } else if (ejercicio.cod_ejercicio.includes("BOLA")){
          this.bolaViva.push(ejercicio)
        } else if (ejercicio.cod_ejercicio.includes("EXP")){
          this.explicaciones.push(ejercicio)
        } else if (ejercicio.cod_ejercicio.includes("DETALLES")){
          this.detalles.push(ejercicio)
        } 
       }
      this.ejerciciosTotales= this.ejercicios
    });

  
    this.cargando=false
 }

  goToEjercicio(ejercicioId:string){
    this.ejercicioService.setEjercicioIdActual(ejercicioId);
    this.ejercicioService.setPaginaAnterior('ejerciciosExplora');
    this.navCtrl.navigateRoot( 'main/tabs/ejercicio-explora', { animated:true})
  }




}
