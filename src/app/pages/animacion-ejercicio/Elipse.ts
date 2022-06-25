import { ElementRef, AfterViewInit, OnInit, OnDestroy, Component, Inject } from '@angular/core';
import { Icono } from './Icono';
import { Point } from './Point';
import { Frame } from './Frame';

import { AnimacionEjercicioService } from 'src/app/services/animacion-ejercicio.service';
import { AnimacionEjercicioExploraService } from 'src/app/services/animacion-ejercicio-explora.service';
@Component({
  template: ''
})
export class Elipse implements AfterViewInit, OnInit, OnDestroy {
  mousePos = null;
  slider: any;
  sliderTxt: any
  playAnim = false;
  playBtn: any;
  posRadius = 4;
  pointToMove = null;
  isClickDown = false;
  puntosIniciales: Point[];
  puntoIntermedio:Point;
  iconoInicial: Icono;
  comienzaSecuencia = false;
  animacionFinalizada = false;
  animacionExistente = false;
  eliminarElemento = false;
  elementoSeleccionado = false;
  terminaFrame = true;
  medidaOriginal = 500;
  frames: Frame[] = [];
  framesOriginales: Frame[] = [];
  secuencia: any[] = [];
  widthIcono = 45;
  heigthIcono = 45;
  frameActual=0;
  colorPuntos="";
  colorPuntoMedio="";

  constructor(@Inject(Point)public points: Point[], public canvasEl: ElementRef<HTMLCanvasElement>, public context: CanvasRenderingContext2D,
  @Inject(Point)public animacionEjercicioService: AnimacionEjercicioService | AnimacionEjercicioExploraService) {
    this.puntosIniciales = this.clone(this.points)
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');
  }


  ngOnInit() {
  }

  ngOnDestroy(){
    console.log("Adios")
  }

  ngAfterViewInit() {
    //Si hay frames guardados, estamos reproduciendo un ejercicio
    //Primero ajustamos el tamaño del ejercicio al de la pantalla en el que se esté reproduciendo

    this.colorPuntos=this.getRandomColor();
    this.colorPuntoMedio=this.getRandomColor();
    this.slider = document.getElementById("slider");
    this.sliderTxt = document.getElementById("slider-text");
    this.playBtn = document.getElementById("play-btn");
   
    this.calculaPuntosIntermedios();
    this.animate();

    this.canvasEl.nativeElement.addEventListener("mousemove", e => {
      var rect = this.canvasEl.nativeElement.getBoundingClientRect();
      this.mousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    })

    this.canvasEl.nativeElement.addEventListener("touchmove", e => {

      e.preventDefault()
      var rect = this.canvasEl.nativeElement.getBoundingClientRect();
      this.mousePos = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    })

    this.canvasEl.nativeElement.addEventListener("mousedown", e=> {
      e.preventDefault()
      this.isClickDown = true;
    });


    this.canvasEl.nativeElement.addEventListener("touchstart", e => {
      e.preventDefault()
      this.isClickDown = true;
    });

    this.canvasEl.nativeElement.addEventListener("mouseup", () => {
      this.animacionEjercicioService.moviendoAnimacionFalse();
      this.elementoSeleccionado = false;
      //Main on click down. Used for simple detection
      this.isClickDown = false;
      //Not moving that point any more
      this.pointToMove = null;
    });

    this.canvasEl.nativeElement.addEventListener("touchend", () => {
      this.mousePos = {
        x: 0,
        y: 0
      };
      this.animacionEjercicioService.moviendoAnimacionFalse();
      this.elementoSeleccionado = false;
      //Main on click down. Used for simple detection
      this.isClickDown = false;
      //Not moving that point any more
      this.pointToMove = null;
    });
  }

  play() {
    this.frameActual=0;
    this.playAnim = true;
  }
  guardaSecuencia() {
    this.framesOriginales = this.clone(this.frames)
    this.animacionFinalizada = true;
  }
  getFrames(): Frame[] {
    return this.framesOriginales;
  }
  

