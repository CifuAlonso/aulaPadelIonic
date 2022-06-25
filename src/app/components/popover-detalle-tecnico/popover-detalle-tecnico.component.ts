import { Component, OnInit } from '@angular/core';
import { DetalleTecnico } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-popover-detalle-tecnico',
  templateUrl: './popover-detalle-tecnico.component.html',
  styleUrls: ['./popover-detalle-tecnico.component.scss'],
})
export class PopoverDetalleTecnicoComponent implements OnInit {
  detalle: DetalleTecnico;
  constructor() { }

  ngOnInit() {
  
  }

}
