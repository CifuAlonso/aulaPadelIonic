import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { Usuario } from 'src/interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { PopoverFotoComponent } from 'src/app/components/popover-foto/popover-foto.component';
import { IdiomaUsuarioPage } from './idioma-usuario/idioma-usuario.page';

declare var window:any;

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  usuarioId:Usuario;
  usuario:Usuario
  cargando:boolean=false;
  avatar;
  existeAvatar:boolean = false;

  constructor(private navCtrl:NavController,
    private usuarioService: UsuarioService,
    
    private popoverController: PopoverController) { }

  ngOnInit() {
    this.getDatos();
  }

  async ionViewDidEnter(){
    this.getDatos();
  }

  async getDatos(){
    this.cargando=true;
    this.usuarioId = this.usuarioService.getUsuario();
    await this.usuarioService.getUsuarioId(this.usuarioId.id).then((usuario:Usuario)=>{
      this.usuario = usuario
    })
    console.log(this.usuario)
    if(this.usuario.avatar != ''){
      this.existeAvatar=true
      await this.usuarioService.getAvatar(this.usuario.avatar).then(async (avatarBlob:Blob)=>{
      await this.createImageFromBlob(avatarBlob)
        
      })
    }
    await this.sleep(500)
  this.cargando=false
  }
  sleep(ms = 0) {
    return new Promise((r) => setTimeout(r, ms));
  }
  

  async createImageFromBlob(image: Blob) {
    let FileReader: new() => FileReader = ((window as any).FileReader as any).__zone_symbol__OriginalDelegate;
    let reader = new FileReader();
 
    reader.onload = () =>{
       this.avatar = reader.result;
    };
    if (image) {
       reader.readAsDataURL(image);
    }
 }

  
  goToAnterior(){
    this.navCtrl.back();
  }

  async cambiaAvatar(ev:any){
    const popover = await this.popoverController.create({
      component: PopoverFotoComponent,
      cssClass: 'popover-camara',
      event: ev,
      translucent: true,
      mode:'md',
      //cerrar tocando fuera
      backdropDismiss: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }

  goToEditarUsuario(){
    this.navCtrl.navigateRoot( 'usuario/editar-usuario', { animated:true})
  }

  goToNotificacionesUsuario(){
    this.navCtrl.navigateRoot( 'usuario/notificaciones-usuario', { animated:true})
  }

  goToLicenciaUsuario(){
    this.navCtrl.navigateRoot( 'usuario/licencia-usuario', { animated:true})
  }

  goToInformacion(){
    this.navCtrl.navigateRoot( 'main/tabs/informacion', { animated:true})
  }
  
  async cambiaIdioma(ev:any){
    const popover = await this.popoverController.create({
      component: IdiomaUsuarioPage,
      componentProps: {usuario: this.usuario},
      cssClass: 'popover-camara',
      event: ev,
      translucent: true,
      mode:'md',
      //cerrar tocando fuera
      backdropDismiss: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }

  logout(){
    this.usuarioService.logout();
  }

}
