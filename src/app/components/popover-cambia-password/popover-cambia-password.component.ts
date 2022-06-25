import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-cambia-password',
  templateUrl: './popover-cambia-password.component.html',
  styleUrls: ['./popover-cambia-password.component.scss'],
})
export class PopoverCambiaPasswordComponent implements OnInit {
  @Input() usuario: Usuario;

  password:any
  password2:any


  constructor(private usuarioService:UsuarioService,
    private uiService:UiServiceService,
    private popoverController: PopoverController) { }

  ngOnInit() {
  }

  async actualizaPass(){

    if (this.password != this.password2){
      this.uiService.alertaInformativa('Las contraseñas no coinciden');
    }

    /*
    const alumnoActualizado = await this.alumnoService.putAlumno(this.alumno);
    if (alumnoActualizado){
      this.uiService.alertaInformativa('El alumno ha sido actualizado');
      
    } else {
      this.uiService.alertaInformativa('Error al actualizar')
      
    }

    */
  }

 async cerrar(){
    await this.popoverController.dismiss();
  }

}
