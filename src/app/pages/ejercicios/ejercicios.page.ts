import { Component, OnInit, ViewChild, ElementRef,  } from '@angular/core';
import { IonContent, NavController } from '@ionic/angular';
import { Alumno, Usuario } from 'src/interfaces/interfaces';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Ejercicio, AnimacionEjercicio, GrupoEjercicios } from '../../../interfaces/interfaces';
import { EjercicioService } from '../../services/ejercicio.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlumnoService } from 'src/app/services/alumno.service';
import { AddEjercicioPage } from './add-ejercicio/add-ejercicio.page';
import { AnimacionEjercicioService } from '../../services/animacion-ejercicio.service';
import { GrupoEjerciciosService } from '../../services/grupo-ejercicios.service';
import { AddEjerciciosAGrupoPage } from './add-ejercicios-a-grupo/add-ejercicios-a-grupo.page';
import { ProfesorService } from '../../services/profesor.service';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.page.html',
  styleUrls: ['./ejercicios.page.scss'],
})
export class EjerciciosPage implements OnInit {
  
  ejerciciosTotales:any;
  ejercicios: Ejercicio[]=[];
  usuario: Usuario={};
  terminoBusqueda: string = '';
  nivel='';
  cargando:boolean
  nombreGrupoEjercicios='';
  idGrupoEjercicios:string;
  eliminados:Ejercicio[]=[]
  seleccionaEliminar=false;
  activateAnimation=false;

 // type: SearchType = SearchType.all;

  constructor( 
    private usuarioService:UsuarioService,
    private profesorService: ProfesorService,
    private animacionEjercicioService: AnimacionEjercicioService,
    private ejercicioService:EjercicioService,
    private grupoEjerciciosService:GrupoEjerciciosService,
    private navCtrl:NavController,
    private alertController: AlertController,
    private modalController:ModalController,
    private uiService: UiServiceService,) { }

  async ngOnInit() {
  
  }

  searchChanged(event){
    this.ejercicios = this.ejerciciosTotales.filter(item => event.detail.value === '' || item.grupoEjercicioId === +event.detail.value);
    
  }
  
  async ionViewDidEnter(){
    this.cargando=true;
    this.eliminados= [];
    this.seleccionaEliminar=false;
    this.idGrupoEjercicios= await this.grupoEjerciciosService.getgrupoEjerciciosIdActual();
    if(this.idGrupoEjercicios != '0'){

      await this.grupoEjerciciosService.getGrupoEjercicios(this.idGrupoEjercicios).then((grupoEjercicios:GrupoEjercicios)=>{
        this.nombreGrupoEjercicios=grupoEjercicios.nombre
      })
    } else {
      this.nombreGrupoEjercicios="Sin grupo"
    }
  
    this.ejercicios=[]
    this.usuario = this.usuarioService.getUsuario();
    await this.ejercicioService.getEjerciciosGrupoEjercicios(this.idGrupoEjercicios,this.usuario.id).then((ejercicios:Ejercicio[])=>{
      this.ejercicios = ejercicios
      this.ejerciciosTotales= ejercicios
    
    });

    let profeClub:any = await this.profesorService.getClubProfesor(this.usuario.id)
    if (profeClub !== null){

      await this.ejercicioService.getEjerciciosGrupoEjercicios(this.idGrupoEjercicios, profeClub.clubId).then((ejercicios:Ejercicio[])=>{
        for (let ejercicio of ejercicios){
          this.ejercicios.push(ejercicio)
          //this.ejerciciosTotales.push(ejercicio)
        }
      });
    }
    this.cargando=false
 }

 
onPress($event, ejercicio:Ejercicio) {
  this.seleccionaEliminar=true;
  ejercicio.animaTarjeta = true
  if (ejercicio.colorTarjeta === undefined || ejercicio.colorTarjeta==='white') {
    ejercicio.colorTarjeta= "#e6e7be85";
    this.eliminados.push(ejercicio);
  }
  else {
    ejercicio.colorTarjeta= "white";
    this.sacadeEliminados(ejercicio)
    if (this.eliminados.length===0){
      this.seleccionaEliminar=false;
    }
  }

}

onPressUp($event, ejercicio:Ejercicio) {
console.log(this.eliminados)
if (this.eliminados.length===0){
  this.seleccionaEliminar=false;
}
ejercicio.animaTarjeta=false;
}

sacadeEliminados(ejercicio:Ejercicio){
this.eliminados.forEach((value,index)=>{
  if(value==ejercicio) this.eliminados.splice(index,1);
});
}

clickTarjeta(ejercicio:Ejercicio){
if (this.seleccionaEliminar){
 
  ejercicio.animaTarjeta=false;
  if (ejercicio.colorTarjeta === undefined || ejercicio.colorTarjeta==='white') {
    ejercicio.animaTarjeta = true
    ejercicio.colorTarjeta= "#e6e7be85";
    this.eliminados.push(ejercicio);
  }
  else {
    if (this.eliminados.length > 1){
      ejercicio.animaTarjeta = true
      ejercicio.colorTarjeta= "white";
    this.sacadeEliminados(ejercicio)
    }
  }


} else {
  this.goToEjercicio(ejercicio.id)
}
}


  goToEjercicio(ejercicioId:string){
    this.ejercicioService.setEjercicioIdActual(ejercicioId);
    this.ejercicioService.setPaginaAnterior('ejercicios');
    this.navCtrl.navigateRoot( 'main/tabs/ejercicio', { animated:true})
  }

  async mostrarAddEjercicio(ejercicio?:Ejercicio){
    if (this.seleccionaEliminar){
    const modal = await this.modalController.create({
      component: AddEjercicioPage,
      componentProps: {  ejercicio: this.eliminados[0]},
    });
    modal.onDidDismiss()
    .then(() => {
    this.ngOnInit()
  });
    return await modal.present()
}
  }

  
  async mostrarAddEjerciciosAGrupo(){
    const modal = await this.modalController.create({
      component: AddEjerciciosAGrupoPage,
      componentProps: { idGrupo:this.idGrupoEjercicios },
    });
    modal.onDidDismiss()
    .then(() => {
    this.ngOnInit()
  });
    return await modal.present()
  }





  async eliminarEjercicio(){
    
    const alert = await this.alertController.create({
    
      header: 'Eliminar ejercicios',
      message: '¿Estás seguro? Se eliminarán los ejercicios seleccionados',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
     
          handler: (blah) => {
           
          }
        }, {
          text: 'Eliminar',
          handler: async () => {
            let contador = 0;
            for (let ejercicio of this.eliminados){
             await this.ejercicioService.deleteEjercicio(ejercicio);
              contador++;
            }
           
            if (contador=== this.eliminados.length){
              this.uiService.alertaInformativa('Los ejercicios han sido eliminados');
              this.ngOnInit()
   
              
            } else {
              this.uiService.alertaInformativa('Error al eliminar')
              
            }
          }
        }
      ]
    });
  
    await alert.present();
  
  
  
  }
}
