import { ElementRef, AfterViewInit, OnInit, Component, Injectable, Inject } from '@angular/core';
import { Icono } from './Icono';
import { Point } from './Point';
import { Frame } from './Frame';

import { AnimacionEjercicioService } from 'src/app/services/animacion-ejercicio.service';
import { AnimacionEjercicioExploraService } from '../../services/animacion-ejercicio-explora.service';
@Injectable()
export class ElementoAnimado implements AfterViewInit, OnInit {
  mousePos = null;
  slider: any;
  sliderTxt: any
  playAnim = false;
  playBtn: any;
  posRadius = 7;
  pointToMove = null;
  isClickDown = false;
  puntosIniciales: Point[];
  iconoInicial: Icono;
  comienzaSecuencia = false;
  animacionFinalizada = false;
  animacionExistente = false;
  eliminarElemento = false;
  elementoSeleccionado = false;
  terminaFrame = false;

  frames: Frame[] = [];
  framesOriginales: Frame[] = [];
  secuencia: any[] = [];
  widthIcono = 55;
  heigthIcono = 55;
  frameActual=0;
  colorPuntos="";
  velocidad=0.01;

  constructor(@Inject(Point)public icono: Icono, @Inject(Point)public points: Point[], public canvasEl: ElementRef<HTMLCanvasElement>, public context: CanvasRenderingContext2D,
  @Inject(Point)public animacionEjercicioService: AnimacionEjercicioService | AnimacionEjercicioExploraService, @Inject(Point)public medidaOriginal:number) {
    this.puntosIniciales = this.clone(this.points)
    this.iconoInicial = this.clone(this.icono)
  }


  ngOnInit() {
  
  }

