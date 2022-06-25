import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AnimacionEjercicioService } from 'src/app/services/animacion-ejercicio.service';
import { AnimacionEjercicio, Usuario } from 'src/interfaces/interfaces';
import { ElementoAnimado } from './ElementoAnimado';
import { Elipse } from './Elipse';
import { Flecha } from './Flecha';
import { FlechaDoble } from './FlechaDoble';
import { Frame } from './Frame';
import { Icono } from './Icono';
import { Linea } from './Linea';
import { Point } from './Point';
import { Rectangulo } from './Rectangulo';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { EjercicioService } from '../../services/ejercicio.service';
import { UsuarioService } from '../../services/usuario.service';
import { EjercicioExploraService } from '../../services/ejercicio-explora.service';
import { AnimacionEjercicioExploraService } from 'src/app/services/animacion-ejercicio-explora.service';

@Component({
  selector: 'app-animacion-ejercicio',
  templateUrl: './animacion-ejercicio.page.html',
  styleUrls: ['./animacion-ejercicio.page.scss'],
})
export class AnimacionEjercicioPage implements OnInit, AfterViewInit {
  @ViewChild('canvasEl', { static: true }) canvasEl: ElementRef<HTMLCanvasElement>;
  context: CanvasRenderingContext2D;
  isListItemOpened : boolean = false;
  isListItemOpened2 : boolean = false;
  isListItemOpened3 : boolean = false;
  posicionXinicial = 50;
  posicionXOriginal = 50;
  posicionYOriginal = 443;
  medidaOriginal = 500;
  widthPantalla=0;
  heightPantalla=0;
  elementos: ElementoAnimado[] = []
  figurasActuales: any[] = []
  lineas:Linea[]=[]
  flechas: Flecha[] = []
  flechasDobles: FlechaDoble[]=[]
  rectangulos: Rectangulo[] = []
  elipses: Elipse[]=[]
  secuenciaFiguras: any[] = [];
  posicionFiguras = 0;
  secuencia: any[] = [];
  ejercicioIniciado = false;
  ejercicioFinalizado = false;
  animacionEjercicio: AnimacionEjercicio
  id = ""
  animacionExistente = false;
  segundaLineaElementos = false;
  terceraLineaElementos = false;
  ejercicio: any;
  titulo = "";
  descripcion = ""
  pista = 'pista.png'
  urlPista = 'url(/assets/pistas/' + this.pista + ')';
  tipoUsuario;
  ejercicioExplora = false;
  primeraVuelta = 0;
  ejercicioId:string;
  usuario:Usuario
  comienzaAnimacion=true;
  esExplora = false;


  constructor(private animacionEjericioService: AnimacionEjercicioService,
    private animacionEjericioExploraService: AnimacionEjercicioExploraService,
    private ejercicioService:EjercicioService,
    private ejercicioExploraService:EjercicioExploraService,
    private platform: Platform, private uiService: UiServiceService,
    private usuarioService:UsuarioService,  private alertController: AlertController,
    private navCtrl:NavController,) { }

  async ngOnInit() {
    this.esExplora = false;
    this.platform.ready().then(() => {
      this.widthPantalla = this.platform.width();
    });
    this.usuario = this.usuarioService.getUsuario();
    //this.ejercicio = this.animacionEjericioService.getDatosEjercicio()
    await this.ejercicioService.getEjercicioIdActual().then(async ejercicioId=>{
     
      if (ejercicioId){
      this.ejercicioId = ejercicioId
      } else {
        await this.ejercicioExploraService.getEjercicioIdActual().then(ejercicioId=>{
          this.ejercicioId = ejercicioId;
          this.esExplora=true;
        })
      }
    })
    await this.ejercicioService.getEjercicio(this.usuario.id,this.ejercicioId).then(ejercicio=>{
      this.ejercicio = ejercicio
    });
    
        this.medidaOriginal=this.platform.width()
      

    
    
  }

 ionViewWillLeave() {
   this.comienzaAnimacion=false;
} 

