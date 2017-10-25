import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TarefasServiceProvider } from '../../providers/tarefas-service/tarefas-service';
import { ProjetosServiceProvider } from '../../providers/projetos-service/projetos-service';

/**
 * Generated class for the TarefaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tarefa',
  templateUrl: 'tarefa.html',
})
export class TarefaPage {

  rootPage = null;

  projetos: any[];
  tarefas: any[];
  novo: boolean;

  codigoTarefa: number;
  codigoProjeto: number;
  descricao: string;
  prioridade: number;
  data: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public tarefasService: TarefasServiceProvider,
    public projetosService: ProjetosServiceProvider,
    public toastCtrl: ToastController) {
      
projetosService.getProjetos().then(dados => {
  this.projetos = dados;
  this.novo = navParams.get('novo');
  this.codigoTarefa = navParams.get('codigo');
  if(!this.novo) {
  
    tarefasService.getTarefa(this.codigoTarefa).then(
      tarefa => {
        this.codigoProjeto = tarefa.projeto;
        this.descricao = tarefa.descricao;
        this.prioridade = tarefa.prioridade;
        let d = tarefa.data;
        this.data = d.getFullYear() + "-" + 
        ("0" + (d.getMonth() + 1)).substr(-2,2) + "-"+
        ("0" + d.getDate()).substr(-2,2);
      }
    );
  
  }else {
    this.codigoProjeto = this.projetos[0].codigo;
    this.descricao = '';
    this.prioridade = 3;
    let d = new Date();
    this.data = d.getFullYear() + "-" + 
    ("0" + (d.getMonth() + 1)).substr(-2,2) + "-"+
    ("0" + d.getDate()).substr(-2,2);
    
  }
});

// this.tarefas = tarefasService.getTarefas().then;
}

alterar(){
  let d = new Date(
  parseInt(this.data.toString().substr(0, 4)),
  parseInt(this.data.toString().substr(5, 2)) - 1,
  parseInt(this.data.toString().substr(8, 2)));
  this.tarefasService.editarTarefa(this.codigoTarefa, this.codigoProjeto, this.descricao, d, this.prioridade ).then(
    dados => {
      this.presentToast('Tarefa ' + this.descricao + ' alterada com sucesso!');
      this.navCtrl.pop();
    }
  );
}

excluir(){
  this.tarefasService.excluirTarefa(this.codigoTarefa)
  .then(
    dados => {
      this.presentToast('Tarefa ' + this.descricao + ' excluída com sucesso!');
      this.navCtrl.pop();
    }
  );
}

incluir(){
  let d = new Date(
    parseInt(this.data.toString().substr(0, 4)),
    parseInt(this.data.toString().substr(5, 2)) - 1,
    parseInt(this.data.toString().substr(8, 2)));
    this.tarefasService.incluirTarefa(this.codigoProjeto, this.descricao, d, this.prioridade )
    .then(dados => {
      this.presentToast('Tarefa ' + this.descricao + ' inserida com sucesso!');
      this.navCtrl.pop();
    });
}

presentToast(message: string) {
  let toast = this.toastCtrl.create({
    message: message,
    position: 'top',
    duration: 3000
  });
  toast.present();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TarefaPage');
  }

}
