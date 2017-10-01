import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjetosServiceProvider } from '../../providers/projetos-service/projetos-service';

/**
 * Generated class for the ProjetoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-projeto',
  templateUrl: 'projeto.html',
})
export class ProjetoPage {

  codigo: number;
  nome: string;
  novo: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public projetosService: ProjetosServiceProvider) {
    this.codigo = navParams.get('codigo');
    this.novo = navParams.get('novo');
    let projetos = projetosService.getProjetos();
    if(!this.novo){
      for(let i=0; i < projetos.length; i++){
        if(i == this.codigo){
          this.nome = projetos[i].nome;
          break;
        }
        
      }
    }

  }

  alterar(){
    this.projetosService.editProjeto(this.codigo, this.nome);
    this.navCtrl.pop();
  }

  excluir(){
    this.projetosService.deleteProjeto(this.codigo);
    this.navCtrl.pop();
  }

  incluir(){
    this.projetosService.incluirProjeto(this.nome);
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjetoPage');
  }

}