  async ngAfterViewInit() {
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');
    this.canvasEl.nativeElement.onwheel = function(event){
      event.preventDefault();
  };
 // this.canvasEl.nativeElement.addEventListener("touchstart",  function(event) {event.preventDefault()})
 // this.canvasEl.nativeElement.addEventListener("touchmove",   function(event) {event.preventDefault()})
  //this.canvasEl.nativeElement.addEventListener("touchend",    function(event) {event.preventDefault()})
  //this.canvasEl.nativeElement.addEventListener("touchcancel", function(event) {event.preventDefault()})

    this.posicionXinicial = (this.posicionXinicial * this.canvasEl.nativeElement.width) / this.medidaOriginal
    if (this.comienzaAnimacion){
    this.animate()
    }
    await this.ejercicioService.getEjercicioIdActual().then(async ejercicioId=>{
     
      if (ejercicioId){
      this.ejercicioId = ejercicioId
      } else {
        await this.ejercicioExploraService.getEjercicioIdActual().then(ejercicioId=>{
          this.ejercicioId = ejercicioId;
          this.esExplora=true;
        })
      }
    })
    if (!this.esExplora){
    await this.ejercicioService.getEjercicio(this.usuario.id,this.ejercicioId).then(ejercicio=>{
      this.ejercicio = ejercicio
    });
  } else {
    await this.ejercicioExploraService.getEjercicio(this.ejercicioId).then(ejercicio=>{
      this.ejercicio = ejercicio
  })
}
    if(this.ejercicioId){

      this.cargaEjercicio(this.ejercicioId);
    }
    
  }

  sleep(ms = 0) {
    return new Promise((r) => setTimeout(r, ms));
  }


  dibujaPista(pista: string) {
    this.pista = pista;
    this.urlPista = 'url(/assets/pistas/' + this.pista + ')';
  }

  changeTheme() {
    this.pista = 'url(/assets/pistas/pista2.png)'
  }