  ngAfterViewInit() {

    this.widthIcono= (this.canvasEl.nativeElement.width*55)/500
    this.heigthIcono = this.widthIcono

    //Si hay frames guardados, estamos reproduciendo un ejercicio
    //Primero ajustamos el tamaño del ejercicio al de la pantalla en el que se esté reproduciendo
    if (this.frames.length > 0) {
      
      this.widthIcono = (this.canvasEl.nativeElement.width*55)/500
      this.heigthIcono = (this.canvasEl.nativeElement.width*55)/500
      console.log(this.widthIcono)
      this.animacionExistente = true;
      this.frames.forEach(frame => {
        frame.icono.x = (frame.icono.x * this.canvasEl.nativeElement.width) / this.medidaOriginal
        frame.icono.y = (frame.icono.y * this.canvasEl.nativeElement.width) / this.medidaOriginal
        frame.puntos.forEach(punto => {
          punto.x = (punto.x * this.canvasEl.nativeElement.width) / this.medidaOriginal
          punto.y = (punto.y * this.canvasEl.nativeElement.height) / this.medidaOriginal
        });
      });
    }
    this.colorPuntos=this.getRandomColor();
    this.slider = document.getElementById("slider");
    this.sliderTxt = document.getElementById("slider-text");
    this.playBtn = document.getElementById("play-btn");
    this.sliderTxt.textContent = this.slider.value;
    this.velocidad=this.slider.value/100
    this.slider.oninput = () => {
      this.sliderTxt.textContent = this.slider.value;
      this.parseSliderValue(this.slider.value);
      this.velocidad=this.slider.value/100
  
    }
    this.animate();
    this.parseSliderValue(this.slider.value);

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

  addMovimiento() {
    let icono = this.icono;
    let puntos = this.points;
    let frame = this.clone(new Frame(icono, puntos))
    this.frames.push(frame)
    this.icono.x = this.points[3].x;
    this.icono.y = this.points[3].y;
    this.points[0].x = this.points[3].x;
    this.points[0].y = this.points[3].y;
    this.points[1].x = (this.points[3].x)
    this.points[1].y = (this.points[3].y)
    this.points[2].x = (this.points[3].x)
    this.points[2].y = (this.points[3].y)
    this.points[3].x = (this.points[3].x)
    this.points[3].y = (this.points[3].y)

  }

  muestraFrames() {
    console.log(this.frames);
    //console.log(this.frames[0].icono)
  }

  getFrames(): Frame[] {
    return this.framesOriginales;
  }

  public putFrames(frames: Frame[]) {
    this.frames = frames;
    this.framesOriginales = this.clone(frames)
    this.animacionFinalizada = true;
    this.play()
  }

  guardaSecuencia() {
    this.framesOriginales = this.clone(this.frames)
    this.animacionFinalizada = true;
  }

  eliminaSecuencia() {
    this.framesOriginales = [];
    this.frames = []
    this.animacionFinalizada = false;
    this.playAnim = false;
    this.points = this.puntosIniciales
    this.icono = this.iconoInicial
    this.comienzaSecuencia = false;
  }

  sleep(ms = 0) {
    return new Promise((r) => setTimeout(r, ms));
  }

  //Muestra la velocidad
  parseSliderValue(sliderValue) {
    let tPercentage = sliderValue / 10;
    //0.1 because that is the default speed of the icono
    tPercentage = tPercentage * 0.1;
    this.icono.speed = tPercentage;
  }

  playBtnText() {
    if (this.icono.x === this.points[3].x && this.icono.y === this.points[3].y) {
      this.playBtn.textContent = "Repetir";
      // this.slider.disabled = false;
    }
  }

  dibujaIcono() {
    let img = new Image();
    img.src = this.icono.imagen;
    
    this.context.beginPath();
    this.context.drawImage(img, this.icono.x, this.icono.y, this.widthIcono, this.heigthIcono)
    this.context.fill();
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
      if (i === 0 || i === 3) {
        let img = new Image();
        img.src = this.icono.imagen;
        this.context.beginPath();
        this.context.drawImage(img, this.points[i].x, this.points[i].y, this.widthIcono, this.heigthIcono)
        this.context.fill();
        // this.context.fillText(`(${this.points[i].x},${this.points[i].y})`,this.points[i].x,this.points[i].y+30);
        this.context.closePath();
      }
      this.context.fillStyle = this.colorPuntos;
      this.context.beginPath();
      this.context.arc(this.points[i].x, this.points[i].y, this.posRadius, 0, Math.PI * 2, false);
      this.context.fill();
      //Deal with text
      this.context.font = "11px Arial";
    }
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
    }
  }

  movePoint() {
    if (this.elementoSeleccionado) {
      if (this.comienzaSecuencia === true) {
        if (this.pointToMove === this.points[0]) {
          this.points[0].x = this.mousePos.x;
          this.points[0].y = this.mousePos.y;
          this.icono.x = this.mousePos.x;
          this.icono.y = this.mousePos.y;
          return
        }
        if (this.pointToMove === this.points[3]) {
          let xMedia = (this.points[3].x + this.points[0].x) / 2
          let yMedia = (this.points[3].y + this.points[0].y) / 2
          let xCuarto = (this.points[0].x + xMedia) / 2;
          let yCuarto = (this.points[0].y + yMedia) / 2;
          let xtresCuartos = (this.points[3].x + xMedia) / 2;
          let ytresCuartos = (this.points[3].y + yMedia) / 2;
          this.points[2].x = xtresCuartos
          this.points[2].y = ytresCuartos
          this.points[1].x = xCuarto
          this.points[1].y = yCuarto
        }
        let pointIndex = this.points.indexOf(this.pointToMove);
        this.points[pointIndex].x = this.mousePos.x;
        this.points[pointIndex].y = this.mousePos.y;
      } else {
        this.points.forEach(point => {
          point.x = this.mousePos.x;
          point.y = this.mousePos.y;
        });
        this.icono.x = this.mousePos.x;
        this.icono.y = this.mousePos.y;
        //Aquí es donde se encuentra la papelera
        //IMPORTANTE, ESTOS SON LOS VALORES DE LA PAPELERA EN 500x500, HAY QUE AJUSTAR EL 60 y 50 PARA OTROS TAMAÑOS!!!
        if (this.icono.x > (this.canvasEl.nativeElement.width*5)/500 && this.icono.x < (this.canvasEl.nativeElement.width*100)/500) {
          if (this.icono.y > (this.canvasEl.nativeElement.width*6)/500 && this.icono.y < (this.canvasEl.nativeElement.width*100)/500) {
            if (!this.comienzaSecuencia) {
              this.eliminarElemento = true;
              this.icono.x = 2000
              this.mousePos.x = 2000
              this.icono.y = 2000
              this.mousePos.y = 2000
            }
          }
        }
        return
      }
    }
  }

  drawLine() {
    this.context.beginPath();
    this.context.setLineDash([1, 1]);
    this.context.moveTo(this.points[0].x, this.points[0].y);
    this.context.bezierCurveTo(this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y, this.points[3].x, this.points[3].y);
    this.context.stroke();
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    if (!this.playAnim) {
      this.dibujaIcono();
    } else {
      //this.ejecutaAnimacion2(this.frames, 0)
      this.ejecutaFrame(this.frames[this.frameActual])
    }
    if (!this.animacionFinalizada) this.checkIfCursorInPoint();
    if (this.pointToMove) this.movePoint();
    if (!this.animacionFinalizada) this.drawLine();
    //Points will be above everything else
    if (!this.animacionFinalizada) this.drawPoints();

  }

  async ejecutaAnimacion(frames: any, posicion) {
    let frame = frames[posicion]
    this.points = frame.puntos;
    this.icono = frame.icono
    this.icono.speed = 0.01;
    let [p0, p1, p2, p3] = this.points;

    //Calculate the coefficients based on where the icono currently is in the animation
    let cx = 3 * (p1.x - p0.x);
    let bx = 3 * (p2.x - p1.x) - cx;
    let ax = p3.x - p0.x - cx - bx;

    let cy = 3 * (p1.y - p0.y);
    let by = 3 * (p2.y - p1.y) - cy;
    let ay = p3.y - p0.y - cy - by;

    let t = this.icono.t;

    //Increment t value by speed
    this.icono.t += this.icono.speed;

    //Calculate new X & Y positions of icono
    let xt = ax * (t * t * t) + bx * (t * t) + cx * t + p0.x;
    let yt = ay * (t * t * t) + by * (t * t) + cy * t + p0.y;

    if (this.icono.t > 1) {
      this.icono.t = 1;
    }

    //We draw the icono to the canvas in the new location
    this.icono.x = xt;
    this.icono.y = yt;
    this.dibujaIcono();

    if (Math.round(this.icono.x) === Math.round(frame.puntos[3].x) && Math.round(this.icono.y) === Math.round(frame.puntos[3].y)) {
      posicion++;
      if (posicion < frames.length) {
        this.context.clearRect(this.icono.x, this.icono.y, this.widthIcono, this.heigthIcono)
        this.ejecutaAnimacion(frames, posicion)
      } else {
        await this.sleep(500)
        this.context.clearRect(this.icono.x, this.icono.y, this.widthIcono, this.heigthIcono)
        this.frames = this.clone(this.framesOriginales);
        this.frames.forEach(frame => {
          frame.icono.x = (frame.icono.x * this.canvasEl.nativeElement.width) / this.medidaOriginal
          frame.icono.y = (frame.icono.y * this.canvasEl.nativeElement.width) / this.medidaOriginal
          frame.puntos.forEach(punto => {
            punto.x = (punto.x * this.canvasEl.nativeElement.width) / this.medidaOriginal
            punto.y = (punto.y * this.canvasEl.nativeElement.height) / this.medidaOriginal
          });
        });
        this.icono.x = this.frames[0].puntos[0].x
        this.icono.y = this.frames[0].puntos[0].y
        this.icono.t = 0;
        this.playAnim = false;

      }
    }
  }


  async ejecutaAnimacion2(frames: any, posicion) {

    this.terminaFrame = false;

    let frame = frames[posicion]
    this.points = frame.puntos;
    this.icono = frame.icono
    this.icono.speed = 0.01;
    let [p0, p1, p2, p3] = this.points;

    //Calculate the coefficients based on where the icono currently is in the animation
    let cx = 3 * (p1.x - p0.x);
    let bx = 3 * (p2.x - p1.x) - cx;
    let ax = p3.x - p0.x - cx - bx;

    let cy = 3 * (p1.y - p0.y);
    let by = 3 * (p2.y - p1.y) - cy;
    let ay = p3.y - p0.y - cy - by;

    let t = this.icono.t;

    //Increment t value by speed
    this.icono.t += this.icono.speed;

    //Calculate new X & Y positions of icono
    let xt = ax * (t * t * t) + bx * (t * t) + cx * t + p0.x;
    let yt = ay * (t * t * t) + by * (t * t) + cy * t + p0.y;

    if (this.icono.t > 1) {
      this.icono.t = 1;
    }

    //We draw the icono to the canvas in the new location
    this.icono.x = xt;
    this.icono.y = yt;
    this.dibujaIcono();

    if (Math.round(this.icono.x) === Math.round(frame.puntos[3].x) && Math.round(this.icono.y) === Math.round(frame.puntos[3].y)) {
      posicion++;
      this.terminaFrame = true;
    

      if (posicion < frames.length) {
        if (this.animacionEjercicioService.getFramesTerminados()===true){
          this.context.clearRect(this.icono.x, this.icono.y, this.widthIcono, this.heigthIcono)
        this.ejecutaAnimacion2(frames, posicion)
        this.animacionEjercicioService.putFramesTerminados(false)
        } 
      } else {
        
        await this.sleep(500)
        this.context.clearRect(this.icono.x, this.icono.y, this.widthIcono, this.heigthIcono)
        this.frames = this.clone(this.framesOriginales);
        this.frames.forEach(frame => {
          frame.icono.x = (frame.icono.x * this.canvasEl.nativeElement.width) / this.medidaOriginal
          frame.icono.y = (frame.icono.y * this.canvasEl.nativeElement.width) / this.medidaOriginal
          frame.puntos.forEach(punto => {
            punto.x = (punto.x * this.canvasEl.nativeElement.width) / this.medidaOriginal
            punto.y = (punto.y * this.canvasEl.nativeElement.height) / this.medidaOriginal
          });
        });
        this.icono.x = this.frames[0].puntos[0].x
        this.icono.y = this.frames[0].puntos[0].y
        this.icono.t = 0;
        this.playAnim = false;
        
      }
    }
  }

  async ejecutaFrame(frame) {
    this.terminaFrame=false;
    this.points = frame.puntos;
    this.icono = frame.icono
    this.icono.speed = this.velocidad;
    let [p0, p1, p2, p3] = this.points;

    //Calculate the coefficients based on where the icono currently is in the animation
    let cx = 3 * (p1.x - p0.x);
    let bx = 3 * (p2.x - p1.x) - cx;
    let ax = p3.x - p0.x - cx - bx;

    let cy = 3 * (p1.y - p0.y);
    let by = 3 * (p2.y - p1.y) - cy;
    let ay = p3.y - p0.y - cy - by;

    let t = this.icono.t;

    //Increment t value by speed
    this.icono.t += this.icono.speed;

    //Calculate new X & Y positions of icono
    let xt = ax * (t * t * t) + bx * (t * t) + cx * t + p0.x;
    let yt = ay * (t * t * t) + by * (t * t) + cy * t + p0.y;

    if (this.icono.t > 1) {
      this.icono.t = 1;
    }

    //We draw the icono to the canvas in the new location
    this.icono.x = xt;
    this.icono.y = yt;
    this.dibujaIcono();

    if (Math.round(this.icono.x) === Math.round(frame.puntos[3].x) && Math.round(this.icono.y) === Math.round(frame.puntos[3].y)) {
      this.terminaFrame = true;
      if (this.animacionEjercicioService.getFramesTerminados()===true){
      this.context.clearRect(this.icono.x, this.icono.y, this.widthIcono, this.heigthIcono)
      this.playAnim = false;
      if (this.frameActual === this.frames.length-1){
        await this.sleep(500)
        this.context.clearRect(this.icono.x, this.icono.y, this.widthIcono, this.heigthIcono)
        this.frames = this.clone(this.framesOriginales);
        this.frames.forEach(frame => {
          frame.icono.x = (frame.icono.x * this.canvasEl.nativeElement.width) / this.medidaOriginal
          frame.icono.y = (frame.icono.y * this.canvasEl.nativeElement.width) / this.medidaOriginal
          frame.puntos.forEach(punto => {
            punto.x = (punto.x * this.canvasEl.nativeElement.width) / this.medidaOriginal
            punto.y = (punto.y * this.canvasEl.nativeElement.height) / this.medidaOriginal
          });
        });
        this.icono.x = this.frames[0].puntos[0].x
        this.icono.y = this.frames[0].puntos[0].y
        this.icono.t = 0;
        this.playAnim = false;
        this.frameActual = -1;
      }
      }  
    }
  }
}
