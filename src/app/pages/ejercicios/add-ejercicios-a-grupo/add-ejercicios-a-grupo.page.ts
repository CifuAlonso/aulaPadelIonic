import { Component, OnInit } from '@angular/core';
import { EjercicioService } from 'src/app/services/ejercicio.service';
import { GrupoEjerciciosService } from 'src/app/services/grupo-ejercicios.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Ejercicio, Usuario } from 'src/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-add-ejercicios-a-grupo',
  templateUrl: './add-ejercicios-a-grupo.page.html',
  styleUrls: ['./add-ejercicios-a-grupo.page.scss'],
})
export class AddEjerciciosAGrupoPage implements OnInit {
  ejerciciosTotales:any;
  ejercicios: Ejercicio[]=[];
  usuario: Usuario={};
  terminoBusqueda: string = '';
  nivel='';
  cargando:boolean
  nombreGrupoEjercicios='Sin grupo';
  idGrupo;
  listaEjercicios: Ejercicio[]=[]

 // type: SearchType = SearchType.all;

  constructor( 
    private usuarioService:UsuarioService,
    private ejercicioService:EjercicioService,
    private grupoEjerciciosService:GrupoEjerciciosService,
    private modalController: ModalController,
    private uiService: UiServiceService
  ){}

  async ngOnInit() {
    this.cargando=true;
   
  
    this.ejercicios=[]
    this.usuario = this.usuarioService.getUsuario();
    await this.ejercicioService.getEjerciciosGrupoEjercicios("0",this.usuario.id).then((ejercicios:Ejercicio[])=>{
      this.ejercicios = ejercicios
      this.ejerciciosTotales= ejercicios
    
    });
    this.cargando=false
  }

  searchChanged(event){
    this.ejercicios = this.ejerciciosTotales.filter(item => event.detail.value === '' || item.grupoEjercicioId === +event.detail.value);
    
  }
  
  async ionViewDidEnter(){
   this.ngOnInit()
 }

 
 async  cerrar() {
  this.modalController.dismiss(); 
}

addEjercicioLista(ejercicio:Ejercicio){
  let index= this.listaEjercicios.indexOf(ejercicio)
  if (index === -1){
    this.listaEjercicios.push(ejercicio);
  } else {
    this.listaEjercicios.splice(index,1)
  }
}

async addEjerciciosGrupo(){
  let index=0
 this.listaEjercicios.forEach(async ejercicio => {
    ejercicio.grupoEjerciciosId = this.idGrupo;
    console.log(ejercicio)
    const ejercicioActualizado = await this.ejercicioService.putEjercicio(ejercicio);
    index++;
    if (index === this.listaEjercicios.length){
      this.uiService.alertaInformativa('Los ejercicios se han añadido al grupo');
    }
  });
  
   
}

eliminarEjercicio(ejercicio:Ejercicio){}
mostrarAddEjercicio(ejercicio:Ejercicio){}

}
