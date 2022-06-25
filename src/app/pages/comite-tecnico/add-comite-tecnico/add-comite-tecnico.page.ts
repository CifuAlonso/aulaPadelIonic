import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ComiteTecnico, Usuario } from '../../../../interfaces/interfaces';
import { ComiteTecnicoService } from '../../../services/comite-tecnico.service';

@Component({
  selector: 'app-add-comite-tecnico',
  templateUrl: './add-comite-tecnico.page.html',
  styleUrls: ['./add-comite-tecnico.page.scss'],
})
export class AddComiteTecnicoPage implements OnInit {
  fecha: any;
  usuario: Usuario = {};
  alumnoId:string
  comite: ComiteTecnico
  cargando: boolean=false;


  constructor(private modalController: ModalController,
    private usuarioService: UsuarioService,
    private uiService: UiServiceService,
    private comiteTecnicoService: ComiteTecnicoService) { }

  async ngOnInit() {
  }


  async ionViewDidEnter() {
    this.ngOnInit();
  }

  cerrar() {
    this.modalController.dismiss();
  }

  async guardarComite() {
    this.cargando = true;
    let comite: ComiteTecnico={
    alumnoId: this.alumnoId,
    profesorId:this.usuario.id,
    fecha: moment(this.fecha).format('DD-MM-YYYY'),
    }

    const comiteCreado = await this.comiteTecnicoService.postComiteTecnico(comite);
    this.cargando = false;
    if (comiteCreado){
     
      this.uiService.alertaInformativa('El comité ha sido creado');
      this.cerrar()
    } else {
      this.uiService.alertaInformativa('Error al crear el comité')
      this.cerrar()
    }
  }

}
