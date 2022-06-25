import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AlumnoService } from 'src/app/services/alumno.service';
import { ClaseService } from 'src/app/services/clase.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { SemanaService } from 'src/app/services/semana.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Alumno, Clase, Grupo, Semana, SemanaExplora, Usuario } from 'src/interfaces/interfaces';
import { UiServiceService } from '../../services/ui-service.service';
import { NavController, AlertController } from '@ionic/angular';
import { SemanaExploraService } from '../../services/semana-explora.service';
import { ProfesorService } from '../../services/profesor.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {
  clases: Clase[]=[];
  clasesSinPuntuar: Clase[]=[]
  usuario: Usuario
  fechaElegida:string;
  cargando:boolean;
  rate:any;
  puntuacionInicio=0;
  eliminados:Clase[]=[]
  seleccionaEliminar=false;
  activateAnimation=false;


  constructor(private usuarioService: UsuarioService,
    private profesorService: ProfesorService,
    private claseService: ClaseService,
    private grupoService:GrupoService,
    private alumnoService:AlumnoService,
    private semanaService:SemanaService,
    private semanaExploraService: SemanaExploraService,
    private uiService: UiServiceService,
    private navCtrl:NavController,
    private alertController:AlertController) { }

  ngOnInit() {

  }

  
  async ionViewDidEnter(){

    const profesorId = await this.profesorService.getProfesorIdActual()
    if (profesorId !== null){
     this.usuario = await this.usuarioService.getUsuarioId(profesorId)
    } else {
      this.usuario = this.usuarioService.getUsuario();
    }
  
    
    this.fechaElegida=moment(new Date()).format('DD-MM-YYYY'),
    this.getDatos()
 }

 goToAnterior(){
  this.navCtrl.back();
}

  async puntuaClase(rating, clase:Clase){
    console.log(clase)
    console.log("changed rating: ",rating);
    // do your stuff
    clase.puntuacion=rating
    await this.sleep(1000)
    const claseActualizada = await this.claseService.putClase(clase);
    if (claseActualizada){
      this.uiService.alertaInformativa('Se ha guardado la puntuación');
      this.cargando = true;
      this.getClasesSinPuntuar()
      this.cargando=false;  
    } else {
      this.uiService.alertaInformativa('Error al guardar la puntuación')
      
    }
    
}

