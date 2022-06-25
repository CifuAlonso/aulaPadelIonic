import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlumnoService } from 'src/app/services/alumno.service';
import { OpinionTutorService } from 'src/app/services/opinion-tutor.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Alumno, Usuario } from 'src/interfaces/interfaces';
import { OpinionTutor } from '../../../../interfaces/interfaces';
import { ComiteTecnicoService } from '../../../services/comite-tecnico.service';

@Component({
  selector: 'app-opinion-tutor',
  templateUrl: './opinion-tutor.page.html',
  styleUrls: ['./opinion-tutor.page.scss'],
})
export class OpinionTutorPage implements OnInit {
  cargando:boolean;
  alumnoId:string
  comiteTecnicoId:string;
  usuario: Usuario={};
  alumno: Alumno;
  opinion:OpinionTutor;
  existeOpinion:boolean;
  textoOpinion="";


  constructor(private alumnoService: AlumnoService,
    private usuarioService:UsuarioService,
    private comiteTecnicoService: ComiteTecnicoService,
    private opinionTutorService: OpinionTutorService,
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
    await this.opinionTutorService.getOpinionTutor(this.comiteTecnicoId).then((opinion:any)=>{
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
  let opinion: OpinionTutor={
  alumnoId: this.alumnoId,
  profesorId:this.usuario.id,
  comiteTecnicoId:this.comiteTecnicoId,
  opinion:this.textoOpinion  
  }

  const comiteCreado = await this.opinionTutorService.postOpinionTutor(opinion);

  if (comiteCreado){
    this.uiService.alertaInformativa('La opinión se ha guardado');

  } else {
    this.uiService.alertaInformativa('Error al guardar la opinión')
  
  }
}


async actualizarOpinion(){
  this.opinion.opinion=this.textoOpinion;
  const opinionActualizado = await this.opinionTutorService.putOpinionTutor(this.opinion);
  if (opinionActualizado){
    this.uiService.alertaInformativa('La opinión ha sido actualizada');
    
  } else {
    this.uiService.alertaInformativa('Error al actualizar La opinión')
    
  }
  

}
}