  async goToEjercicio(){
    const alert = await this.alertController.create({
      header: 'Vas a cerrar',
      message: '¿Estás seguro? todos los cambios no guardados se perderán',
      buttons: [
       {
          text: 'Cerrar',
        
          handler: async () => {
            if (!this.esExplora){
              this.navCtrl.navigateRoot( 'main/tabs/ejercicio', { animated:true})
              } else {
                this.navCtrl.navigateRoot( 'main/tabs/ejercicio-explora', { animated:true})
              }
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        
          handler: async () => {
      
          }
        },
      ]
    });

    await alert.present();
   
  }
  async animate() {
    if (this.comienzaAnimacion){
    window.requestAnimationFrame(() => this.animate());
    if (this.animacionExistente || this.ejercicioFinalizado) {
      let finFrame = this.elementos.every(elemento => elemento.terminaFrame)

      if (finFrame == false && this.elementos[0].frameActual === 0) {
        if (this.primeraVuelta === 0) {
          for (let figura of this.secuenciaFiguras[0]) {
            if (this.ejercicioFinalizado && !this.animacionExistente) {
              figura = JSON.parse(figura)
            }
            let punto1 = new Point(figura[1][0].x, figura[1][0].y)
            let punto2 = new Point(figura[1][1].x, figura[1][1].y)
            let punto3 = new Point(figura[1][2].x, figura[1][2].y)
            let punto4 = new Point(figura[1][3].x, figura[1][3].y)
            let puntos = [punto1, punto2, punto3, punto4]
            puntos.forEach(punto => {
              punto.x = (punto.x * this.canvasEl.nativeElement.width) / this.medidaOriginal
              punto.y = (punto.y * this.canvasEl.nativeElement.height) / this.medidaOriginal
            });
            if (figura[0] === "Flecha") {
              let flecha = new Flecha(puntos, this.canvasEl, this.context, this.animacionEjericioService);
              this.figurasActuales.push(flecha)
              flecha.animacionFinalizada = true;
              flecha.ngAfterViewInit();
            } else if (figura[0] === "Rectangulo") {
              let rectangulo = new Rectangulo(puntos, this.canvasEl, this.context, this.animacionEjericioService);
              this.figurasActuales.push(rectangulo)
              rectangulo.animacionFinalizada = true;
              rectangulo.ngAfterViewInit();
            }else if (figura[0] === "FlechaDoble") {
              let flechaDoble = new FlechaDoble(puntos, this.canvasEl, this.context, this.animacionEjericioService);
              this.figurasActuales.push(flechaDoble)
              flechaDoble.animacionFinalizada = true;
              flechaDoble.ngAfterViewInit();
            }else if (figura[0] === "Linea") {
              let linea = new Linea(puntos, this.canvasEl, this.context, this.animacionEjericioService);
              this.figurasActuales.push(linea)
              linea.animacionFinalizada = true;
              linea.ngAfterViewInit();
            }  else if (figura[0] === "Elipse") {
              let elipse = new Elipse(puntos, this.canvasEl, this.context, this.animacionEjericioService);
              this.figurasActuales.push(elipse)
              elipse.animacionFinalizada = true;
              elipse.ngAfterViewInit();
            }
          }
          this.primeraVuelta++;
        }
      }
      if (finFrame === true) {
        this.animacionEjericioService.putFramesTerminados(true)
        this.elementos.forEach(element => {
          if (element.frameActual < element.frames.length - 1) {
            this.animacionEjericioService.putFramesTerminados(false)
            element.playAnim = true;
            element.frameActual++
            if (element === this.elementos[0]) {
              if ((this.figurasActuales.length) > 0) {
                for (let figura of this.figurasActuales) {
                  figura.eliminaFigura();
                }
              }
              this.figurasActuales = []
              for (let figura of this.secuenciaFiguras[element.frameActual]) {
                if (this.ejercicioFinalizado && !this.animacionExistente) {
                  figura = JSON.parse(figura)
                }
                let punto1 = new Point(figura[1][0].x, figura[1][0].y)
                let punto2 = new Point(figura[1][1].x, figura[1][1].y)
                let punto3 = new Point(figura[1][2].x, figura[1][2].y)
                let punto4 = new Point(figura[1][3].x, figura[1][3].y)
                let puntos = [punto1, punto2, punto3, punto4]
                puntos.forEach(punto => {
                  punto.x = (punto.x * this.canvasEl.nativeElement.width) / this.medidaOriginal
                  punto.y = (punto.y * this.canvasEl.nativeElement.height) / this.medidaOriginal
                });
                if (figura[0] === "Flecha") {
                  let flecha = new Flecha(puntos, this.canvasEl, this.context, this.animacionEjericioService);
                  this.figurasActuales.push(flecha)
                  flecha.animacionFinalizada = true;
                  flecha.ngAfterViewInit();
                } else if (figura[0] === "Rectangulo") {
                  let rectangulo = new Rectangulo(puntos, this.canvasEl, this.context, this.animacionEjericioService);
                  this.figurasActuales.push(rectangulo)
                  rectangulo.animacionFinalizada = true;
                  rectangulo.ngAfterViewInit();
                }else if (figura[0] === "FlechaDoble") {
                  let flechaDoble = new FlechaDoble(puntos, this.canvasEl, this.context, this.animacionEjericioService);
                  this.figurasActuales.push(flechaDoble)
                  flechaDoble.animacionFinalizada = true;
                  flechaDoble.ngAfterViewInit();
                }else if (figura[0] === "Linea") {
                  let linea = new Linea(puntos, this.canvasEl, this.context, this.animacionEjericioService);
                  this.figurasActuales.push(linea)
                  linea.animacionFinalizada = true;
                  linea.ngAfterViewInit();
                }
                else if (figura[0] === "Elipse") {
                  let elipse = new Elipse(puntos, this.canvasEl, this.context, this.animacionEjericioService);
                  this.figurasActuales.push(elipse)
                  elipse.animacionFinalizada = true;
                  elipse.ngAfterViewInit();
                }
              }
            }
          }
        });
      }
    }
    this.context.clearRect(0, 0, this.canvasEl.nativeElement.width, this.canvasEl.nativeElement.height);

    if (!this.ejercicioIniciado) {
      this.dibujaPapelera();
    }
  }
  }


  addFrame() {
    this.elementos.forEach(elemento => {
      elemento.addMovimiento();
    });
    let figurasFrame = []
    this.lineas.forEach(figura => {
      figurasFrame.push(JSON.stringify(["Linea", figura.points]));
    });
    this.flechas.forEach(figura => {
      figurasFrame.push(JSON.stringify(["Flecha", figura.points]));
    });
    this.rectangulos.forEach(figura => {
      figurasFrame.push(JSON.stringify(["Rectangulo", figura.points]));
    });
    this.flechasDobles.forEach(figura => {
      figurasFrame.push(JSON.stringify(["FlechaDoble", figura.points]));
    });
    this.elipses.forEach(figura => {
      figurasFrame.push(JSON.stringify(["Elipse", figura.points]));
    });
    this.secuenciaFiguras[this.posicionFiguras] = figurasFrame
    this.posicionFiguras++;
    this.lineas.forEach(figura => {
      figura.eliminaFigura()
    });
    this.lineas = [];
    this.flechas.forEach(figura => {
      figura.eliminaFigura()
    });
    this.flechas = [];
    this.flechasDobles.forEach(figura => {
      figura.eliminaFigura()
    });
    this.flechasDobles = [];
    this.rectangulos.forEach(figura => {
      figura.eliminaFigura()
    });
    this.rectangulos = [];
    this.elipses.forEach(figura => {
      figura.eliminaFigura()
    });
    this.elipses = [];

  }

  muestraFrames() {
    this.elementos.forEach(elemento => {
      elemento.muestraFrames();
    });
  }

  dibujaPapelera() {
    let img = new Image();
    img.src = "/assets/buttons/trash.png"
    this.context.beginPath();
    this.context.drawImage(img, (this.canvasEl.nativeElement.width*10)/500, (this.canvasEl.nativeElement.width*15)/500, (this.canvasEl.nativeElement.width*45)/500,(this.canvasEl.nativeElement.width*45)/500)
    this.context.fill();
  }


  async cargaEjercicio(id) {
    let figuras = []
    if (!this.esExplora){

    await this.animacionEjericioService.getAnimacion(id).then((animacionEjercicio:any)=>{ 
      if (animacionEjercicio){
        this.medidaOriginal = animacionEjercicio.canvasWidth
        this.animacionEjercicio = animacionEjercicio
        this.pista = animacionEjercicio.pista;
        this.urlPista = 'url(/assets/pistas/' + animacionEjercicio.pista + ')';
        this.ejercicioFinalizado = true;
        this.ejercicioIniciado = true;
        this.animacionExistente = true;
        for (let i = 0; i < JSON.parse(animacionEjercicio.figuras).length; i++) {
          figuras = []
          for (let figura of JSON.parse(animacionEjercicio.figuras)[i]) {
            figuras.push(JSON.parse(figura))
          }
          this.secuenciaFiguras[i] = figuras
        }

        for (let elemento of JSON.parse(animacionEjercicio.animacion)) {
          let elementoAnimado = new ElementoAnimado(elemento.icono, elemento.puntos, this.canvasEl, this.context, this.animacionEjericioService, this.medidaOriginal)
          let frames: Frame[] = []
          for (let frame of elemento) {
            frames.push(frame)
          }
          this.creaElementoAnimado(elementoAnimado, frames)
        }
      }
    });
  } else {
    await this.animacionEjericioExploraService.getAnimacion(id).then((animacionEjercicio:any)=>{ 
      console.log(animacionEjercicio)
      if (animacionEjercicio){
        this.medidaOriginal = animacionEjercicio.canvasWidth
        this.animacionEjercicio = animacionEjercicio
        this.pista = animacionEjercicio.pista;
        this.urlPista = 'url(/assets/pistas/' + animacionEjercicio.pista + ')';
        this.ejercicioFinalizado = true;
        this.ejercicioIniciado = true;
        this.animacionExistente = true;
        for (let i = 0; i < JSON.parse(animacionEjercicio.figuras).length; i++) {
          figuras = []
          for (let figura of JSON.parse(animacionEjercicio.figuras)[i]) {
            figuras.push(JSON.parse(figura))
          }
          this.secuenciaFiguras[i] = figuras
        }

        for (let elemento of JSON.parse(animacionEjercicio.animacion)) {
          let elementoAnimado = new ElementoAnimado(elemento.icono, elemento.puntos, this.canvasEl, this.context, this.animacionEjericioService, this.medidaOriginal)
          let frames: Frame[] = []
          for (let frame of elemento) {
            frames.push(frame)
          }
          this.creaElementoAnimado(elementoAnimado, frames)
        }
      }
    });
  }
    
  }


  async eliminaAnimacion() {
    const alert = await this.alertController.create({
    
      header: 'Eliminar animación',
      message: '¿Estás seguro? Se eliminará la animación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
     
          handler: (blah) => {
           
          }
        }, {
          text: 'Eliminar',
          handler: async () => {
            const animacionEliminada = await this.animacionEjericioService.deleteAnimacion(this.animacionEjercicio.id);
            if (animacionEliminada){
              this.uiService.alertaInformativa('La animación ha sido eliminada');
              this.goToEjercicio();
              
            } else {
              this.uiService.alertaInformativa('Error al eliminar la animación')
              
            }
          }
        }
      ]
    });
  
