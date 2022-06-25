import { Component, OnInit } from '@angular/core';
import { Falta } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-popover-ausencia',
  templateUrl: './popover-ausencia.component.html',
  styleUrls: ['./popover-ausencia.component.scss'],
})
export class PopoverAusenciaComponent implements OnInit {
  ausencia:Falta;
  constructor() { }

  ngOnInit() {}

}
