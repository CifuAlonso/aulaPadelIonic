import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-menu-alumno',
  templateUrl: './popover-menu-alumno.component.html',
  styleUrls: ['./popover-menu-alumno.component.scss'],
})
export class PopoverMenuAlumnoComponent implements OnInit {

  constructor( private navCtrl:NavController, private popoverController:PopoverController) { }

  ngOnInit() {}

 async  goToEditaAlumno(){
    
    this.navCtrl.navigateRoot( 'main/tabs/modifica-alumno', { animated:true})
    await this.popoverController.dismiss();
  }


}
