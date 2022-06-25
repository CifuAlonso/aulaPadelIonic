import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Usuario } from 'src/interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../../interfaces/interfaces';


declare var window:any;

@Component({
  selector: 'app-popover-foto-alumno',
  templateUrl: './popover-foto-alumno.component.html',
  styleUrls: ['./popover-foto-alumno.component.scss'],
})
export class PopoverFotoAlumnoComponent implements OnInit {

  usuario:Usuario
  alumno:Alumno;
  alumnoId:string;
  avatar:any

  constructor(private camera:Camera,
    private usuarioService:UsuarioService,
    private uiService: UiServiceService,
    private alumnoService: AlumnoService) { }

  async ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();

    await this.alumnoService.getAlumnoIdActual().then((alumnoId:string)=>{
      this.alumnoId=alumnoId
    });
    await this.alumnoService.getAlumno(this.alumnoId).then((alumno:Alumno)=>{
      this.alumno = alumno[0]
    })
    console.log(this.usuario)
    console.log(this.alumno)
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
        this.alumno.avatar=this.alumno.id+".jpg";
        await this.alumnoService.putAlumno(this.alumno);
      } else if (imageData.includes('jpeg')){
        this.alumno.avatar=this.alumno.id+".jpeg";
        await this.alumnoService.putAlumno(this.alumno);
      } else if (imageData.includes('png')){
        this.alumno.avatar=this.alumno.id+".png";
        await this.alumnoService.putAlumno(this.alumno);
      }
     this.alumnoService.subirAvatar(imageData,this.usuario.id,this.alumno.id);
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
      this.alumno.avatar=this.alumno.id+".jpg";
      await this.alumnoService.putAlumno(this.alumno);
    } else if (imageData.includes('jpeg')){
      this.alumno.avatar=this.alumno.id+".jpeg";
      await this.alumnoService.putAlumno(this.alumno);
    } else if (imageData.includes('png')){
      this.alumno.avatar=this.alumno.id+".png";
      await this.alumnoService.putAlumno(this.alumno);
    }
   this.alumnoService.subirAvatar(imageData,this.usuario.id,this.alumno.id);
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
