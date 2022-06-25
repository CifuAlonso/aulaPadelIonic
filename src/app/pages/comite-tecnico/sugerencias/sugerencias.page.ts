import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Alumno, DetalleTecnico, Usuario } from 'src/interfaces/interfaces';
import { AlumnoService } from '../../../services/alumno.service';
import { UsuarioService } from '../../../services/usuario.service';

import { AlertController, ModalController, PopoverController } from '@ionic/angular';

import { UiServiceService } from 'src/app/services/ui-service.service';
import { ComiteTecnicoService } from '../../../services/comite-tecnico.service';
import { PopoverDetalleTecnicoComponent } from '../../../components/popover-detalle-tecnico/popover-detalle-tecnico.component';
import { SugerenciaService } from 'src/app/services/sugerencia.service';
import { AddSugerenciaPage } from './add-sugerencia/add-sugerencia.page';
import { Sugerencia } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.page.html',
  styleUrls: ['./sugerencias.page.scss'],
})
export class SugerenciasPage implements OnInit {
  @ViewChild(IonContent, {read: ElementRef, static:true}) seleccionSugerencia: ElementRef;
  @ViewChild("triggerElement", {read: ElementRef, static:true}) triggerElement: ElementRef;

  cargando:boolean;
  alumnoId:string
  usuario: Usuario={};
  alumno: Alumno;
  comiteTecnicoId: string;
  sugerencias: Sugerencia[]=[]
  terminoBusqueda: string = '';
  observer: IntersectionObserver;
  constructor(private alumnoService: AlumnoService,
    private usuarioService:UsuarioService,
    private sugerenciaService:SugerenciaService,
    private comiteTecnicoService: ComiteTecnicoService,
    private modalController:ModalController,
    private uiService: UiServiceService,
    private alertController: AlertController,
    private popoverController: PopoverController,
    private renderer: Renderer2) { }

  async ngOnInit() {
    this.cargando=true;
    this.usuario = this.usuarioService.getUsuario();
    await this.alumnoService.getAlumnoIdActual().then(alumnoId=>{
      this.alumnoId = alumnoId
    })
    await this.alumnoService.getAlumno(this.alumnoId).then(alumno=>{
      this.alumno=alumno[0];
    });
    await this.comiteTecnicoService.getComiteIdActual().then(comiteId=>{
      this.comiteTecnicoId = comiteId
    })

    await this.sugerenciaService.getSugerenciasAlumno(this.comiteTecnicoId).then((sugerencias:Sugerencia[])=>{
      
      this.sugerencias=sugerencias
    })
    this.observer = new IntersectionObserver((entries)=>{
      entries.forEach((entry:any)=>{
        if (entry.isIntersecting){
          this.renderer.addClass(this.seleccionSugerencia.nativeElement, 'no-transform')
        }else {
          this.renderer.removeClass(this.seleccionSugerencia.nativeElement, 'no-transform')
     
        }
      })
    })
    this.observer.observe(this.triggerElement.nativeElement);
    this.cargando=false;
 
    
  }

  async ionViewDidEnter(){
    await this.ngOnInit()
 }

 async mostrarAddSugerencia(sugerencia?:Sugerencia){
  const modal = await this.modalController.create({
    component: AddSugerenciaPage,
    componentProps: { usuario: this.usuario , alumnoId:this.alumnoId, comiteTecnicoId:this.comiteTecnicoId, sugerencia},
  });
  modal.onDidDismiss()
  .then(() => {
  this.ngOnInit()
});
  return await modal.present()
}


async eliminarSugerencia(sugerencia: Sugerencia){
  const alert = await this.alertController.create({
  
    header: 'Eliminar sugerencia',
    message: '¿Estás seguro? Se eliminará la sugerencia',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
   
        handler: (blah) => {
         
        }
      }, {
        text: 'Eliminar',
        handler: async () => {
          const sugerenciaEliminado = await this.sugerenciaService.deleteSugerencia(sugerencia);
          if (sugerenciaEliminado){
            this.uiService.alertaInformativa('La sugerencia ha sido eliminada');
            this.ngOnInit()
            
          } else {
            this.uiService.alertaInformativa('Error al eliminar la sugerencia')
            
          }
        }
      }
    ]
  });

  await alert.present();



}



}
