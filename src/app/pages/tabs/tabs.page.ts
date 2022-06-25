import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverMenuAddComponent } from '../../components/popover-menu-add/popover-menu-add.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public popoverController: PopoverController) {}

  async abreMenuAdd(ev:any){
    const popover = await this.popoverController.create({
      component: PopoverMenuAddComponent,
      event: ev,
      translucent: true,
      mode:'ios',

      //cerrar tocando fuera
      backdropDismiss: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
 
  }
  }

