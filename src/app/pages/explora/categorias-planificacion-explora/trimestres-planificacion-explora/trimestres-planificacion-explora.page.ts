import { Component, OnInit } from '@angular/core';
import { TrimestreExploraService } from '../../../../services/trimestre-explora.service';
import { NavController } from '@ionic/angular';
import { CategoriaPlanificacionExploraService } from '../../../../services/categoria-planificacion-explora.service';
import { NivelPlanificacionExploraService } from '../../../../services/nivel-planificacion-explora.service';
import { CategoriaPlanificacionExplora, NivelPlanificacionExplora, SemanaExplora, Usuario } from 'src/interfaces/interfaces';
import { UsuarioService } from '../../../../services/usuario.service';
import { SemanaExploraService } from '../../../../services/semana-explora.service';

@Component({
  selector: 'app-trimestres-planificacion-explora',
  templateUrl: './trimestres-planificacion-explora.page.html',
  styleUrls: ['./trimestres-planificacion-explora.page.scss'],
})
export class TrimestresPlanificacionExploraPage implements OnInit {
  usuario: Usuario={};
  cargando:boolean;
  nombreCategoria:string="Categoria";
  nombreNivel:string="Nivel"
  semanas:SemanaExplora[]=[]

  constructor(private trimestreExploraService: TrimestreExploraService,
    private categoriaExploraService:CategoriaPlanificacionExploraService,
    private nivelesPlanificacionService: NivelPlanificacionExploraService,
    private semanaExploraService: SemanaExploraService,
    private usuarioService:UsuarioService,
    private navCtrl:NavController) { }

    async ngOnInit() {
      this.getDatos()
    }
  
    async ionViewDidEnter(){
      this.getDatos()
    }

    async getDatos(){
      this.cargando=true;
      this.usuario = this.usuarioService.getUsuario();
      
      await this.categoriaExploraService.getCategoriaIdActual().then(async (categoria)=>{
        await this.categoriaExploraService.getCategoria(categoria).then((categoria:CategoriaPlanificacionExplora)=>{
          
       //   this.nombreCategoria=categoria.titulo
        })
      })
      await this.nivelesPlanificacionService.getNivelIdActual().then(async (nivelId)=>{
        await this.nivelesPlanificacionService.getNivel(nivelId).then((nivel:NivelPlanificacionExplora)=>{
        //  this.nombreNivel = nivel.titulo
        })
        
        await this.semanaExploraService.getSemanasPlanificacion(nivelId).then((semanas:SemanaExplora[])=>{
          this.semanas = semanas
        })
    
      })
      console.log(this.semanas)
      this.cargando=false;
    }
    
    goToSemana(semanaId:string){
      this.semanaExploraService.setSemanaIdActual(semanaId);
      this.semanaExploraService.setPaginaAnterior("semanasExplora")
      this.navCtrl.navigateRoot( 'main/tabs/semana-planificacion-explora', { animated:true})
    }

    sleep(ms = 0) {
      return new Promise((r) => setTimeout(r, ms));
    }

}
