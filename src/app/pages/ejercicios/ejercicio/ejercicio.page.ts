import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { IonContent, NavController } from '@ionic/angular';
import { Alumno, DetalleTecnico, Usuario } from 'src/interfaces/interfaces';
import { AlumnoService } from '../../../services/alumno.service';
import { UsuarioService } from '../../../services/usuario.service';
import { DetalleTecnicoService } from '../../../services/detalle-tecnico.service';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { ComiteTecnicoService } from '../../../services/comite-tecnico.service';
import { PopoverDetalleTecnicoComponent } from '../../../components/popover-detalle-tecnico/popover-detalle-tecnico.component';
import { Ejercicio } from '../../../../interfaces/interfaces';
import { EjercicioService } from '../../../services/ejercicio.service';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

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
  alumno: Alumno;
  ejercicio: Ejercicio;
  comiteTecnicoId: string;
  detallesTecnicos: DetalleTecnico[]=[]
  terminoBusqueda: string = '';
  observer: IntersectionObserver;
  paginaAnterior: string;



  constructor(private ejercicioService: EjercicioService,
    private usuarioService:UsuarioService,
    private detalleTecnicoService:DetalleTecnicoService,
    private comiteTecnicoService: ComiteTecnicoService,
    private modalController:ModalController,
    private uiService: UiServiceService,
    private alertController: AlertController,
    private popoverController: PopoverController,
    private renderer: Renderer2,
    private navCtrl:NavController,
    private router: Router) {

    
     }

  async ngOnInit() {
  
    this.cargando=true;
    this.usuario = this.usuarioService.getUsuario();

    
    await this.ejercicioService.getEjercicioIdActual().then(ejercicioId=>{
      this.ejercicioId = ejercicioId
    })
    await this.ejercicioService.getPaginaAnterior().then(pagina=>{
      this.paginaAnterior = pagina
    })
    await this.ejercicioService.getEjercicio(this.usuario.id,this.ejercicioId).then(ejercicio=>{
      this.ejercicio = ejercicio
    });
   
    this.cargando=false;
 
    
  }

  async ionViewDidEnter(){
    await this.ngOnInit()
 }



 goToAnimacion(){
  this.navCtrl.navigateRoot( 'animacion-ejercicio', { animated:true})
}

goToAnterior(){

  this.navCtrl.back();
}


}
