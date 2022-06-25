import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Usuario } from 'src/interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';


declare var window:any;

@Component({
  selector: 'app-popover-foto',
  templateUrl: './popover-foto.component.html',
  styleUrls: ['./popover-foto.component.scss'],
})
export class PopoverFotoComponent implements OnInit {
  usuarioId:Usuario;
  usuario:Usuario
  avatar:any

  constructor(private camera:Camera,
    private usuarioService:UsuarioService,
    private uiService: UiServiceService) { }

 async ngOnInit() {
    this.usuarioId = this.usuarioService.getUsuario();
    await this.usuarioService.getUsuarioId(this.usuarioId.id).then((usuario:Usuario)=>{
      this.usuario = usuario
    });
  }

  

  
  async camara(){

    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true,
      sourceType:this.camera.PictureSourceType.CAMERA
    }
    
    this.camera.getPicture(options).then(async(imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.avatar = window.Ionic.WebView.convertFileSrc( imageData);
   
      if (imageData.includes('jpg')){
        this.usuario.avatar=this.usuario.id+".jpg";
       await this.usuarioService.actualizaUsuario(this.usuario);
      } else if (imageData.includes('jpeg')){
        this.usuario.avatar=this.usuario.id+".jpeg";
        await this.usuarioService.actualizaUsuario(this.usuario);
      } else if (imageData.includes('png')){
        this.usuario.avatar=this.usuario.id+".png";
        await this.usuarioService.actualizaUsuario(this.usuario);
      }
     this.usuarioService.subirAvatar(imageData,this.usuario.id);
     let base64Image = 'data:image/jpeg;base64,' + imageData;

     this.uiService.alertaInformativa('Foto de perfil actualizada');
     await this.sleep(500)
     window.location.reload();
    }, (err) => {
     // Handle error
    });
  }

  async carrete(){

    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY
    }
    
    this.camera.getPicture(options).then(async (imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.avatar = window.Ionic.WebView.convertFileSrc( imageData);
     if (imageData.includes('jpg')){
      this.usuario.avatar=this.usuario.id+".jpg";
      await this.usuarioService.actualizaUsuario(this.usuario);
    } else if (imageData.includes('jpeg')){
      this.usuario.avatar=this.usuario.id+".jpeg";
      await this.usuarioService.actualizaUsuario(this.usuario);
    } else if (imageData.includes('png')){
      this.usuario.avatar=this.usuario.id+".png";
      await this.usuarioService.actualizaUsuario(this.usuario);
    }
     this.usuarioService.subirAvatar(imageData,this.usuario.id);
     let base64Image = 'data:image/jpeg;base64,' + imageData;
  
     this.uiService.alertaInformativa('Foto de perfil actualizada');
     await this.sleep(500)
     window.location.reload();
    }, (err) => {
     // Handle error
    });
  }

  sleep(ms = 0) {
    return new Promise((r) => setTimeout(r, ms));
  }


}
