import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario, VideoLibro } from 'src/interfaces/interfaces';
import { GrupoVideoLibro } from '../../../../interfaces/interfaces';
import { GrupoVideoLibroService } from '../../../services/grupo-videolibro.service';
import { VideoLibroService } from '../../../services/videolibro.service';

@Component({
  selector: 'app-grupo-video-libros',
  templateUrl: './grupo-video-libros.page.html',
  styleUrls: ['./grupo-video-libros.page.scss'],
})
export class GrupoVideoLibrosPage implements OnInit {

  
  usuario: Usuario={};
  cargando:boolean;
  grupoVideoLibro: GrupoVideoLibro[]=[]
  terminoBusqueda: string = '';


  constructor( private navCtrl:NavController,
    private usuarioService:UsuarioService,
    private grupoVideoLibroService:GrupoVideoLibroService,
    private videoLibroService:VideoLibroService
   ) { }

   async ngOnInit() {

  }

  async ionViewDidEnter(){
    this.usuario = this.usuarioService.getUsuario();
this.siguientes()
  }
  
  async getDatos(){
    this.siguientes();
  }
  

  goToVideoLibro(grupoId:string){
    this.grupoVideoLibroService.setGrupoVideoLibroIdActual(grupoId);
    this.navCtrl.navigateRoot( 'main/tabs/video-libro', { animated:true})
  }

  async createImageFromBlob(videoLibro,image: Blob) {

    let FileReader: new() => FileReader = ((window as any).FileReader as any).__zone_symbol__OriginalDelegate;
    let reader = new FileReader();
  
    reader.onload = () =>{
      if (videoLibro.id === 18){
    
      }
       videoLibro.foto = reader.result;
    };
    if (image) {
       reader.readAsDataURL(image);
    }
  }

  async siguientes(event?){
   if (event === undefined){
     console.log("dadsd")
     this.cargando = true;
   }
    await this.grupoVideoLibroService.getGruposVideoLibro().then(async (grupoVideoLibro:GrupoVideoLibro[])=>{
      for (let videoLibro of grupoVideoLibro){
        await this.grupoVideoLibroService.getFotoGrupo(videoLibro.id).then(async (avatarBlob:Blob)=>{
          await this.createImageFromBlob(videoLibro,avatarBlob)
        })
      }
      this.grupoVideoLibro.push(...grupoVideoLibro)
      await this.sleep(500)
      if (event === undefined){
        this.cargando = false;
      }

      if (event){
        await this.sleep(500)
        event.target.complete();
      }
    
    })





  }
  sleep(ms = 0) {
    return new Promise((r) => setTimeout(r, ms));
  }

  


 

}
