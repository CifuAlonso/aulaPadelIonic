import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AlertController, IonReorderGroup, ModalController, NavController, PopoverController } from '@ionic/angular';
import { EjercicioService } from 'src/app/services/ejercicio.service';
import { GrupoEjerciciosService } from 'src/app/services/grupo-ejercicios.service';
import { SemanaEjercicioService } from 'src/app/services/semana-ejercicio.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Ejercicio, EjercicioExplora, Semana, Usuario } from 'src/interfaces/interfaces';
import { SemanaService } from '../../../../../services/semana.service';
import { SemanaPlanificacionEjercicio } from '../../../../../../interfaces/interfaces';
import { ItemReorderEventDetail } from '@ionic/core';
import { PopoverMenuSemanaPlanificacionComponent } from '../../../../../components/popover-menu-semana-planificacion/popover-menu-semana-planificacion.component';
import { EjercicioExploraService } from '../../../../../services/ejercicio-explora.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-semana',
  templateUrl: './semana.page.html',
  styleUrls: ['./semana.page.scss'],
})
export class SemanaPage implements OnInit {

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;
  ejerciciosTotales: SemanaPlanificacionEjercicio[] = [];
  otrosEjercicios: SemanaPlanificacionEjercicio[] = [];
  calentamiento: SemanaPlanificacionEjercicio[] = [];
  principal: SemanaPlanificacionEjercicio[] = [];
  practicaPrincipal: SemanaPlanificacionEjercicio[] = [];
  vueltaCalma: SemanaPlanificacionEjercicio[] = [];
  isListItemOpened: boolean = false;
  isListItemOpened2: boolean = false;
  isListItemOpened3: boolean = false;
  isListItemOpened4: boolean = false;

  usuario: Usuario = {};
  terminoBusqueda: string = '';
  nivel = '';
  cargando: boolean
  nombreSemana = '';
  idSemana: string;
  mueveEjercicios = true;
  paginaAnterior: string;
  eliminados: SemanaPlanificacionEjercicio[] = []
  seleccionaEliminar = false;
  activateAnimation = false;

  // type: SearchType = SearchType.all;

  constructor(
    private usuarioService: UsuarioService,

    private ejercicioService: EjercicioService,
    private ejercicioExploraService: EjercicioExploraService,
    private grupoEjerciciosService: GrupoEjerciciosService,
    private semanaEjerciciosService: SemanaEjercicioService,
    private semanaService: SemanaService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private modalController: ModalController,
    private uiService: UiServiceService,
    private popoverController: PopoverController) { }

  async ngOnInit() {
    // this.cargaDatos()

  }

  sleep(ms = 0) {
    return new Promise((r) => setTimeout(r, ms));
  }

  async cargaDatos() {
    this.isListItemOpened = false;
    this.isListItemOpened2 = false;
    this.isListItemOpened3 = false;
    this.isListItemOpened4 = false;
    this.calentamiento = [];
    this.principal = [];
    this.practicaPrincipal = [];
    this.vueltaCalma = []
    this.otrosEjercicios = [];
    this.ejerciciosTotales = []
    this.cargando = true;
    this.eliminados = [];
    this.seleccionaEliminar = false;

    this.usuario = this.usuarioService.getUsuario();
    await this.semanaService.getPaginaAnterior().then(async paginaAnterior => {
      this.paginaAnterior = paginaAnterior
    })
    this.idSemana = await this.semanaService.getSemanaIdActual();
    await this.semanaService.getSemana(this.idSemana).then((semana: Semana) => {
      this.nombreSemana = semana.nombre
    })
    this.calentamiento = [];
    this.principal = [];
    this.practicaPrincipal = [];
    this.vueltaCalma = []
    this.otrosEjercicios = [];
    this.ejerciciosTotales = []

  }


  async ionViewWillEnter() {

    await this.cargaDatos()
    await this.getDatosSecciones();

  }

