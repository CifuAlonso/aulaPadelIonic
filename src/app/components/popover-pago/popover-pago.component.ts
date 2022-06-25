import { Component, OnInit } from '@angular/core';
import { Pago } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-popover-pago',
  templateUrl: './popover-pago.component.html',
  styleUrls: ['./popover-pago.component.scss'],
})
export class PopoverPagoComponent implements OnInit {
  pago:Pago

  constructor() { }

  ngOnInit() {}

}
