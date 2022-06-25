import { Component, OnInit } from '@angular/core';
import { GrupoAlumnos, Usuario } from 'src/interfaces/interfaces';
import { UsuarioService } from '../../../services/usuario.service';
import { GrupoService } from '../../../services/grupo.service';
import { GrupoAlumnoService } from '../../../services/grupo-alumno.service';
import { Grupo, Alumno } from '../../../../interfaces/interfaces';
import { AlumnoService } from '../../../services/alumno.service';
import { AlertController, ModalController, NavController, PopoverController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { PopoverMenuGrupoAlumnosComponent } from '../../../components/popover-menu-grupo-alumnos/popover-menu-grupo-alumnos.component';
import { AddAlumnoGrupoPage } from './add-alumno-grupo/add-alumno-grupo.page';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.page.html',
  styleUrls: ['./grupo.page.scss'],
})
export class GrupoPage implements OnInit {
  usuario: Usuario;
  grupoId: string;
  grupoActual: Grupo
  alumnosIdGrupo: GrupoAlumnos[] = []
  alumnos: Alumno[] = []
  cargando: boolean = false;
  paginaAnterior: string;
  terminoBusqueda: string = '';
  eliminados:Alumno[]=[]
  seleccionaEliminar=false;
  activateAnimation=false;

  constructor(
    private usuarioService: UsuarioService,
    private grupoService: GrupoService,
    private grupoAlumnoService: GrupoAlumnoService,
    private alumnoService: AlumnoService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private uiService: UiServiceService,
    private popoverController: PopoverController,
    private modalController:ModalController,

  ) { }

  async ngOnInit() {
    this.cargando = true
 //  this.cargaDatos()
  }

  async ionViewDidEnter() {
    this.cargando=true
    await this.sleep(500)
    this.cargaDatos()
  }

  sleep(ms = 0) {
    return new Promise((r) => setTimeout(r, ms));
  }

  async cargaDatos(){
    this.alumnosIdGrupo = [];
    this.alumnos = [];
    this.cargando = true;
    this.eliminados= [];
    this.seleccionaEliminar=false;
    this.usuario = this.usuarioService.getUsuario();
    this.grupoId = await this.grupoService.getGrupoIdActual();
    await this.grupoService.getPaginaAnterior().then(async paginaAnterior=>{
      this.paginaAnterior = paginaAnterior
    })

    await this.grupoAlumnoService.getGrupoAlumno(this.grupoId).then((grupos: GrupoAlumnos[]) => {
      this.alumnosIdGrupo = grupos
    })
    this.alumnosIdGrupo.forEach(async (alumnoIdGrupo: GrupoAlumnos) => {
      await this.alumnoService.getAlumno(alumnoIdGrupo.alumnoId).then(async (alumno: Alumno) => {
        await this.alumnoService.getAvatar(alumno[0].profesorId, alumno[0].avatar).then(async (avatarBlob: Blob) => {

          await this.createImageFromBlob(alumno[0], avatarBlob)

        })
        this.alumnos.push(alumno[0])
      })

    });
    await this.grupoService.getGrupo(this.grupoId, this.usuario.id).then((grupo: Grupo) => {
      this.grupoActual = grupo
    })
    await this.sleep(1000)
    this.cargando = false
  }

  goToAlumno(alumnoId: string) {
    this.alumnoService.setAlumnoIdActual(alumnoId);
    this.alumnoService.setPaginaAnterior('grupo');
    this.navCtrl.navigateRoot('main/tabs/alumno', { animated: true })
  }

  async createImageFromBlob(alumno, image: Blob) {
    let FileReader: new () => FileReader = ((window as any).FileReader as any).__zone_symbol__OriginalDelegate;
    let reader = new FileReader();

    reader.onload = () => {
      alumno.foto = reader.result;
    };
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  
  onPress($event, alumno:Alumno) {
    this.seleccionaEliminar=true;
    alumno.animaTarjeta = true
    if (alumno.colorTarjeta === undefined || alumno.colorTarjeta==='white') {
      alumno.colorTarjeta= "#e6e7be85";
      this.eliminados.push(alumno);
    }
    else {
      alumno.colorTarjeta= "white";
      this.sacadeEliminados(alumno)
    }

}

onPressUp($event, alumno:Alumno) {
  if (this.eliminados.length===0){
    this.seleccionaEliminar=false;
  }
  alumno.animaTarjeta=false;
}

sacadeEliminados(alumno:Alumno){
  this.eliminados.forEach((value,index)=>{
    if(value==alumno) this.eliminados.splice(index,1);
});
}
  
clickTarjeta(alumno:Alumno){
  if (this.seleccionaEliminar){
   
    alumno.animaTarjeta=false;
    if (alumno.colorTarjeta === undefined || alumno.colorTarjeta==='white') {
      alumno.animaTarjeta = true
      alumno.colorTarjeta= "#e6e7be85";
      this.eliminados.push(alumno);
    }
    else {
      if (this.eliminados.length > 1){
        alumno.animaTarjeta = true
      alumno.colorTarjeta= "white";
      this.sacadeEliminados(alumno)
      }
    }


  } else {
    this.goToAlumno(alumno.id)
  }
}



  async eliminarAlumnoGrupo() {


    const alert = await this.alertController.create({

      header: 'Eliminar alumnos del grupo',
      message: '¿Estás seguro? Se eliminarán a los alumnos seleccionados de este grupo',
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
            for (let alumno of this.eliminados){
              let alumnoGrupo:GrupoAlumnos=this.alumnosIdGrupo.find(a => a.alumnoId == alumno.id)
             await this.grupoAlumnoService.deleteGrupoAlumno(alumnoGrupo);
              contador++;
            }
           
            if (contador=== this.eliminados.length){
              this.uiService.alertaInformativa('Los alumnos han sido eliminados del grupo');
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

  async mostrarAddAlumnosGrupo(){
    const modal = await this.modalController.create({
      component: AddAlumnoGrupoPage,
    });
    modal.onDidDismiss()
    .then(() => {
    this.ngOnInit()
  });
    return await modal.present()
  }

  async abrePopOver(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverMenuGrupoAlumnosComponent,
      event: ev,
      translucent: true,
      mode: 'ios',
      componentProps: {
        
      },
      //cerrar tocando fuera
      backdropDismiss: true
    });
    await popover.present();

    await popover.onDidDismiss().then((resp) => {
     
      this.ngOnInit()
      
    });


  }

}
