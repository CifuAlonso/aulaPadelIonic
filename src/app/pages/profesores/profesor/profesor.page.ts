import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlumnoService } from '../../../services/alumno.service';
import { Alumno, Usuario } from '../../../../interfaces/interfaces';
import { NavController, PopoverController } from '@ionic/angular';
import { PopoverMenuAlumnoComponent } from '../../../components/popover-menu-alumno/popover-menu-alumno.component';
import { PopoverFotoComponent } from 'src/app/components/popover-foto/popover-foto.component';
import { PopoverFotoAlumnoComponent } from 'src/app/components/popover-foto-alumno/popover-foto-alumno.component';
import { ProfesorService } from '../../../services/profesor.service';
import { UsuarioService } from '../../../services/usuario.service';


@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {
  cargando:boolean;
  profesorId:string
  profesor: Usuario;
  paginaAnterior:string;
  avatar

  constructor(private profesorService: ProfesorService,
    private usuarioService: UsuarioService,
    private navCtrl:NavController,
    private popoverController: PopoverController) { }

  async ngOnInit() {
   this.getDatos()
  }

  async ionViewDidEnter(){
   this.getDatos();
 }

 async getDatos(){
  this.cargando=true;
  await this.profesorService.getPaginaAnterior().then(pagina=>{

    this.paginaAnterior = pagina

  })
  await this.profesorService.getProfesorIdActual().then(profesorId=>{
    this.profesorId = profesorId
  })
  await this.usuarioService.getUsuarioId(this.profesorId).then(profesor=>{
    this.profesor=profesor;
  });

    await this.usuarioService.getAvatar(this.profesor.avatar).then(async (avatarBlob:Blob)=>{
    
      await this.createImageFromBlob(avatarBlob)
      
    })
  await this.sleep(500)
  this.cargando=false;
 }

 sleep(ms = 0) {
  return new Promise((r) => setTimeout(r, ms));
}

 goToEvaluaciones(){
  this.navCtrl.navigateRoot( 'main/tabs/evaluaciones', { animated:true})
}

goToFaltas(){
  this.navCtrl.navigateRoot( 'main/tabs/faltas', { animated:true})
}

goToPagos(){
  this.navCtrl.navigateRoot( 'main/tabs/pago', { animated:true})
}
async createImageFromBlob(image: Blob) {
  let FileReader: new() => FileReader = ((window as any).FileReader as any).__zone_symbol__OriginalDelegate;
  let reader = new FileReader();

  reader.onload = () =>{
     this.avatar = reader.result;
 
  };
  if (image) {
     reader.readAsDataURL(image);
  }
}

async abrePopOver(ev:any){
  const popover = await this.popoverController.create({
    component: PopoverMenuAlumnoComponent,
    event: ev,
    translucent: true,
    mode:'ios',
    //cerrar tocando fuera
    backdropDismiss: true
  });
  await popover.present();

  const { role } = await popover.onDidDismiss();

}

async cambiaAvatar(ev:any){
  const popover = await this.popoverController.create({
    component: PopoverFotoAlumnoComponent,
    cssClass: 'popover-camara',
    event: ev,
    translucent: true,
    mode:'md',
    //cerrar tocando fuera
    backdropDismiss: true
  });
  await popover.present();

  const { role } = await popover.onDidDismiss();
}

async  goToEditaAlumno(){
    
  this.navCtrl.navigateRoot( 'main/tabs/modifica-alumno', { animated:true})

}


goToEjercicios(){
  this.navCtrl.navigateRoot( 'main/tabs/grupo-ejercicios', { animated:true})
}

goToGrupos(){
  this.navCtrl.navigateRoot( 'main/tabs/grupos', { animated:true})
}

goToPlanificaciones(){
  this.navCtrl.navigateRoot( 'main/tabs/planificaciones', { animated:true})
}

goToAlumnos(){
  this.navCtrl.navigateRoot( 'main/tabs/alumnos', { animated:true})
}

goToCalendario(){
  this.navCtrl.navigateRoot( 'main/tabs/calendario', { animated:true})
}

goToClases(){
  this.navCtrl.navigateRoot( 'main/tabs/clases', { animated:true})
}


}
