import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-ver-perfil',
  templateUrl: './popover-ver-perfil.component.html',
  styleUrls: ['./popover-ver-perfil.component.scss'],
})
export class PopoverVerPerfilComponent implements OnInit {

 
  constructor(private navCtrl:NavController,
    private popoverController:PopoverController
    ) { }

  ngOnInit() {}

  async goToPerfil(){
    
    this.navCtrl.navigateRoot( 'main/tabs/usuario', { animated:true})
    await this.popoverController.dismiss();
  }
}
