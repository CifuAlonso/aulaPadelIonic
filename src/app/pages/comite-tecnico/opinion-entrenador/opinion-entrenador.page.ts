import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlumnoService } from 'src/app/services/alumno.service';
import { OpinionEntrenadorService } from 'src/app/services/opinion-entrenador.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Alumno, Usuario } from 'src/interfaces/interfaces';
import { OpinionEntrenador } from '../../../../interfaces/interfaces';
import { ComiteTecnicoService } from '../../../services/comite-tecnico.service';

@Component({
  selector: 'app-opinion-entrenador',
  templateUrl: './opinion-entrenador.page.html',
  styleUrls: ['./opinion-entrenador.page.scss'],
})
export class OpinionEntrenadorPage implements OnInit {

  cargando:boolean;
  alumnoId:string
  comiteTecnicoId:string;
  usuario: Usuario={};
  alumno: Alumno;
  opinion:OpinionEntrenador;
  existeOpinion:boolean;
  textoOpinion="";


  constructor(private alumnoService: AlumnoService,
    private usuarioService:UsuarioService,
    private comiteTecnicoService: ComiteTecnicoService,
    private opinionEntrenadorService: OpinionEntrenadorService,
    private uiService: UiServiceService,
    private alertController: AlertController,) { }

  async ngOnInit() {
    this.cargando=true;
    this.textoOpinion="";
    this.usuario = this.usuarioService.getUsuario();
    await this.alumnoService.getAlumnoIdActual().then(alumnoId=>{
      this.alumnoId = alumnoId
    })
    await this.alumnoService.getAlumno(this.alumnoId).then(alumno=>{
      this.alumno=alumno[0];
    });
    await this.comiteTecnicoService.getComiteIdActual().then(comiteId=>{
      this.comiteTecnicoId = comiteId
    })
    await this.opinionEntrenadorService.getOpinionEntrenador(this.comiteTecnicoId).then((opinion:any)=>{
      if (opinion.length >0){
        this.opinion=opinion[0]
        this.textoOpinion=this.opinion.opinion;
        this.existeOpinion=true;
      } else {
this.existeOpinion=false;
      }
    })
    this.cargando=false;
  }

  async ionViewDidEnter(){
    await this.ngOnInit()
 }

 async guardarOpinion() {
  let opinion: OpinionEntrenador={
  alumnoId: this.alumnoId,
  profesorId:this.usuario.id,
  comiteTecnicoId:this.comiteTecnicoId,
  opinion:this.textoOpinion  
  }

  const comiteCreado = await this.opinionEntrenadorService.postOpinionEntrenador(opinion);

  if (comiteCreado){
    this.uiService.alertaInformativa('La opinión se ha guardado');

  } else {
    this.uiService.alertaInformativa('Error al guardar la opinión')
  
  }
}


async actualizarOpinion(){
  this.opinion.opinion=this.textoOpinion;
  const opinionActualizado = await this.opinionEntrenadorService.putOpinionEntrenador(this.opinion);
  if (opinionActualizado){
    this.uiService.alertaInformativa('La opinión ha sido actualizada');
    
  } else {
    this.uiService.alertaInformativa('Error al actualizar La opinión')
    
  }
  

}
}
