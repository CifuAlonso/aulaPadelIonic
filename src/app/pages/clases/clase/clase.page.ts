import { Component, OnInit } from '@angular/core';
import { Usuario, Clase, Semana, Alumno, Grupo, SemanaExplora, GrupoAlumnos, AsistenciaAlumno, Falta } from '../../../../interfaces/interfaces';
import { UsuarioService } from '../../../services/usuario.service';
import { ClaseService } from '../../../services/clase.service';
import { GrupoService } from '../../../services/grupo.service';
import { AlumnoService } from '../../../services/alumno.service';
import { SemanaService } from '../../../services/semana.service';
import { UiServiceService } from '../../../services/ui-service.service';
import { AlertController, ModalController, NavController, PopoverController } from '@ionic/angular';
import { PlanificacionesService } from '../../../services/planificaciones.service';
import { SemanaExploraService } from '../../../services/semana-explora.service';
import { GrupoAlumnoService } from '../../../services/grupo-alumno.service';
import { AddAlumnoClasePage } from './add-alumno-clase/add-alumno-clase.page';
import { PopoverMenuClaseComponent } from '../../../components/popover-menu-clase/popover-menu-clase.component';
import { AsistenciaAlumnoService } from '../../../services/asistencia-alumno.service';
import { FaltasService } from '../../../services/faltas.service';

declare var cordova: any;

@Component({
  selector: 'app-clase',
  templateUrl: './clase.page.html',
  styleUrls: ['./clase.page.scss'],
})
export class ClasePage implements OnInit {

  cargando: boolean = false;
  usuario: Usuario;
  clase: Clase;
  alumnos: Alumno[] = []
  alumno: Alumno
  alumnosIdGrupo: GrupoAlumnos[] = []
  claseId: string;
  paginaAnterior: string;

  constructor(private usuarioService: UsuarioService,
    private claseService: ClaseService,
    private grupoService: GrupoService,
    private alumnoService: AlumnoService,
    private semanaService: SemanaService,
    private grupoAlumnoService: GrupoAlumnoService,
    private semanaExploraService: SemanaExploraService,
    private uiService: UiServiceService,
    private navCtrl: NavController,
    private popoverController: PopoverController,
    private planificacionService: PlanificacionesService,
    private modalController: ModalController,
    private alertController: AlertController,
    private asistenciaAlumnoService: AsistenciaAlumnoService,
    private faltaService: FaltasService,
  ) { }

  async ngOnInit() {

    await this.getDatos()
  }

  async ionViewDidEnter() {

    this.cargando = true
    await this.getDatos()
    if (this.clase.grupoId != '0' && this.clase.alumnosId === '0') {
      await this.grupoAlumnoService.getGrupoAlumno(this.clase.grupoId).then((grupos: GrupoAlumnos[]) => {
        this.alumnosIdGrupo = grupos
      })
      this.alumnosIdGrupo.forEach(async (alumnoIdGrupo: GrupoAlumnos) => {
        await this.alumnoService.getAlumno(alumnoIdGrupo.alumnoId).then(async (alumno: Alumno) => {

          await this.alumnoService.getAvatar(alumno[0].profesorId, alumno[0].avatar).then(async (avatarBlob: Blob) => {

            await this.createImageFromBlob(alumno[0], avatarBlob)

          })
          if (this.clase.guardada === 0) {
            alumno[0].asistencia = 0;
          } else {
            const asistenciaAlumno = await this.asistenciaAlumnoService.getAsistenciaAlumnoClase(this.claseId, alumno[0].id)
            console.log(asistenciaAlumno)
            if (asistenciaAlumno) {
              alumno[0].asistencia = 1;
            } else {
              alumno[0].asistencia = 0;
            }
          }
          this.alumnos.push(alumno[0])
        })

      });
    } else if (this.clase.grupoId != '0' && this.clase.alumnosId != '0') {
      let idAlumnosGrupo = this.clase.alumnosId.split(",");
      idAlumnosGrupo.forEach(async (alumnoIdGrupo) => {
        await this.alumnoService.getAlumno(alumnoIdGrupo).then(async (alumno: Alumno) => {

          await this.alumnoService.getAvatar(alumno.profesorId, alumno.avatar).then(async (avatarBlob: Blob) => {

            await this.createImageFromBlob(alumno, avatarBlob)

          })
          if (this.clase.guardada === 0) {
            alumno[0].asistencia = 0;
            console.log(alumno[0])
          } else {
            const asistenciaAlumno = await this.asistenciaAlumnoService.getAsistenciaAlumnoClase(this.claseId, alumno[0].id)
            console.log(asistenciaAlumno)
            if (asistenciaAlumno) {
              alumno[0].asistencia = 1;
            } else {
              alumno[0].asistencia = 0;
            }
          }
          this.alumnos.push(alumno[0])
        })

      });
    } else if (this.clase.alumnoId != '0' && this.clase.alumnosId == '0') {
    
          await this.alumnoService.getAvatar(this.alumno.profesorId, this.alumno.avatar).then(async (avatarBlob: Blob) => {

            await this.createImageFromBlob(this.alumno, avatarBlob)

          })
          if (this.clase.guardada === 0) {
            this.alumno.asistencia = 0;
    
          } else {
            const asistenciaAlumno = await this.asistenciaAlumnoService.getAsistenciaAlumnoClase(this.claseId, this.alumno.id)
            console.log(asistenciaAlumno)
            if (asistenciaAlumno) {
              this.alumno.asistencia = 1;
            } else {
              this.alumno.asistencia = 0;
            }
          }
     
   

    
    }


    await this.sleep(1000)
    console.log(this.alumnos)
    this.cargando = false;
  }

