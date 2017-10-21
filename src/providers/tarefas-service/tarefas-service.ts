import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the TarefasServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TarefasServiceProvider {

  tarefas = [
    { codigo: 1, projeto: 1, descricao: 'Elaborar primeira prova', 
    data: new Date(2017, 9, 16), prioridade: 1 },
    { codigo: 2, projeto: 1, descricao: 'Fechar o diário', 
    data: new Date(2017, 11, 20), prioridade: 2 },
    { codigo: 3, projeto: 2, descricao: 'Gravar vídeo', 
    data: new Date(2017, 9, 9), prioridade: 1 },
    { codigo: 4, projeto: 3, descricao: 'Planejar campanha da próxima', 
    data: new Date(2017, 9, 23), prioridade: 3 }
  ]

  ultimoCodigo = 4;

  constructor(public http: Http) { }

  getTarefas() : any[] {
    return this.tarefas;
  }

  editarTarefa(c, codProj, desc, data, prioridade){
    for(let i = 0; i < this.tarefas.length; i++){
      if(this.tarefas[i].codigo == c){
        this.tarefas[i].projeto = codProj;
        this.tarefas[i].descricao = desc;
        this.tarefas[i].data = data;
        this.tarefas[i].prioridade = prioridade;
        break;
      }
    }
  }

  incluirTarefa(codProj, desc, dat, pri){
    this.ultimoCodigo++;

    this.tarefas.push({
      codigo: this.ultimoCodigo,
      projeto: codProj,
      descricao: desc,
      data: dat,
      prioridade: pri
    })

  }

  excluirTarefa(c) {
    for(let i = 0; i < this.tarefas.length; i++){
      if(this.tarefas[i].codigo == c){
        this.tarefas.splice(i,1);
        break;
      }
    }
  }

}
