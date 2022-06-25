import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Grupo, Usuario } from '../../../interfaces/interfaces';
import { GrupoService } from '../../services/grupo.service';
import { AddGrupoPage } from './add-grupo/add-grupo.page';
import { ProfesorService } from '../../services/profesor.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.page.html',
  styleUrls: ['./grupos.page.scss'],
})
export class GruposPage implements OnInit {
  grupos: Grupo[]=[];
 gruposTotales: Grupo
  usuario: Usuario={};
  terminoBusqueda: string = '';
  nivel='';
  eliminados:Grupo[]=[]
  seleccionaEliminar=false;
  activateAnimation=false;
 // type: SearchType = SearchType.all;

  constructor(
    private usuarioService:UsuarioService,
    private grupoService: GrupoService,
    private navCtrl:NavController,
    private alertController: AlertController,
    private uiService: UiServiceService,
    private modalController:ModalController,
    private profesorService: ProfesorService) { }

  async ngOnInit() {

  }

  
  async ionViewDidEnter(){
    this.grupos=[]
    this.eliminados= [];
    this.seleccionaEliminar=false;
    const profesorId = await this.profesorService.getProfesorIdActual()
    if (profesorId !== null){
     this.usuario = await this.usuarioService.getUsuarioId(profesorId)
    } else {
      this.usuario = this.usuarioService.getUsuario();
    }
    await this.grupoService.getGruposProfesor(this.usuario.id).then((grupos:Grupo[])=>{
      this.grupos = grupos  
    })
    
 }

  goToGrupo(grupoId:string){
    this.grupoService.setGrupoIdActual(grupoId);
    this.grupoService.setPaginaAnterior('grupos')
    this.navCtrl.navigateRoot( 'main/tabs/grupo', { animated:true})
  }

   
  onPress($event, grupo:Grupo) {
    this.seleccionaEliminar=true;
    grupo.animaTarjeta = true
    if (grupo.colorTarjeta === undefined || grupo.colorTarjeta==='white') {
      grupo.colorTarjeta= "#e6e7be85";
      this.eliminados.push(grupo);
    }
    else {
      grupo.colorTarjeta= "white";
      this.sacadeEliminados(grupo)
      if (this.eliminados.length===0){
        this.seleccionaEliminar=false;
      }
    }

}

onPressUp($event, grupo:Grupo) {
  if (this.eliminados.length===0){
    this.seleccionaEliminar=false;
  }
  grupo.animaTarjeta=false;
}

sacadeEliminados(grupo:Grupo){
  this.eliminados.forEach((value,index)=>{
    if(value==grupo) this.eliminados.splice(index,1);
});
}
  
clickTarjeta(grupo:Grupo){
  if (this.seleccionaEliminar){
   
    grupo.animaTarjeta=false;
    if (grupo.colorTarjeta === undefined || grupo.colorTarjeta==='white') {
      grupo.animaTarjeta = true
      grupo.colorTarjeta= "#e6e7be85";
      this.eliminados.push(grupo);
    }
    else {
      if (this.eliminados.length > 1){
        grupo.animaTarjeta = true
      grupo.colorTarjeta= "white";
      this.sacadeEliminados(grupo)
      }
    }


  } else {
    this.goToGrupo(grupo.id)
  }
}


  async eliminarGrupo(){
    const alert = await this.alertController.create({
    
      header: 'Eliminar grupos',
      message: '¿Estás seguro? Se eliminarán los grupos seleccionados',
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
          for (let grupo of this.eliminados){
           await this.grupoService.deleteGrupo(grupo);
            contador++;
          }
         
          if (contador=== this.eliminados.length){
            this.uiService.alertaInformativa('Los grupos han sido eliminados');
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

  
async mostrarAddGrupo(){
  if (!this.seleccionaEliminar){
    const modal = await this.modalController.create({
      component: AddGrupoPage,
      componentProps: { usuario: this.usuario,  },
    });
    modal.onDidDismiss()
    .then(() => {
    this.ngOnInit()
   });
    return await modal.present()
  } else {
    const modal = await this.modalController.create({
      component: AddGrupoPage,
      componentProps: { usuario: this.usuario, grupo:this.eliminados[0] },
    });
    modal.onDidDismiss()
    .then(() => {
    this.ngOnInit()
   });
    return await modal.present()
   }
  
  }


}