  async createImageFromBlob(alumno, image: Blob) {
    let FileReader: new () => FileReader = ((window as any).FileReader as any).__zone_symbol__OriginalDelegate;
    let reader = new FileReader();

    reader.onload = () => {
      alumno.foto = reader.result;
    };
    if (image) {
      reader.readAsDataURL(image);
    }
  }


  async eliminaUsuario(alumnoId) {
    const alert = await this.alertController.create({

      header: 'Eliminar clase',
      message: '¿Estás seguro? Se eliminará al alumno de esta clase',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',

          handler: (blah) => {

          }
        }, {
          text: 'Eliminar',
          handler: async () => {

            const alumnoEliminado = this.alumnos.find(alumno => alumno.id === alumnoId)
            this.alumnos = this.alumnos.filter(e => e !== alumnoEliminado)

            let alumnosId = ""
            for (let alumno of this.alumnos) {
              if (alumno.id != alumnoEliminado.id) {
                alumnosId = alumnosId + "," + alumno.id
              }
            }
            alumnosId = alumnosId.slice(1)
            this.clase.alumnosId = alumnosId
            const claseActualizada = await this.claseService.putClase(this.clase);
            if (claseActualizada) {
              this.uiService.alertaInformativa('Se ha eliminado al alumno de esta clase');

            }

          }
        }
      ]
    });

    await alert.present();


  }

  sleep(ms = 0) {
    return new Promise((r) => setTimeout(r, ms));
  }

  async getDatos() {
    this.cargando = true;
    this.alumnos = [];
    this.alumnosIdGrupo = [];
    this.usuario = this.usuarioService.getUsuario();

    await this.claseService.getPaginaAnterior().then(async paginaAnterior => {
      this.paginaAnterior = paginaAnterior
    })
    await this.claseService.getClaseIdActual().then(async claseId => {
      this.claseId = claseId
      await this.claseService.getClase(claseId).then(async clase => {
        this.clase = clase
        console.log(this.clase)
        if (this.clase.grupoId != '0') {
          await this.grupoService.getGrupo(this.clase.grupoId, this.usuario.id).then((grupo: Grupo) => {

            this.clase.nombre = grupo.nombre
          })
        } else if (this.clase.alumnoId != '0') {
          await this.alumnoService.getAlumno(this.clase.alumnoId).then((alumno: Alumno) => {
            this.alumno=alumno[0]
            
            this.clase.nombre = alumno[0].nombre + " " + alumno[0].apellidos
          })
        }
        if (this.clase.planificacionId != '0') {
          if (this.clase.tipoPlanificacion === 'propia') {
            await this.semanaService.getSemana(this.clase.semanaId).then((semana: Semana) => {
              this.clase.nombreSemana = semana.nombre
            })
          } else {
            await this.semanaExploraService.getSemana(this.clase.semanaId).then((semana: SemanaExplora) => {
              this.clase.nombreSemana = semana.titulo
            })
          }
        }

      })
    })

  }


  async puntuaClase(rating) {
    this.clase.puntuacion = rating
    const claseActualizada = await this.claseService.putClase(this.clase);
  }

  goToAlumno(alumnoId?: string) {
    this.alumnoService.setPaginaAnterior('clase')
    if (alumnoId) {
      this.alumnoService.setAlumnoIdActual(alumnoId);
    } else {
      this.alumnoService.setAlumnoIdActual(this.clase.alumnoId)
    }
    this.navCtrl.navigateRoot('main/tabs/alumno', { animated: true })
  }

  goToGrupo() {
    this.grupoService.setPaginaAnterior('clase')
    this.grupoService.setGrupoIdActual(this.clase.grupoId);
    this.navCtrl.navigateRoot('main/tabs/grupo', { animated: true })
  }

  goToSemana() {
    if (this.clase.tipoPlanificacion === 'propia') {
      this.semanaService.setPaginaAnterior('clase')
      this.semanaService.setSemanaIdActual(this.clase.semanaId);
      this.navCtrl.navigateRoot('main/tabs/semana', { animated: true })
    } else {
      this.semanaExploraService.setPaginaAnterior('clase')
      this.semanaExploraService.setSemanaIdActual(this.clase.semanaId);
      this.navCtrl.navigateRoot('main/tabs/semana-planificacion-explora', { animated: true })
    }
  }



  async descargarPlanificacion(botonPlanificacion: string) {

  }


  async mostrarAddAlumnos() {
    if (this.clase.grupoId != '0') {
      await this.grupoService.setGrupoIdActual(this.clase.grupoId);
    } else {
      await this.alumnoService.setAlumnoIdActual(this.clase.alumnoId);
    }

    const modal = await this.modalController.create({
      component: AddAlumnoClasePage,
    });
    modal.onDidDismiss()
      .then(() => {
        this.ngOnInit()
      });
    return await modal.present()
  }


  async abrePopOver(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverMenuClaseComponent,
      event: ev,
      translucent: true,
      mode: 'ios',
      //cerrar tocando fuera
      backdropDismiss: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();

  }

  asistenciaAlumno(alumno: Alumno) {
    alumno.asistencia = 1;
  }

  async guardarClase() {
    let ausencias = false;
    const alert = await this.alertController.create({

      header: 'Guardar clase',
      message: '¿Estás seguro? Una vez que se guarde la clase no podrás modificarla',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',

          handler: (blah) => {

          }
        }, {
          text: 'Guardar',
          handler: async () => {
            if (this.alumnos.length>0){
              for (let alumno of this.alumnos) {
                if (alumno.asistencia === 1) {
                  let asistenciaAlumno: AsistenciaAlumno = {
                    usuarioId: this.usuario.id,
                    alumnoId: alumno.id,
                    claseId: this.claseId
                  }
                  await this.asistenciaAlumnoService.postAsistencia(asistenciaAlumno);
                } else {
                  ausencias = true;
                }
              }
            } else {
              if (this.alumno.asistencia === 1) {
                let asistenciaAlumno: AsistenciaAlumno = {
                  usuarioId: this.usuario.id,
                  alumnoId: this.alumno.id,
                  claseId: this.claseId
                }
                await this.asistenciaAlumnoService.postAsistencia(asistenciaAlumno);
              } else {
                ausencias = true;
              }
            }
      


            this.clase.guardada = 1;
            const claseActualizada = await this.claseService.putClase(this.clase);
            if (claseActualizada) {
              this.uiService.alertaInformativa('Se ha guardado la clase');
            } else {
              this.uiService.alertaInformativa('Error al guardar la clase')
            }

            if (ausencias) {
              const alert = await this.alertController.create({

                header: 'Ausencias',
                message: 'Hay alumnos que se han ausentado, ¿Quieres crear automáticamente la ausencia?',
                buttons: [
                  {
                    text: 'Cancelar',
                    role: 'cancel',

                    handler: (blah) => {

                    }
                  }, {
                    text: 'Crear',
                    handler: async () => {
                      for (let alumno of this.alumnos) {
                        if (alumno.asistencia === 0) {
                          let falta: Falta={
                            alumnoId:alumno.id,
                            profesorId:this.usuario.id,
                            motivo: "",
                            observaciones: "",
                            fecha: this.clase.fecha,
                            }
                        
                            const faltaCreada = await this.faltaService.postFalta(falta);
                        }
                      }
                      this.clase.guardada = 1;
                      const claseActualizada = await this.claseService.putClase(this.clase);
                      if (claseActualizada) {
                        this.uiService.alertaInformativa('Ausencia creada');
                      } else {
                        this.uiService.alertaInformativa('Error al notificar')
                      }
                    }
                  }
                ]
              });
              await alert.present();
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