  eliminaFigura(){
    this.eliminarElemento = true;
    this.points[0].x = 2000
    this.points[1].x = 2000
    this.points[2].x = 2000
    this.points[3].x = 2000
    this.puntoIntermedio.x =2000

    this.points[0].y = 2000
    this.points[1].y = 2000
    this.points[2].y = 2000
    this.points[3].y = 2000
    this.puntoIntermedio.y = 2000

  }

  clone(source) {
    var result = source, i, len;
    if (!source
      || source instanceof Number
      || source instanceof String
      || source instanceof Boolean) {
      return result;
    } else if (Object.prototype.toString.call(source).slice(8, -1) === 'Array') {
      result = [];
      var resultLen = 0;
      for (i = 0, len = source.length; i < len; i++) {
        result[resultLen++] = this.clone(source[i]);
      }
    } else if (typeof source == 'object') {
      result = {};
      for (i in source) {
        if (source.hasOwnProperty(i)) {
          result[i] = this.clone(source[i]);
        }
      }
    }
    return result;
  };


  sleep(ms = 0) {
    return new Promise((r) => setTimeout(r, ms));
  }



  getRandomColor() {
    var length = 6;
    var chars = '0123456789ABCDEF';
    var hex = '#';
    while(length--) hex += chars[(Math.random() * 16) | 0];
    return hex;
  }
  //Actually render the points to the canvas
  drawPoints() {

    for (let i = 0; i < this.points.length; i++) {
     if (i===1 || i ===2){
        this.context.fillStyle = this.colorPuntos;
        this.context.beginPath();
        this.context.arc(this.points[i].x, this.points[i].y, this.posRadius, 0, Math.PI * 2, false);
        this.context.fill();
        //Deal with text
        this.context.font = "11px Arial";
      }
    }



    this.context.fillStyle = this.colorPuntoMedio;
    this.context.beginPath();
    this.context.arc(this.puntoIntermedio.x, this.puntoIntermedio.y, this.posRadius*1.5, 0, Math.PI * 2, false);
    this.context.fill();
    //Deal with text
    this.context.font = "11px Arial";
  }



  isMouseOverPoint(point: Point) {
    let dx = this.mousePos.x - point.x;
    let dy = this.mousePos.y - point.y;
    return (dx * dx + dy * dy < this.posRadius * this.posRadius);
  }

  checkIfCursorInPoint() {
    if (this.mousePos && this.isClickDown && !this.pointToMove) {
      this.points.forEach(point => {
        if (this.isMouseOverPoint(point)) {
          this.pointToMove = point;
          if (!this.animacionEjercicioService.getMoviendoAnimacion()) {
            this.animacionEjercicioService.moviendoAnimacionTrue();
            this.elementoSeleccionado = true;
          }
        }
      })
      if (this.isMouseOverPoint(this.puntoIntermedio)){
        this.pointToMove = this.puntoIntermedio;
        if (!this.animacionEjercicioService.getMoviendoAnimacion()) {
          this.animacionEjercicioService.moviendoAnimacionTrue();
          this.elementoSeleccionado = true;
        }
      }
    }
  }

