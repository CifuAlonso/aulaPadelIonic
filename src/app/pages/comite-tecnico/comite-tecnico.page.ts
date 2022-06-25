import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ModalController, NavController } from '@ionic/angular';
import { AlumnoService } from 'src/app/services/alumno.service';
import { Alumno, Usuario } from 'src/interfaces/interfaces';
import { AddComiteTecnicoPage } from './add-comite-tecnico/add-comite-tecnico.page';
import { UsuarioService } from '../../services/usuario.service';
import { ComiteTecnicoService } from 'src/app/services/comite-tecnico.service';
import { stringify } from 'querystring';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-comite-tecnico',
  templateUrl: './comite-tecnico.page.html',
  styleUrls: ['./comite-tecnico.page.scss'],
})
export class ComiteTecnicoPage implements OnInit {
  @ViewChild(IonContent, {read: ElementRef, static:true}) seleccionComite: ElementRef;
  @ViewChild("triggerElement", {read: ElementRef, static:true}) triggerElement: ElementRef;

  alumnoId:string
  alumno: Alumno;
  usuario: Usuario={};
  comiteTecnicoId:string;
  cargando:boolean;
  observer: IntersectionObserver;

  constructor(private alumnoService: AlumnoService, 
    private navCtrl:NavController,
    private modalController:ModalController,
    private usuarioService: UsuarioService,
    private comiteTecnicoService: ComiteTecnicoService,
    private uiService: UiServiceService
    ) { }

  async ngOnInit() {
    this.cargando=true;
    /*
    this.observer = new IntersectionObserver((entries)=>{
      entries.forEach((entry:any)=>{
        if (entry.isIntersecting){
          console.log("HOLA")
          this.renderer.addClass(this.seleccionComite.nativeElement, 'no-transform')
        }else {
          this.renderer.removeClass(this.seleccionComite.nativeElement, 'no-transform')
     
        }
      })
    })
    this.observer.observe(this.triggerElement.nativeElement);
    */
    this.usuario = this.usuarioService.getUsuario();
    await this.alumnoService.getAlumnoIdActual().then(alumnoId=>{
      this.alumnoId = alumnoId
    })
    await this.alumnoService.getAlumnoIdActual().then(alumnoId=>{
      this.alumnoId = alumnoId
    })

    await this.alumnoService.getAlumno(this.alumnoId).then(alumno=>{
      this.alumno=alumno[0];
    });
    await this.comiteTecnicoService.getComiteIdActual().then(comiteId=>{
      this.comiteTecnicoId = comiteId
    })
    
    this.cargando=false;
  }

  async ionViewDidEnter(){
this.ngOnInit()
  }
  

handleScroll(ev){
console.log(ev)
}

  goToDetalles(){
    this.navCtrl.navigateRoot( 'main/tabs/detalle-tecnico', { animated:true})
  }

  goToComportamiento(){
    this.navCtrl.navigateRoot( 'main/tabs/comportamiento', { animated:true})
  }

  goToOpinionTutor(){
    this.navCtrl.navigateRoot( 'main/tabs/opinion-tutor', { animated:true})
  }

  
  goToOpinionEntrenador(){
    this.navCtrl.navigateRoot( 'main/tabs/opinion-entrenador', { animated:true})
  }

  goToSugerencias(){
    this.navCtrl.navigateRoot( 'main/tabs/sugerencias', { animated:true})
  }

async mostrarAddComite(){
 const modal = await this.modalController.create({
   component: AddComiteTecnicoPage,
   componentProps: { usuario: this.usuario , alumnoId:this.alumnoId},
 });
 modal.onDidDismiss()
 .then(() => {
 this.ngOnInit()
});
 return await modal.present()
}

async enviaPdf(){
  const comiteEnviado = await this.comiteTecnicoService.enviaComite(this.comiteTecnicoId,this.usuario.id,this.alumnoId)
  if (comiteEnviado){
    this.uiService.alertaInformativa('Se ha enviado el comité al alumno');

  } else {
    this.uiService.alertaInformativa('Error al enviar el comité')
  
  }
}
}
