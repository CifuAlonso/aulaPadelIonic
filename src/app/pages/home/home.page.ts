import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/interfaces/interfaces';
import { StorageService } from '../../services/storage.service';
import { UsuarioService } from '../../services/usuario.service';
import { ProfesorService } from '../../services/profesor.service';
import { NavController, PopoverController } from '@ionic/angular';
import { PopoverVerPerfilComponent } from '../../components/popover-ver-perfil/popover-ver-perfil.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit{
  usuarioId: Usuario
  usuario: Usuario={};
  horaActual:number=0;
  cargando:boolean=true;
  avatar;
  existeAvatar:boolean = false;


  constructor(private usuarioService:UsuarioService, 
    private navCtrl:NavController, private popoverController:PopoverController,
    private profesorService: ProfesorService) {}
  
  async ngOnInit(){
   await this.getDatos()
  }

  async ionViewDidEnter(){
    this.getDatos();
  }
  

  async getDatos(){
    this.cargando=true;
    this.profesorService.removeProfesorIdActual();
    this.usuarioId = this.usuarioService.getUsuario();
    await this.usuarioService.getUsuarioId(this.usuarioId.id).then((usuario:Usuario)=>{
      this.usuario= usuario
      console.log(this.usuario)
    })
    
    if(this.usuario.avatar != ''){
      this.existeAvatar=true
      await this.usuarioService.getAvatar(this.usuario.avatar).then(async (avatarBlob:Blob)=>{
      await this.createImageFromBlob(avatarBlob)
      })
    }
    await this.sleep(500)
    this.horaActual = new Date().getHours();
    this.cargando=false;
  }

  async createImageFromBlob(image: Blob) {
    let FileReader: new() => FileReader = ((window as any).FileReader as any).__zone_symbol__OriginalDelegate;
    let reader = new FileReader();
 
     reader.onload =  (e) =>{
       this.avatar = reader.result;
      
    };
    if (image) {
       reader.readAsDataURL(image);
    }
 }
 sleep(ms = 0) {
  return new Promise((r) => setTimeout(r, ms));
}


  goToAlumnos(){
    this.navCtrl.navigateRoot( 'main/tabs/alumnos', { animated:true})
  }

  goToProfesores(){
    this.navCtrl.navigateRoot( 'main/tabs/profesores', { animated:true})
  }

  goToCalendario(){
    this.navCtrl.navigateRoot( 'main/tabs/calendario', { animated:true})
  }

  goToClases(){
    this.navCtrl.navigateRoot( 'main/tabs/clases', { animated:true})
  }

  goToUsuario(){
    this.navCtrl.navigateRoot( 'main/tabs/usuario', { animated:true})
  }

  
async abrePopOver(ev:any){
  const popover = await this.popoverController.create({
    component: PopoverVerPerfilComponent,
    event: ev,
    translucent: true,
    mode:'ios',
    //cerrar tocando fuera
    backdropDismiss: true
  });
  await popover.present();

  const { role } = await popover.onDidDismiss();

}
}
