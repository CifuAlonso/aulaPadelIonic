import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { SemanaService } from 'src/app/services/semana.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Semana, Usuario } from 'src/interfaces/interfaces';
import { UsuarioService } from '../../../../../../services/usuario.service';
import { SemanaEjercicioService } from '../../../../../../services/semana-ejercicio.service';
import { SemanaPlanificacionEjercicio, Ejercicio, EjercicioExplora } from '../../../../../../../interfaces/interfaces';
import { EjercicioService } from '../../../../../../services/ejercicio.service';
import { EjercicioExploraService } from '../../../../../../services/ejercicio-explora.service';

@Component({
  selector: 'app-add-ejercicio-semana',
  templateUrl: './add-ejercicio-semana.page.html',
  styleUrls: ['./add-ejercicio-semana.page.scss'],
})
export class AddEjercicioSemanaPage implements OnInit {

  seccion: string
  ejerciciosSemana: SemanaPlanificacionEjercicio[] = []
  ejerciciosTotales: Ejercicio[] = []
  ejerciciosNoSemana: Ejercicio[] = []
  ejerciciosTotalesExplora: EjercicioExplora[] = []
  ejerciciosNoSemanaExplora: EjercicioExplora[] = []
  listaEjercicios: Ejercicio[] = []
  listaEjerciciosExplora: EjercicioExplora[] = []
  nombre: string = "";
  descripcion: string = "";
  terminoBusqueda: string = '';
  usuario: Usuario = {};
  semana: Semana;
  planificacionId: string;
  trimestreId: string;
  semanaId: string;
  actualizaSemana: boolean = false;
  muestraEjercicios: boolean = false;
  tipoEjercicio: string
  cargadosEjerciciosExplora: boolean = false;
  cargadosEjerciciosPropios: boolean = false;
  cargando: boolean = true;
  guardando: boolean = false;

  constructor(private modalController: ModalController,
    private semanaService: SemanaService,
    private ejercicioService: EjercicioService,
    private ejercicioExploraService: EjercicioExploraService,
    private semanaEjercicioService: SemanaEjercicioService,
    private uiService: UiServiceService,
    private alertController: AlertController,
    private usuarioService: UsuarioService) { }


  async ngOnInit() {
    this.cargando = true;
    this.usuario = this.usuarioService.getUsuario();
    this.semanaId = await this.semanaService.getSemanaIdActual();

  }

  async ionViewDidEnter() {
    //  this.ngOnInit();
  }

  cerrar() {
    this.modalController.dismiss();
    window.location.reload();
  }
  async getEjerciciosPropios() {

    await this.semanaEjercicioService.getEjerciciosSemana(this.semanaId).then((ejerciciosSemana: SemanaPlanificacionEjercicio[]) => {
      ejerciciosSemana.forEach(ejercicio => {
        if (!ejercicio.ejercicioExplora) {
          this.ejerciciosSemana.push(ejercicio)
        }

      });
    })
    await this.ejercicioService.getEjerciciosProfesor(this.usuario.id).then((ejercicios: Ejercicio[]) => {
      this.ejerciciosTotales = ejercicios
    })
    this.ejerciciosTotales.forEach(ejercicio => {
      let encontrado = this.ejerciciosSemana.find(ejercicioSemana => ejercicioSemana.ejercicioId == ejercicio.id)
      if (!encontrado) {
        ejercicio.check = false;
        this.ejerciciosNoSemana.push(ejercicio)
      }

    });
    this.cargadosEjerciciosPropios = true;

  }

  async getEjerciciosExplora() {

    await this.semanaEjercicioService.getEjerciciosSemana(this.semanaId).then((ejerciciosSemana: SemanaPlanificacionEjercicio[]) => {
      ejerciciosSemana.forEach(ejercicio => {

        if (ejercicio.ejercicioExplora) {
          this.ejerciciosSemana.push(ejercicio)
        }

      });
    })
    await this.ejercicioExploraService.getEjercicios().then((ejercicios: EjercicioExplora[]) => {
      this.ejerciciosTotalesExplora = ejercicios
    })
    this.ejerciciosTotalesExplora.forEach(ejercicio => {
      let encontrado = this.ejerciciosSemana.find(ejercicioSemana => ejercicioSemana.ejercicioId == ejercicio.id)
      if (!encontrado) {
        ejercicio.check = false;
        this.ejerciciosNoSemanaExplora.push(ejercicio)
      }

    });
    this.cargadosEjerciciosExplora = true;

  }