  async getDatosSecciones() {
    await this.semanaEjerciciosService.getEjerciciosSemana(this.idSemana).then((ejerciciosSemana: SemanaPlanificacionEjercicio[]) => {
      this.ejerciciosTotales = ejerciciosSemana;
    })

    for (let ejercicioSemana of this.ejerciciosTotales) {
      if (!ejercicioSemana.ejercicioExplora) {
        await this.ejercicioService.getEjercicio(this.usuario.id, ejercicioSemana.ejercicioId).then((ejercicio: Ejercicio) => {
          ejercicioSemana.nombreEjercicio = ejercicio.nombre

          if (ejercicioSemana.seccion === 1) {
            this.calentamiento.push(ejercicioSemana)
          } else if (ejercicioSemana.seccion === 2) {
            this.principal.push(ejercicioSemana)
          } else if (ejercicioSemana.seccion === 3) {
            this.practicaPrincipal.push(ejercicioSemana)
          } else if (ejercicioSemana.seccion === 4) {
            this.vueltaCalma.push(ejercicioSemana)
          }
        })
      } else {
        await this.ejercicioExploraService.getEjercicio(ejercicioSemana.ejercicioId).then((ejercicio: EjercicioExplora) => {
          ejercicioSemana.nombreEjercicio = ejercicio.nombre

          if (ejercicioSemana.seccion === 1) {
            this.calentamiento.push(ejercicioSemana)
          } else if (ejercicioSemana.seccion === 2) {
            this.principal.push(ejercicioSemana)
          } else if (ejercicioSemana.seccion === 3) {
            this.practicaPrincipal.push(ejercicioSemana)
          } else if (ejercicioSemana.seccion === 4) {
            this.vueltaCalma.push(ejercicioSemana)
          }
        })
      }


    }
    await this.ordenaEjercicios();
    this.cargando = false
  }



  onPress($event, semanaPlanificacionEjercicio: SemanaPlanificacionEjercicio) {
    this.seleccionaEliminar = true;
    semanaPlanificacionEjercicio.animaTarjeta = true
    if (semanaPlanificacionEjercicio.colorTarjeta === undefined || semanaPlanificacionEjercicio.colorTarjeta === 'white') {
      semanaPlanificacionEjercicio.colorTarjeta = "#e6e7be85";
      this.eliminados.push(semanaPlanificacionEjercicio);
    }
    else {
      semanaPlanificacionEjercicio.colorTarjeta = "white";
      this.sacadeEliminados(semanaPlanificacionEjercicio)
      if (this.eliminados.length===0){
        this.seleccionaEliminar=false;
      }
    }

  }

  onPressUp($event, semanaPlanificacionEjercicio: SemanaPlanificacionEjercicio) {
    if (this.eliminados.length === 0) {
      this.seleccionaEliminar = false;
    }
    semanaPlanificacionEjercicio.animaTarjeta = false;
  }

  sacadeEliminados(semanaPlanificacionEjercicio: SemanaPlanificacionEjercicio) {
    this.eliminados.forEach((value, index) => {
      if (value == semanaPlanificacionEjercicio) this.eliminados.splice(index, 1);
    });
  }

  clickTarjeta(semanaPlanificacionEjercicio: SemanaPlanificacionEjercicio) {
    if (this.seleccionaEliminar) {

      semanaPlanificacionEjercicio.animaTarjeta = false;
      if (semanaPlanificacionEjercicio.colorTarjeta === undefined || semanaPlanificacionEjercicio.colorTarjeta === 'white') {
        semanaPlanificacionEjercicio.animaTarjeta = true
        semanaPlanificacionEjercicio.colorTarjeta = "#e6e7be85";
        this.eliminados.push(semanaPlanificacionEjercicio);
      }
      else {
        if (this.eliminados.length > 1) {
          semanaPlanificacionEjercicio.animaTarjeta = true
          semanaPlanificacionEjercicio.colorTarjeta = "white";
          this.sacadeEliminados(semanaPlanificacionEjercicio)
        }
      }


    } else {
      console.log(semanaPlanificacionEjercicio)
      this.goToEjercicio(semanaPlanificacionEjercicio.ejercicioId)
    }
  }



  goToEjercicio(ejercicioId: string) {
    this.ejercicioService.setPaginaAnterior('semana');
    this.ejercicioService.setEjercicioIdActual(ejercicioId);
    this.navCtrl.navigateRoot('main/tabs/ejercicio', { animated: true })
  }

