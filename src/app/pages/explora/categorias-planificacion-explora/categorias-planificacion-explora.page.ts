import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NivelPlanificacionExploraService } from 'src/app/services/nivel-planificacion-explora.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NivelPlanificacionExplora, Usuario } from 'src/interfaces/interfaces';
import { CategoriaPlanificacionExplora } from '../../../../interfaces/interfaces';
import { CategoriaPlanificacionExploraService } from '../../../services/categoria-planificacion-explora.service';

@Component({
  selector: 'app-categorias-planificacion-explora',
  templateUrl: './categorias-planificacion-explora.page.html',
  styleUrls: ['./categorias-planificacion-explora.page.scss'],
})
export class CategoriasPlanificacionExploraPage implements OnInit {

  usuario: Usuario={};
  cargando:boolean;
  categoriasPlanificacion: CategoriaPlanificacionExplora[]=[]
  nivelesPlanificacion: NivelPlanificacionExplora[]=[]

  constructor( private navCtrl:NavController,
    private usuarioService:UsuarioService,
    private categoriasPlanificacionService:CategoriaPlanificacionExploraService,
    private nivelesPlanificacionService:NivelPlanificacionExploraService,
   ) { }

   async ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
  }

  async ionViewDidEnter(){
    this.cargando=true;
this.ngOnInit()
this.nivelesPlanificacion=[]
await this.categoriasPlanificacionService.getCategorias().then((categoriasPlanificacion:CategoriaPlanificacionExplora[])=>{
  this.categoriasPlanificacion = categoriasPlanificacion
  console.log(this.categoriasPlanificacion)
})
this.categoriasPlanificacion.forEach(async (categoria:CategoriaPlanificacionExplora) => {
  await this.nivelesPlanificacionService.getNivelesCategoria(categoria.id).then((nivelesPlanificacion:NivelPlanificacionExplora[])=>{
    nivelesPlanificacion.forEach((nivel:NivelPlanificacionExplora) => {
     
      this.nivelesPlanificacion.push(nivel)
      
    });
    console.log(this.nivelesPlanificacion)
  })
});
this.cargando=false;
console.log(this.categoriasPlanificacion)
console.log(this.nivelesPlanificacion)
  }
  

  goToCategoria(categoriaId:string){
    this.categoriasPlanificacionService.setCategoriaActual(categoriaId);
    this.navCtrl.navigateRoot( 'main/tabs/nivel-planificacion-explora', { animated:true})
  }

  goToTrimestres(nivelId:string){
    this.nivelesPlanificacionService.setNivelActual(nivelId);
    this.navCtrl.navigateRoot( 'main/tabs/trimestre-planificacion-explora', { animated:true})
  }

  

}
