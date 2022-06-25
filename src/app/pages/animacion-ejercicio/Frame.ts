import { Icono } from './Icono';
import { Point } from './Point';
export class Frame{
        icono:Icono;
        puntos:Point[];
  
    constructor(icono:Icono, puntos:Point[]){
        this.icono=icono
        this.puntos=puntos
    }
}