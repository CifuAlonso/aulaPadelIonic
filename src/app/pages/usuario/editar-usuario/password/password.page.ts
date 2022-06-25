import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  @Input() usuario: Usuario;

  password:string ="";
  password2:string = "";


  constructor(private usuarioService:UsuarioService,
    private uiService:UiServiceService,
    private popoverController: PopoverController) { }

  ngOnInit() {
  }

  async actualizaPass(){
    if (this.password != this.password2){
      this.uiService.alertaInformativa('Las contraseñas no coinciden');
    } else {
      this.usuario.password = this.password;
      const usuarioActualizado = await this.usuarioService.actualizaPassword(this.usuario);
    if (usuarioActualizado){
      this.uiService.alertaInformativa('Contraseña actualizada');
      
    } else {
      this.uiService.alertaInformativa('Error al actualizar')
      
    }
    }

  
  }

 async cerrar(){
    await this.popoverController.dismiss();
  }
}