sleep(ms = 0) {
  return new Promise((r) => setTimeout(r, ms));
}

  async getClasesDia(){
    this.clases=[];

    await this.claseService.getClasesDia(this.usuario.id,this.fechaElegida).then((clases:Clase[])=>{
      this.clases=clases
    })
    this.clases.sort(function(a,b){
      if (a.horaInicio>b.horaInicio){
        return 1;
      }if (a.horaInicio<b.horaInicio){
        return -1;
      }
      return 0;
    })

    this.clases.forEach(async clase => {
      if (clase.grupoId !='0'){
        await this.grupoService.getGrupo(clase.grupoId,this.usuario.id).then((grupo:Grupo)=>{
          console.log(grupo)
          clase.nombre = grupo.nombre
        })
        } else if (clase.alumnoId !='0'){
          await this.alumnoService.getAlumno(clase.alumnoId).then((alumno:Alumno)=>{
            clase.nombre = alumno[0].nombre+" "+alumno[0].apellidos
          })
        }
        if(clase.planificacionId != '0'){
          if(clase.tipoPlanificacion==='propia'){
        await this.semanaService.getSemana(clase.semanaId).then((semana:Semana)=>{
          clase.nombreSemana = semana.nombre
        })
      } else {
        await this.semanaExploraService.getSemana(clase.semanaId).then((semana:SemanaExplora)=>{
          clase.nombreSemana= semana.titulo
        })
      }
      }
  })
  
  }

  async getClasesSinPuntuar(){
    this.clasesSinPuntuar=[];
    let fecha= moment(new Date()).format('DD-MM-YYYY')
    let horaActual = new Date().getHours()+":"+new Date().getMinutes();
    let strHoraActual:any = horaActual.split(':')
    var timeA = new Date();
    timeA.setHours(strHoraActual[0],strHoraActual[1]);


    await this.claseService.getClasesDia(this.usuario.id,fecha).then((clases:Clase[])=>{
      for (let clase of clases){
        console.log(clase)
      let strHoraClase:any = clase.horaFin.split(':')
      var timeB = new Date();
      timeB.setHours(strHoraClase[0],strHoraClase[1]);
      if (timeA > timeB){
        if(clase.puntuacion === 0){
          this.clasesSinPuntuar.push(clase)
        }
      }
     
      }
    })



    this.clasesSinPuntuar.sort(function(a,b){
      if (a.fecha>b.fecha){
        return 1;
      }if (a.fecha<b.fecha){
        return -1;
      }
      return 0;
    })

    this.clasesSinPuntuar.forEach(async clase => {
      if (clase.grupoId !='0'){
        await this.grupoService.getGrupo(clase.grupoId,this.usuario.id).then((grupo:Grupo)=>{
          
          clase.nombre = grupo.nombre
        })
        } else if (clase.alumnoId !='0'){
          await this.alumnoService.getAlumno(clase.alumnoId).then((alumno:Alumno)=>{
            clase.nombre = alumno[0].nombre+" "+alumno[0].apellidos
          })
        }
        if(clase.planificacionId != '0'){
          if(clase.tipoPlanificacion==='propia'){
        await this.semanaService.getSemana(clase.semanaId).then((semana:Semana)=>{
          clase.nombreSemana = semana.nombre
        })
      } else {
        await this.semanaExploraService.getSemana(clase.semanaId).then((semana:SemanaExplora)=>{
          clase.nombreSemana= semana.titulo
        })
      }
      }
  })

  console.log(this.clasesSinPuntuar)


  }

  async getDatos(){
    this.cargando = true;
    this.eliminados=[];
    this.seleccionaEliminar=false
    await this.getClasesDia();
    await this.getClasesSinPuntuar();
    this.cargando = false;
  }

  goToClase(claseId:string){
    this.claseService.setClaseIdActual(claseId);
    this.claseService.setPaginaAnterior('clases');
    this.navCtrl.navigateRoot( 'main/tabs/clase', { animated:true})
  }



onPress($event, clase:Clase) {
  this.seleccionaEliminar=true;
  clase.animaTarjeta = true
  if (clase.colorTarjeta === undefined || clase.colorTarjeta==='white') {
    clase.colorTarjeta= "#e6e7be85";
    this.eliminados.push(clase);
  }
  else {
    clase.colorTarjeta= "white";
    this.sacadeEliminados(clase)
    if (this.eliminados.length===0){
      this.seleccionaEliminar=false;
    }
  }

}

onPressUp($event, clase:Clase) {
if (this.eliminados.length===0){
  this.seleccionaEliminar=false;
}
clase.animaTarjeta=false;
}

sacadeEliminados(clase:Clase){
this.eliminados.forEach((value,index)=>{
  if(value==clase) this.eliminados.splice(index,1);
});
}

clickTarjeta(clase:Clase){
if (this.seleccionaEliminar){
 
  clase.animaTarjeta=false;
  if (clase.colorTarjeta === undefined || clase.colorTarjeta==='white') {
    clase.animaTarjeta = true
    clase.colorTarjeta= "#e6e7be85";
    this.eliminados.push(clase);
  }
  else {
    if (this.eliminados.length > 1){
      clase.animaTarjeta = true
      clase.colorTarjeta= "white";
    this.sacadeEliminados(clase)
    }
  }


} else {
  this.goToClase(clase.id)
}
}


async eliminarClase(){
  const alert = await this.alertController.create({
  
    header: 'Eliminar alumno',
    message: '¿Estás seguro? Se eliminarán las clases seleccionadas',
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
        for (let clase of this.eliminados){
         await this.claseService.deleteClase(clase);
          contador++;
        }
       
        if (contador=== this.eliminados.length){
          this.uiService.alertaInformativa('Las clases han sido eliminadas');
          this.ionViewDidEnter()

          
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