  doReorder(ev: any, array: number) {

    if (array === 1) {
      this.calentamiento = this.moverArray(this.calentamiento, ev.detail.from, ev.detail.to)
      this.calentamiento.forEach((ejercicio: SemanaPlanificacionEjercicio) => {
        let indice = this.calentamiento.indexOf(ejercicio)
        ejercicio.posicion = indice

      });
    } else if (array === 2) {
      this.principal = this.moverArray(this.principal, ev.detail.from, ev.detail.to)
      this.principal.forEach((ejercicio: SemanaPlanificacionEjercicio) => {
        let indice = this.principal.indexOf(ejercicio)
        ejercicio.posicion = indice

      });
    } else if (array === 3) {
      this.practicaPrincipal = this.moverArray(this.practicaPrincipal, ev.detail.from, ev.detail.to)
      this.practicaPrincipal.forEach((ejercicio: SemanaPlanificacionEjercicio) => {
        let indice = this.practicaPrincipal.indexOf(ejercicio)
        ejercicio.posicion = indice

      });
    } else if (array === 4) {
      this.vueltaCalma = this.moverArray(this.vueltaCalma, ev.detail.from, ev.detail.to)
      this.vueltaCalma.forEach((ejercicio: SemanaPlanificacionEjercicio) => {
        let indice = this.vueltaCalma.indexOf(ejercicio)
        ejercicio.posicion = indice

      });
    }

    ev.detail.complete();
  }

  moverArray(array, from, to) {
    const copy = [...array];
    const valueToMove = copy.splice(from, 1)[0];
    copy.splice(to, 0, valueToMove);
    return copy;
  }

  async ordenaEjercicios() {
    this.calentamiento.sort(function (a, b) {
      if (a.posicion > b.posicion) {
        return 1;
      } if (a.posicion < b.posicion) {
        return -1;
      }
      return 0;
    })
    this.principal.sort(function (a, b) {
      if (a.posicion > b.posicion) {
        return 1;
      } if (a.posicion < b.posicion) {
        return -1;
      }
      return 0;
    })
    this.practicaPrincipal.sort(function (a, b) {
      if (a.posicion > b.posicion) {
        return 1;
      } if (a.posicion < b.posicion) {
        return -1;
      }
      return 0;
    })
    this.vueltaCalma.sort(function (a, b) {
      if (a.posicion > b.posicion) {
        return 1;
      } if (a.posicion < b.posicion) {
        return -1;
      }
      return 0;
    })

  }

  goToAnterior() {
    this.navCtrl.back();
  }

  async abrePopOver(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverMenuSemanaPlanificacionComponent,
      event: ev,
      translucent: true,
      mode: 'ios',
      componentProps: {
        mueveEjercicios: this.mueveEjercicios
      },
      //cerrar tocando fuera
      backdropDismiss: true
    });
    await popover.present();

    await popover.onDidDismiss().then((resp) => {
      if (resp.data != undefined) {
        this.mueveEjercicios = resp.data
      }
      this.ngOnInit()

    });


  }

  async actualizaPosiciones() {
    this.mueveEjercicios = !this.mueveEjercicios
    let indiceCalentamiento = 0;
    let indicePrincipal = 0;
    let indicePracticaPrincipal = 0;
    let indiceVueltaCalma = 0;
    this.calentamiento.forEach(async ejercicio => {
      const ejercicioActualizado = await this.semanaEjerciciosService.putSemanaEjercicio(ejercicio);
      indiceCalentamiento++;
    });
    this.principal.forEach(async ejercicio => {
      const ejercicioActualizado = await this.semanaEjerciciosService.putSemanaEjercicio(ejercicio);
      indicePrincipal++;
    });
    this.practicaPrincipal.forEach(async ejercicio => {
      const ejercicioActualizado = await this.semanaEjerciciosService.putSemanaEjercicio(ejercicio);
      indicePracticaPrincipal++;
    });
    this.vueltaCalma.forEach(async ejercicio => {
      const ejercicioActualizado = await this.semanaEjerciciosService.putSemanaEjercicio(ejercicio);
      indiceVueltaCalma++;
    });



  }



  async eliminarEjercicio() {

    const alert = await this.alertController.create({

      header: 'Eliminar ejercicios de la semana',
      message: '¿Estás seguro? Se eliminarán los ejercicios seleccionados de esta semana',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',

          handler: (blah) => {

          }
        }, {
          text: 'Eliminar',
          handler: async () => {
            let contador = 0;
            for (let planificacion of this.eliminados) {
              await this.semanaEjerciciosService.deleteSemanaEjercicio(planificacion);
              contador++;
            }

            if (contador === this.eliminados.length) {
              this.uiService.alertaInformativa('Los ejercicios han sido eliminados');
              this.ngOnInit()


            } else {
              this.uiService.alertaInformativa('Error al eliminar')

            }
            await this.cargaDatos()
            await this.getDatosSecciones();
        }
          }
        ]
  });
    
      await alert.present();
    
    
    
    }
  
    todo = ['Get to work'];

    done = ['Get up'];

  
    drop(event: CdkDragDrop<any[]>) {
      console.log(event)
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
    }
}
