import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Grupo, Usuario } from 'src/interfaces/interfaces';
import { GrupoService } from '../../../services/grupo.service';
import iro from '@jaames/iro'

@Component({
  selector: 'app-add-grupo',
  templateUrl: './add-grupo.page.html',
  styleUrls: ['./add-grupo.page.scss'],
})
export class AddGrupoPage implements OnInit {

  nombre: string = "";
  usuario: Usuario={};
  grupo: Grupo;
colorCode:string="";
colorInicial:string="#fff"
isListItemOpened : boolean = false;

  actualizaGrupo:boolean = false;

  constructor(private modalController: ModalController,
    private grupoService: GrupoService,
    private uiService: UiServiceService,
    private alertController: AlertController) { }

    async ngOnInit() {
     
      if (this.grupo != undefined){
        this.actualizaGrupo=true;
        this.nombre=this.grupo.nombre;
        this.colorCode=this.grupo.color
        this.colorInicial=this.grupo.color
      }
      let ref = this;
      var colorPicker = iro.ColorPicker("#picker",{width:150, color:this.colorInicial})
      colorPicker.on('color:change', function(color){
        ref.colorCode = color.hexString;
      })

    }
  

  
  cerrar() {
    this.modalController.dismiss();
  }


  
  async guardarGrupo() {
    let grupo: Grupo={
    profesorId:this.usuario.id,
    nombre: this.nombre,
    color: this.colorCode
    }

    const grupoCreado = await this.grupoService.postGrupo(grupo);
  
    if (grupoCreado){
      this.uiService.alertaInformativa('El grupo ha sido creado');
      this.cerrar()
    } else {
      this.uiService.alertaInformativa('Error al crear el grupo')
      this.cerrar()
    }
  }
  async actualizarGrupo(){
      this.grupo.nombre=this.nombre;
      this.grupo.color = this.colorCode;
      const grupoActualizado = await this.grupoService.putGrupo(this.grupo);
      if (grupoActualizado){
        this.uiService.alertaInformativa('El grupo ha sido actualizado');
        
      } else {
        this.uiService.alertaInformativa('Error al actualizar el grupo')
        
      }
      
    
  }

  
}
