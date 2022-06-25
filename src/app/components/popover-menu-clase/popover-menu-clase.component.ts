import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-menu-clase',
  templateUrl: './popover-menu-clase.component.html',
  styleUrls: ['./popover-menu-clase.component.scss'],
})
export class PopoverMenuClaseComponent implements OnInit {

  constructor(private navCtrl:NavController, private popoverController:PopoverController) { }

  ngOnInit() {}

  goToEditaClase(){
    this.popoverController.dismiss();
    this.navCtrl.navigateRoot( 'main/tabs/edita-clase', { animated:true})
  }

}
