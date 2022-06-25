import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { DetalleTecnico, Usuario } from 'src/interfaces/interfaces';
import { DetalleTecnicoService } from '../../../../services/detalle-tecnico.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { AlumnoService } from '../../../../services/alumno.service';

@Component({
  selector: 'app-add-detalle',
  templateUrl: './add-detalle.page.html',
  styleUrls: ['./add-detalle.page.scss'],
})
export class AddDetallePage implements OnInit {
  
  golpe: string = "";
  preparacion: string = "";
  puntoImpacto: string = "";
  coordPies: string = "";
  terminacion: string = "";
  puntuacion:number=0;
  alumnoId:string
  usuario: Usuario={};
  detalle: DetalleTecnico;
  comiteTecnicoId:string;
  actualizaDetalle:boolean = false;

  constructor(private modalController: ModalController,
    private detalleTecnicoService: DetalleTecnicoService,
    private uiService: UiServiceService,
    private alertController: AlertController) { }

    async ngOnInit() {
      if (this.detalle != undefined){
        this.actualizaDetalle=true;
        this.golpe=this.detalle.golpe;
        this.preparacion= this.detalle.preparacion;
        this.puntoImpacto= this.detalle.puntoImpacto;
        this.coordPies = this.detalle.coordPies;
        this.terminacion= this.detalle.terminacion
      }

    }
  
    async ionViewDidEnter(){
      this.ngOnInit();
   }
  
  cerrar() {
    this.modalController.dismiss();
  }

  
  async guardarDetalle() {
    let detalle: DetalleTecnico={
    alumnoId:this.alumnoId,
    profesorId:this.usuario.id,
    comiteTecnicoId:this.comiteTecnicoId,
    golpe: this.golpe,
    preparacion: this.preparacion,
    puntoImpacto: this.puntoImpacto,
    coordPies: this.coordPies,
    terminacion:this.terminacion
    }

    const detalleCreado = await this.detalleTecnicoService.postDetalleTecnico(detalle);
  
    if (detalleCreado){
      this.uiService.alertaInformativa('El detalle técnico ha sido creado');
      this.cerrar()
    } else {
      this.uiService.alertaInformativa('Error al crear el detalle técnico')
      this.cerrar()
    }
  }
  async actualizarDetalle(){
      if (this.preparacion === null || this.puntoImpacto === null || this.terminacion === null || this.coordPies === null){
        this.uiService.alertaInformativa('Puntúa cada sección antes de actualizar')
      } else {
      this.detalle.golpe=this.golpe;
      this.detalle.preparacion=this.preparacion;
      this.detalle.puntoImpacto=this.puntoImpacto;
      this.detalle.terminacion=this.terminacion;
      this.detalle.coordPies=this.coordPies
   
      let valoresPuntuar=[]
      valoresPuntuar.push(this.detalle.preparacion)
      valoresPuntuar.push(this.detalle.puntoImpacto)
      valoresPuntuar.push(this.detalle.terminacion)
      valoresPuntuar.push(this.detalle.coordPies)

      this.puntuacion = this.calculaPuntuacion(valoresPuntuar);
      this.detalle.puntuacion = this.puntuacion;


      const alumnoActualizado = await this.detalleTecnicoService.putDetalleTecnico(this.detalle);
      if (alumnoActualizado){
        this.uiService.alertaInformativa('El detalle técnico ha sido actualizado');
        
      } else {
        this.uiService.alertaInformativa('Error al actualizar el detalle técnico')
        
      }
   
    }
    
  }

  calculaPuntuacion(puntos:any[]): number{
    let puntuacion = 0;
    for (let punto of puntos){
      if (punto === "mal"){
        puntuacion = puntuacion+2
      }else if (punto ==="regular"){
        puntuacion = puntuacion+4
      }else if (punto ==="bien"){
        puntuacion = puntuacion+6
      } else if (punto === "muy bien"){
        puntuacion = puntuacion+8
      } else if (punto ==="excelente"){
        puntuacion = puntuacion+10
      }
    }
    console.log(puntuacion)
    console.log((puntuacion)/4)

    return puntuacion/4
  }

  async eliminarDetalle(){
    const alert = await this.alertController.create({
    
      header: 'Eliminar detalle técnico',
      message: '¿Estás seguro? Se eliminará el detalle técnico',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
     
          handler: (blah) => {
           
          }
        }, {
          text: 'Eliminar',
          handler: async () => {
            const detalleEliminado = await this.detalleTecnicoService.deleteDetalleTecnico(this.detalle);
            if (detalleEliminado){
              this.uiService.alertaInformativa('El detalle técnico ha sido eliminado');
              this.cerrar()
              
            } else {
              this.uiService.alertaInformativa('Error al eliminar el detalle técnico')
              
            }
          }
        }
      ]
    });

    await alert.present();


  
}
}
