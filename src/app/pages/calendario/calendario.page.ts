import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { CalendarComponentOptions } from 'ion2-calendar';
import { Clase, Alumno, Usuario, Semana, Grupo, SemanaExplora } from '../../../interfaces/interfaces';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
import { ClaseService } from '../../services/clase.service';
import { UsuarioService } from '../../services/usuario.service';
import * as moment from 'moment';
import { SemanaService } from '../../services/semana.service';
import { GrupoService } from '../../services/grupo.service';
import { AlumnoService } from '../../services/alumno.service';
import { SemanaExploraService } from '../../services/semana-explora.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { ProfesorService } from '../../services/profesor.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  eventSource=[];
  viewTitle: string;
  date: string;
  vistaSchedule=false;
  type: 'moment'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  clases: Clase[]=[];
  usuario: Usuario
  fechaElegida:string;
  cargando:boolean;
  eliminados:Clase[]=[]
  seleccionaEliminar=false;
  activateAnimation=false;


  opciones: CalendarComponentOptions = {
    weekdays: ['D','L', 'M', 'X', 'J', 'V', 'S'],
    weekStart: 1,
    monthPickerFormat:['EN','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'],
    from: new Date(1),
  };
 
  selectedDate: Date;
 
 // @ViewChild(CalendarComponent) myCal: CalendarComponent;
 
  constructor(
    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string,
    private modalCtrl: ModalController,
    private claseService:ClaseService,
    private usuarioService:UsuarioService,
    private semanaService:SemanaService,
    private semanaExploraService:SemanaExploraService,
    private grupoService: GrupoService,
    private alumnoService: AlumnoService,
    private navCtrl:NavController,
    private uiService: UiServiceService,
    private alertController:AlertController,
    private profesorService: ProfesorService
  ) {}
 
  ngOnInit() {

  }

  
  isToday:boolean;
  calendar = {
      mode: 'day' as CalendarMode,
      step: 30 as Step,
      currentDate: new Date(),
      dateFormatter: {
         
          formatDayViewHourColumn: function(date:Date) {
              return 'testDH';
          },
          formatDayViewTitle: function(date:Date) {
              return 'testDT';
          }
      }
  };
  
  async ionViewDidEnter(){
    const profesorId = await this.profesorService.getProfesorIdActual()
    if (profesorId !== null){
     this.usuario = await this.usuarioService.getUsuarioId(profesorId)
    } else {
      this.usuario = this.usuarioService.getUsuario();
    }
    this.fechaElegida=moment(new Date()).format('DD-MM-YYYY'),
    this.getClasesDia();
 }
  onChange($event) {
    this.fechaElegida = moment(new Date($event._d)).format('DD-MM-YYYY')
    this.calendar.currentDate = new Date($event._d)
    this.getClasesDia()
  }

  goToClase(claseId:string){
    this.claseService.setClaseIdActual(claseId);
    this.claseService.setPaginaAnterior('calendario');
    this.navCtrl.navigateRoot( 'main/tabs/clase', { animated:true})
  }

  async getClasesDia(){
    this.cargando=true;
    this.clases=[];
    this.eliminados=[]
    this.seleccionaEliminar=false
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

          clase.nombre = grupo.nombre
          clase.color = grupo.color
        })
        } else if (clase.alumnoId !='0'){
          await this.alumnoService.getAlumno(clase.alumnoId).then((alumno:Alumno)=>{

            clase.nombre = alumno[0].nombre+" "+alumno[0].apellidos
            clase.color =alumno[0].color
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

    this.cargando=false;
  }

  cambiaModo(){
    this.vistaSchedule=!this.vistaSchedule;
    console.log(this.vistaSchedule)
  }

  goToAnterior(){
    this.navCtrl.back();
  }
  //Parte del horario



    loadEvents() {
     
  }

  sleep(ms = 0) {
    return new Promise((r) => setTimeout(r, ms));
  }

  async onViewTitleChanged(title) {

    this.eventSource=[]
    this.cargando=false;
    this.fechaElegida = moment(new Date(title)).format('DD-MM-YYYY')
    this.clases.forEach(clase => {
     
   let dia = +clase.fecha.substring(0,2);
   let mes = +clase.fecha.substring(3,5);
   let ano = +clase.fecha.substring(6,10);
   let horaInicio= +clase.horaInicio.substring(0,2);
   let minutosInicio= +clase.horaInicio.substring(3,5);
   let horaFin= +clase.horaFin.substring(0,2);
   let minutosFin= +clase.horaFin.substring(3,5);

  var startTime = new Date(ano, mes-1, dia, horaInicio,minutosInicio);
  var endTime =new Date(ano, mes-1, dia, horaFin,minutosFin);
    this.eventSource.push({
      title: clase.nombre,
      planificacion:clase.nombreSemana,
      startTime: startTime,
      endTime: endTime,
      allDay: false,
      color: clase.color,
      id: clase.id
  });
    });

   // await this.sleep(1000)
    this.cargando=false
    console.log(this.eventSource)
      this.viewTitle = title;
      
  }

  onEventSelected(event) {
    console.log(event)
    this.goToClase(event.id)
  }

  changeMode(mode) {
    
      this.calendar.mode = mode;
  }

  today() {
      this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev) {
      console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
          (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }

  onCurrentDateChanged(event:Date) {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      event.setHours(0, 0, 0, 0);
      this.isToday = today.getTime() === event.getTime();
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
