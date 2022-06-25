import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VideoLibroService } from 'src/app/services/videolibro.service';
import { Usuario } from 'src/interfaces/interfaces';
import { VideoLibro, GrupoVideoLibro } from '../../../../../interfaces/interfaces';
import { GrupoVideoLibroService } from '../../../../services/grupo-videolibro.service';


@Component({
  selector: 'app-video-libro',
  templateUrl: './video-libro.page.html',
  styleUrls: ['./video-libro.page.scss'],
})
export class VideoLibroPage implements OnInit {

  @ViewChild('videoPlayer') videoplayer: any;
  usuario: Usuario={};
  cargando:boolean;
  videoLibros: VideoLibro[]=[]
  consejos: VideoLibro[]=[]
  grupoId:string
  tituloVideoLibro:string
  verConsejos:boolean=false;


  

  constructor( private navCtrl:NavController,
    private usuarioService:UsuarioService,
    private videoLibroService:VideoLibroService,
    private grupoVideoLibroService: GrupoVideoLibroService,

   ) { }

   async ngOnInit() {
  
  }

  async ionViewDidEnter(){
    this.verConsejos=false;
    this.videoLibros=[]
    this.consejos=[]
    this.videoLibroService.putPaginas0()
  
    await this.grupoVideoLibroService.getgrupoVideoLibroIdActual().then(async (grupoId)=>{
      this.grupoId = grupoId
      console.log(this.grupoId)
    })
    await this.siguientes()
  }



  async siguientes(event?){
    console.log(event)
    if (event === undefined){
      this.cargando = true;
    }
    if (!this.verConsejos){
      await this.videoLibroService.getVideoLibrosGrupoPaginado(this.grupoId,this.verConsejos).then(async (videoLibro:VideoLibro[])=>{
        this.videoLibros.push(...videoLibro)
  
        if (event === undefined){
          this.cargando = false;
        }
  
        if (event){
         
          event.target.complete();
        }
      
      })
    }
    else if (this.verConsejos){
      await this.videoLibroService.getVideoLibrosGrupoPaginado(this.grupoId,this.verConsejos).then(async (videoLibro:VideoLibro[])=>{
        this.consejos.push(...videoLibro)
        if (event === undefined){
          this.cargando = false;
        }
        if (event){
          event.target.complete();
        }
      })
    }
   }

  reproduceVideo(){
    this.videoplayer?.Play();
  }
  video(){}

  paraVideo(){
    const video = document.querySelector("#video");
    console.log("paramos")
    this.videoplayer?.pause();
  }

  cambiaVista(){
    this.verConsejos = !this.verConsejos
    this.siguientes()
  }
/*
  async siguientes( event){
    await this.getProximosVideos()
  }
  */
}