  movePoint() {
    if (this.elementoSeleccionado) {
      if (this.pointToMove === this.puntoIntermedio){
    
        let xInicio = this.puntoIntermedio.x;
        let yInicio = this.puntoIntermedio.y;
        let radioX= Math.abs(this.points[1].x - this.puntoIntermedio.x);
        let radioY = Math.abs(this.points[2].y - this.puntoIntermedio.y);
        this.puntoIntermedio.x = this.mousePos.x;
        this.puntoIntermedio.y = this.mousePos.y;
        let xFinal = this.mousePos.x;
        let yFinal = this.mousePos.y;

        this.points[1].x= this.puntoIntermedio.x+radioX;
        this.points[1].y= this.puntoIntermedio.y 
        this.points[2].x= this.puntoIntermedio.x
        this.points[2].y= this.puntoIntermedio.y+radioY;


        if (this.puntoIntermedio.x > 5 && this.puntoIntermedio.x < 60) {
          if (this.puntoIntermedio.y > 6 && this.puntoIntermedio.y < 50) {
            if (!this.comienzaSecuencia) {
              this.eliminarElemento = true;
              this.points[0].x = 2000
              this.points[1].x = 2000
              this.points[2].x = 2000
              this.points[3].x = 2000
              this.mousePos.x = 2000
              this.points[0].y = 2000
              this.points[1].y = 2000
              this.points[2].y = 2000
              this.points[3].y = 2000
              this.mousePos.y = 2000
            }
          }
        }
      }

      else {
 
       

        let pointIndex = this.points.indexOf(this.pointToMove);
        if (pointIndex ===2){
          this.points[pointIndex].y = this.mousePos.y;

        }
        if (pointIndex === 1){
        this.points[pointIndex].x = this.mousePos.x;
        }
  
      

        if (this.points[0].x > 5 && this.points[0].x < 60) {
            if (this.points[0].y > 6 && this.points[0].y < 50) {
              if (!this.comienzaSecuencia) {
                this.eliminarElemento = true;
                this.points[0].x = 2000
                this.points[1].x = 2000
                this.points[2].x = 2000
                this.points[3].x = 2000
                this.mousePos.x = 2000
                this.points[0].y = 2000
                this.points[1].y = 2000
                this.points[2].y = 2000
                this.points[3].y = 2000
                this.mousePos.y = 2000
              }
            }
          }
          
        if (this.points[3].x > 5 && this.points[3].x < 60) {
            if (this.points[3].y > 6 && this.points[3].y < 50) {
              if (!this.comienzaSecuencia) {
                this.eliminarElemento = true;
                this.points[0].x = 2000
                this.points[1].x = 2000
                this.points[2].x = 2000
                this.points[3].x = 2000
                this.mousePos.x = 2000
                this.points[0].y = 2000
                this.points[1].y = 2000
                this.points[2].y = 2000
                this.points[3].y = 2000
                this.mousePos.y = 2000
              }
            }
          }
        } 
    }
  }

  calculaPuntosIntermedios(){

  
    this.puntoIntermedio = this.points[0]
    

  }

  drawLine() {
/*
  let centerX = this.puntoIntermedio.x;
  let centerY = this.puntoIntermedio.y;
  let distanciaX = this.points[1].x - this.puntoIntermedio.x;
  let distanciaY = this.points[2].y - this.puntoIntermedio.y;
   this.context.beginPath();
    for (var i = 0 * Math.PI; i < 2 * Math.PI; i += 0.01 ) {
       let xPos = centerX - (distanciaY * Math.sin(i)) * Math.sin(0 * Math.PI) + (distanciaX * Math.cos(i)) * Math.cos(0 * Math.PI);
        let yPos = centerY + (distanciaX * Math.cos(i)) * Math.sin(0 * Math.PI) + (distanciaY * Math.sin(i)) * Math.cos(0 * Math.PI);
    
        if (i == 0) {
            this.context.moveTo(xPos, yPos);
        } else {
            this.context.lineTo(xPos, yPos);
        }
    }
    this.context.fillStyle = "#e7ff0b81";
    this.context.fill();
    this.context.closePath();
    */
   let radioX= Math.abs(this.points[1].x - this.puntoIntermedio.x);
   let radioY = Math.abs(this.points[2].y - this.puntoIntermedio.y);

    this.context.beginPath();
        this.context.ellipse(this.puntoIntermedio.x, this.puntoIntermedio.y, radioX, radioY, 0, 0, 2 * Math.PI);
        this.context.fillStyle = "#e7ff0b81";
        this.context.fill();
        this.context.closePath();
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
   
    if (!this.animacionFinalizada) this.checkIfCursorInPoint();
    if (this.pointToMove) this.movePoint();
    this.drawLine();
    //Points will be above everything else
    if (!this.animacionFinalizada) this.drawPoints();
   

  }

}
