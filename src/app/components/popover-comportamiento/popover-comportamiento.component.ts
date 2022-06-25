import { Component, OnInit } from '@angular/core';
import { Comportamiento } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-popover-comportamiento',
  templateUrl: './popover-comportamiento.component.html',
  styleUrls: ['./popover-comportamiento.component.scss'],
})
export class PopoverComportamientoComponent implements OnInit {

  comportamiento: Comportamiento
  constructor() { }

  ngOnInit() {}

}
