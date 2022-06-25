import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import * as moment from 'moment';
import { AlumnoService } from 'src/app/services/alumno.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Alumno } from 'src/interfaces/interfaces';
import iro from '@jaames/iro'

@Component({
  selector: 'app-modifica-alumno',
  templateUrl: './modifica-alumno.page.html',
  styleUrls: ['./modifica-alumno.page.scss'],
})
export class ModificaAlumnoPage implements OnInit {
  cargando:boolean;
  alumnoId:string
  alumno: Alumno;
  nombre: string = "";
  apellidos: string = "";
  email: string = "";
  email2: string = "";
  telefono: string = "";
  telefono2: string = "";
  genero: string = "";
  nacimiento: string="";
  fecha: any;
  nivel: string = "0"
  observaciones:string;
  colorCode:string="";
colorInicial:string="#fff"
isListItemOpened : boolean = false;
  constructor(private alumnoService: AlumnoService,
    private navCtrl:NavController,
    private uiService: UiServiceService,
    private popoverController: PopoverController) { }

  async ngOnInit() {
 
  }

  async ionViewDidEnter(){
    this.cargando=true;

    await this.alumnoService.getAlumnoIdActual().then(alumnoId=>{
      this.alumnoId = alumnoId
    })
    await this.alumnoService.getAlumno(this.alumnoId).then(alumno=>{
      this.alumno=alumno[0];
      this.nombre=this.alumno.nombre;
      this.apellidos=this.alumno.apellidos;
      this.email=this.alumno.email;
      this.email2=this.alumno.email2;
      this.telefono=this.alumno.telefono;
      this.telefono2=this.alumno.telefono2;
      this.genero=this.alumno.genero;
      this.fecha=moment(this.alumno.nacimiento,'DD-MM-YYYY').toString()
      this.nivel=this.alumno.nivel+"";
      this.observaciones=this.alumno.observaciones
      this.colorInicial=this.alumno.color
      
    });
    let ref = this;
      var colorPicker = iro.ColorPicker("#picker",{width:150, color:this.colorInicial})
      colorPicker.on('color:change', function(color){
        ref.colorCode = color.hexString;
      })
    this.cargando=false;
 }

 cerrar(){
  this.navCtrl.navigateRoot( 'main/tabs/alumno', { animated:true})
}


async actualizarAlumno(){
this.alumno.nombre=this.nombre
this.alumno.apellidos=this.apellidos
this.alumno.email=this.email
this.alumno.email2=this.email2
this.alumno.telefono=this.telefono;
this.alumno.telefono2=this.telefono2;
this.alumno.genero=this.genero;
this.alumno.nacimiento=moment(this.fecha).format('DD-MM-YYYY');
this.alumno.nivel=this.nivel;
this.alumno.observaciones=this.observaciones
this.alumno.color=this.colorCode
  const alumnoActualizado = await this.alumnoService.putAlumno(this.alumno);
  if (alumnoActualizado){
    this.uiService.alertaInformativa('El alumno ha sido actualizado');
    
  } else {
    this.uiService.alertaInformativa('Error al actualizar')
    
  }
  

}

toggleAccordion(): void {
  this.isListItemOpened = !this.isListItemOpened;
}

 
}
