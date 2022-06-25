import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { EjercicioExploraService } from 'src/app/services/ejercicio-explora.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/interfaces/interfaces';
import { EjercicioExplora, VideoEjercicio } from '../../../../../../interfaces/interfaces';
import { EjercicioService } from 'src/app/services/ejercicio.service';
import { HttpClient } from '@angular/common/http';
import { UiServiceService } from '../../../../../services/ui-service.service';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.page.html',
  styleUrls: ['./ejercicio.page.scss'],
})
export class EjercicioPage implements OnInit {

 

  cargando:boolean;
  alumnoId:string
  ejercicioId:string;
  usuario: Usuario={};
  ejercicio: EjercicioExplora;
  terminoBusqueda: string = '';
  observer: IntersectionObserver;
  paginaAnterior: string;
  fileSelected?: File;
  videoElegido:boolean=false;
  usuarioId:string;
  videoGuardado:boolean;



  constructor(private ejercicioService: EjercicioExploraService,
    private ejercicioUsuarioService: EjercicioService,
    private usuarioService:UsuarioService,
    private navCtrl:NavController,
    private http: HttpClient,
    private uiService:UiServiceService
 ) {

    
     }

  async ngOnInit() {
  
    this.cargando=true;
    this.usuario = this.usuarioService.getUsuario();
    this.usuarioId = this.usuario.id+""

    
    await this.ejercicioService.getEjercicioIdActual().then(ejercicioId=>{
      this.ejercicioId = ejercicioId
    })
    await this.ejercicioService.getPaginaAnterior().then(pagina=>{
      this.paginaAnterior = pagina
    })
    await this.ejercicioService.getEjercicio(this.ejercicioId).then(async ejercicio=>{
      this.ejercicio = ejercicio
      console.log(this.ejercicio)
      await this.ejercicioService.getVideoEjercicio(this.ejercicio.id).then(videoEjercicio=>{
        if(videoEjercicio){
          console.log("Hay video")
          this.videoGuardado=true;
        } else {
          console.log("No hay video")
          this.videoGuardado=false;
        }
      })
   
    });
   
    this.cargando=false;
 
    
  }



  async ionViewDidEnter(){
    await this.ngOnInit()
    this.videoElegido=false;
 }



 goToAnimacion(){
   this.ejercicioUsuarioService.deleteEjercicioIdActual()
  this.navCtrl.navigateRoot( 'animacion-ejercicio', { animated:true})
}

goToAnterior(){

  this.navCtrl.back();
}

  
onSelectNewFile(elemnt: any): void {
  if (elemnt.files?.length == 0) return;
  this.fileSelected = (elemnt.files as FileList)[0];
  this.videoElegido=true;


}

video(){}


subeVideo() {
  console.log(this.ejercicio)
  
  let fmData = new FormData();
  fmData.append("file", this.fileSelected as any);
  console.log(fmData)
 
    this.http.post('https://web.aulapadel.com:3000/servidor/'+this.ejercicio.cod_ejercicio, fmData,)
    .subscribe(async res => {
      console.log(res)
      let videoEjercicio: VideoEjercicio={
        ejercicioId: this.ejercicio.id,
        cod_ejercicio: this.ejercicio.cod_ejercicio,
        }
    
      await this.ejercicioService.postVideoEjercicio(videoEjercicio);
      this.uiService.alertaInformativa('Video subido');
     // window.location.reload();
    }, error => {
      alert("error");
      console.error(error);
    });
    
}


}