    await alert.present();
  
  }
  
  
  creaLinea() {
    let p1 = new Point(this.posicionXinicial+30, (this.posicionYOriginal * this.canvasEl.nativeElement.width) / 500);
    let p2 = new Point(p1.x + 10, p1.y + 10);
    let p3 = new Point(p1.x + 30, p1.y + 30);
    let p4 = new Point(p1.x + 40, p1.y + 40);
    let points: Point[] = [p1, p2, p3, p4];
    let forma = new Linea(points, this.canvasEl, this.context, this.animacionEjericioService)
    this.lineas.push(forma)

    forma.ngAfterViewInit();
  }
  creaFlecha() {
    let p1 = new Point(this.posicionXinicial+30, (this.posicionYOriginal * this.canvasEl.nativeElement.width) / 500);
    let p2 = new Point(p1.x + 10, p1.y + 10);
    let p3 = new Point(p1.x + 30, p1.y + 30);
    let p4 = new Point(p1.x + 40, p1.y + 40);
    let points: Point[] = [p1, p2, p3, p4];
    let forma = new Flecha(points, this.canvasEl, this.context, this.animacionEjericioService)
    this.flechas.push(forma)

    forma.ngAfterViewInit();
  }

  creaFlechaDoble() {
    let p1 = new Point(this.posicionXinicial+30, (this.posicionYOriginal * this.canvasEl.nativeElement.width) / 500);
    let p2 = new Point(p1.x + 10, p1.y + 10);
    let p3 = new Point(p1.x + 30, p1.y + 30);
    let p4 = new Point(p1.x + 40, p1.y + 40);
    let points: Point[] = [p1, p2, p3, p4];
    let forma = new FlechaDoble(points, this.canvasEl, this.context, this.animacionEjericioService)
    this.flechasDobles.push(forma)

    forma.ngAfterViewInit();
  }

  creaRectangulo() {
    let p1 = new Point(this.posicionXinicial+30, (this.posicionYOriginal * this.canvasEl.nativeElement.width) / 500);
    let p2 = new Point(p1.x + 10, p1.y + 10);
    let p3 = new Point(p1.x + 30, p1.y + 30);
    let p4 = new Point(p1.x + 40, p1.y + 40);
    let points: Point[] = [p1, p2, p3, p4];
    let forma = new Rectangulo(points, this.canvasEl, this.context, this.animacionEjericioService)
    this.rectangulos.push(forma);
    forma.ngAfterViewInit();
  }

  creaElipse() {
    let p1 = new Point(this.posicionXinicial+30, (this.posicionYOriginal * this.canvasEl.nativeElement.width) / 500);
    let p2 = new Point(this.posicionXinicial+60, p1.y);
    let p3 =new Point(p1.x, ( (this.posicionYOriginal * this.canvasEl.nativeElement.width) / 500)+30);
    let p4 = new Point(this.posicionXinicial, ( (this.posicionYOriginal * this.canvasEl.nativeElement.width) / 500)+56);
    let points: Point[] = [p1, p2, p3, p4];
    let forma = new Elipse(points, this.canvasEl, this.context, this.animacionEjericioService)
     this.elipses.push(forma);
    forma.ngAfterViewInit();
  }
  creaElementoAnimado(elemento: ElementoAnimado, frames: Frame[]) {
    elemento.putFrames(frames)
    this.elementos.push(elemento);
    elemento.ngAfterViewInit()
  }

  creaElemento(urlElemento: string) {
    let icono = new Icono(this.posicionXinicial+30, (this.posicionYOriginal * this.canvasEl.nativeElement.width) / 500, 0.1, 0, urlElemento);
    let p1 = new Point(icono.x, icono.y);
    let p2 = new Point(icono.x, icono.y);
    let p3 = new Point(icono.x, icono.y);
    let p4 = new Point(icono.x, icono.y);
    let points: Point[] = [p1, p2, p3, p4];
    let elemento = new ElementoAnimado(icono, points, this.canvasEl, this.context, this.animacionEjericioService, this.medidaOriginal)
    this.elementos.push(elemento);
    elemento.ngAfterViewInit()
    //Colocamos los elementos en fila, uno tras otro
    if (this.elementos.length < 22) {
      this.posicionXinicial = this.posicionXinicial + (50 * this.canvasEl.nativeElement.width) / 500
    }
    if (this.elementos.length > 7 && this.segundaLineaElementos === false) {
      this.segundaLineaElementos = true;
      this.posicionYOriginal = this.posicionYOriginal - 50;
      this.posicionXinicial = this.posicionXOriginal;
    }
    if (this.elementos.length > 15 && this.terceraLineaElementos === false) {
      this.terceraLineaElementos = true;
      this.posicionYOriginal = this.posicionYOriginal - 50;
      this.posicionXinicial = this.posicionXOriginal;
    }
    if (this.elementos.length > 22) {

      this.posicionYOriginal = this.posicionYOriginal + 100;
      this.posicionXinicial = this.posicionXOriginal;
    }
  }


  comienzaSecuencia() {
    this.elementos.forEach((elemento, index) => {
      if (elemento.eliminarElemento) {
        this.elementos.splice(index, 1)
      }

    });
    this.elementos.forEach(elemento => {
      elemento.comienzaSecuencia = true;
    });
    this.ejercicioIniciado = true;
  }

  terminaEjercicio() {
    this.elementos.forEach(elemento => {
      elemento.guardaSecuencia()
    });
    this.ejercicioFinalizado = true;
    this.playAnimacion();
  }

  repiteAnimacion() {
    this.elementos.forEach(elemento => {
      elemento.eliminaSecuencia()
    });
    this.ejercicioIniciado = false;
    this.ejercicioFinalizado = false;
  }

  playAnimacion() {
    this.elementos.forEach(elemento => {
      elemento.play();

    });
  }

    toggleAccordion(): void {
    this.isListItemOpened = !this.isListItemOpened;
  }
  toggleAccordion2(): void {
    this.isListItemOpened2 = !this.isListItemOpened2;
  }
  toggleAccordion3(): void {
    this.isListItemOpened3 = !this.isListItemOpened3;
  }
  
  async guardaEjercicio() {

    this.elementos.forEach(elemento => {
      this.secuencia.push(elemento.getFrames())
    });

    let animacion: AnimacionEjercicio={
      id_ejercicio:this.ejercicioId,
      animacion:JSON.stringify(this.secuencia),
      figuras: JSON.stringify(this.secuenciaFiguras),
      pista: this.pista,
      canvasWidth: this.canvasEl.nativeElement.width,
      canvasHeight:  this.canvasEl.nativeElement.height
    }
    const animacionCreada = await this.animacionEjericioService.postAnimacion(animacion);
    if (animacionCreada){
      this.uiService.alertaInformativa('La animación ha sido creada');
      this.animacionEjercicio = animacion;
      this.animacionExistente = true;
      this.goToEjercicio();
      
    } else {
      this.uiService.alertaInformativa('Error al crear el alumno')
      
    }
   
  }


}
