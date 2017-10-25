import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import  'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

/*
  Generated class for the TarefasServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TarefasServiceProvider {

  url = 'http://kutova.com/dev/todolist/api.php';

  tarefas = [];

  ultimoCodigo = 4;

  constructor(public http: Http) { }

  getTarefas() : Promise<any[]> {
    
        return new Promise ( resolve => {
            this.http.get(this.url + '/tarefas')
            .toPromise()
            .then(
            response => {
                let dados = response.json();
                let tarefas = [];
                for(let i = 0; i < dados.length; i++){
                  tarefas.push(
                    {
                        codigo: parseInt(dados[i].codigo),
                        projeto: parseInt(dados[i].codigoProjeto),
                        descricao: dados[i].descricao,
                        data: new Date(
                        parseInt(dados[i].data.substr(0,4)),
                        parseInt(dados[i].data.substr(5,2)) - 1,
                        parseInt(dados[i].data.substr(8,2)) ),
                        prioridade: parseInt(dados[i].prioridade)
                    })
                }
                resolve(tarefas);
                });
        }
    );
  }

  getTarefa(t:number) : Promise<any> {
    
        return new Promise ( resolve => {
            this.http.get(this.url + '/tarefas/' + t)
            .toPromise()
            .then(
            response => {
                let dados = response.json();
                let tarefa = {
                  codigo: parseInt(dados.codigo),
                  projeto: parseInt(dados.codigoProjeto),
                  descricao: dados.descricao,
                  data: new Date(
                  parseInt(dados.data.substr(0,4)),
                  parseInt(dados.data.substr(5,2)) - 1,
                  parseInt(dados.data.substr(8,2)) ),
                  prioridade: parseInt(dados.prioridade)
                }
                resolve(tarefa);
                });
        }
    );
  }

  editarTarefa(t: number, codProj: number, desc: string, data: Date, prioridade: number) : Promise<any> {

    let headers = new Headers({'Content-Type': 'application/json'});

    let tarefa = {
      codigoProjeto: codProj,
      descricao: desc,
      data: data.getFullYear() + "-" + 
      ("0" + (data.getMonth() + 1)).substr(-2,2) + "-"+
      ("0" + data.getDate()).substr(-2,2),
      prioridade: prioridade
    }

    let body = JSON.stringify(tarefa);

    console.log(body);

    return new Promise( resolve => {
      this.http.put(this.url + '/tarefas/' + t, body, {headers: headers})
      .toPromise()
      .then(response => resolve(response.json()));
    })
  }

  incluirTarefa(codProj, desc, dat, pri) : Promise<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    
        let tarefa = {
          codigoProjeto: codProj,
          descricao: desc,
          data: dat.getFullYear() + "-" + 
          ("0" + (dat.getMonth() + 1)).substr(-2,2) + "-"+
          ("0" + dat.getDate()).substr(-2,2),
          prioridade: pri
        }
    
        let body = JSON.stringify(tarefa);
    
        console.log(tarefa)

        return new Promise( resolve => {
          this.http.post(this.url + '/tarefas', body, {headers: headers})
          .toPromise()
          .then(response => resolve(response.json()));
        })

  }

  excluirTarefa(t:number): Promise<any> {
    return new Promise(resolve => {
      this.http.delete(this.url + '/tarefas/' + t)
      .toPromise()
      .then(
        response => {
          resolve(response.json());
        }
      )
    })
  }

}