  async segmentChangedEjercicio(event) {
    this.muestraEjercicios = false,

      this.tipoEjercicio = event.detail.value
    if (this.tipoEjercicio === 'propio') {
      if (!this.cargadosEjerciciosPropios) {
        await this.getEjerciciosPropios()
      }

      this.muestraEjercicios = true;
    } else if (this.tipoEjercicio === 'aulapadel') {
      if (!this.cargadosEjerciciosExplora) {
        this.getEjerciciosExplora()

      }
      this.muestraEjercicios = true;
    }

    this.cargando = false

  }

  addEjercicioLista(ejercicio: Ejercicio) {
    let index = this.listaEjercicios.indexOf(ejercicio)
    if (index === -1) {
      ejercicio.check = true;
      this.listaEjercicios.push(ejercicio);
    } else {
      ejercicio.check = false;
      this.listaEjercicios.splice(index, 1)
    }
  }


  addEjercicioListaExplora(ejercicio: EjercicioExplora) {
    let index = this.listaEjerciciosExplora.indexOf(ejercicio)
    if (index === -1) {
      // ejercicio.check = true;
      this.listaEjerciciosExplora.push(ejercicio);
    } else {
      //  ejercicio.check = false
      this.listaEjerciciosExplora.splice(index, 1)
    }
  }


  async addEjerciciosSemana() {
    this.guardando = true
    let check = 0
    let index = 0
    this.ejerciciosNoSemana.forEach(async ejercicio => {
      // ejercicio.grupoEjerciciosId = this.idGrupo;
      if (ejercicio.check) {
        check++;
        }      
      })


    this.ejerciciosNoSemanaExplora.forEach(async ejercicio => {
      if (ejercicio.check) {
       check++;
        } 
      })
    


      for (let ejercicio of this.ejerciciosNoSemana){
        if (ejercicio.check) {
          let ejercicioSemana: SemanaPlanificacionEjercicio = {
            usuarioId: this.usuario.id,
            semanaId: this.semanaId,
            ejercicioId: ejercicio.id,
            seccion: +this.seccion,
            posicion: this.ejerciciosTotales.length,
            ejercicioExplora: false
          }
         
          const ejercicioAdd= await this.semanaEjercicioService.postSemanaEjercicio(ejercicioSemana);
          if (ejercicioAdd){
            console.log("aas")
            index++
          }
        
        }
      }
   
for (let ejercicio of this.ejerciciosNoSemanaExplora){
  if (ejercicio.check) {
    let ejercicioSemana: SemanaPlanificacionEjercicio = {
      usuarioId: this.usuario.id,
      semanaId: this.semanaId,
      ejercicioId: ejercicio.id,
      seccion: +this.seccion,
      posicion: this.ejerciciosTotales.length,
      ejercicioExplora: true
    }

    const ejercicioAdd= await this.semanaEjercicioService.postSemanaEjercicio(ejercicioSemana);
    if (ejercicioAdd){
      index++
    }

  }
}

    
    if (index === check){
      this.ejerciciosNoSemanaExplora = []
      this.ejerciciosNoSemana=[];
      this.ejerciciosSemana = [];
      this.listaEjercicios = [];
      this.listaEjerciciosExplora=[];
      this.muestraEjercicios = false;
      this.cargadosEjerciciosExplora= false;
      this.cargadosEjerciciosPropios = false;
      this.guardando = false;
      this.uiService.alertaInformativa('Se han añadido los ejercicios');
      if (this.tipoEjercicio === 'propio') {
        if (!this.cargadosEjerciciosPropios) {
          await this.getEjerciciosPropios()
        }
  
        this.muestraEjercicios = true;
      } else if (this.tipoEjercicio === 'aulapadel') {
        if (!this.cargadosEjerciciosExplora) {
          this.getEjerciciosExplora()
  
        }
        this.muestraEjercicios = true;
      }
  
      this.cargando = false

      
    }
    



  }


  sleep(ms = 0) {
    return new Promise((r) => setTimeout(r, ms));
  }

}
