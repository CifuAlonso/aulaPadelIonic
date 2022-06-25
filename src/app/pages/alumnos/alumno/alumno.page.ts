import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlumnoService } from '../../../services/alumno.service';
import { Alumno } from '../../../../interfaces/interfaces';
import { NavController, PopoverController } from '@ionic/angular';
import { PopoverMenuAlumnoComponent } from '../../../components/popover-menu-alumno/popover-menu-alumno.component';
import { PopoverFotoComponent } from 'src/app/components/popover-foto/popover-foto.component';
import { PopoverFotoAlumnoComponent } from 'src/app/components/popover-foto-alumno/popover-foto-alumno.component';


@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
  cargando:boolean;
  alumnoId:string
  alumno: Alumno;
  paginaAnterior:string

  constructor(private alumnoService: AlumnoService,
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
  await this.alumnoService.getPaginaAnterior().then(pagina=>{

    this.paginaAnterior = pagina

  })
  await this.alumnoService.getAlumnoIdActual().then(alumnoId=>{
    this.alumnoId = alumnoId
  })
  await this.alumnoService.getAlumno(this.alumnoId).then(alumno=>{
    this.alumno=alumno[0];
  });

    await this.alumnoService.getAvatar(this.alumno.profesorId,this.alumno.avatar).then(async (avatarBlob:Blob)=>{
    
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
     this.alumno.foto = reader.result;
 
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

}
