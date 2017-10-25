import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the ProjetosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProjetosServiceProvider {

  url = 'http://kutova.com/dev/todolist/api.php';
  projetos = [];
  ultimoCodigo = 3;

  constructor(public http: Http) {
    console.log('Hello ProjetosServiceProvider Provider');
  }

  getProjetos() : Promise<any[]> {
    
        return new Promise ( resolve => {
            this.http.get(this.url + '/projetos')
            .toPromise()
            .then(
            response => {
                let dados = response.json();
                let projetos = [];
                for(let i = 0; i < dados.length; i++){
                  projetos.push(
                    {
                        codigo: parseInt(dados[i].codigo),
                        projeto:dados[i].projeto
                    })
                }
                resolve(projetos);
                });
        }
    );
  }

  getProjeto(p:number) : Promise<any> {
    
        return new Promise ( resolve => {
            this.http.get(this.url + '/projetos/' + p)
            .toPromise()
            .then(
            response => {
                let dados = response.json();
                let projeto = {
                        codigo: parseInt(dados.codigo),
                        projeto:dados.projeto
                    }
                resolve(projeto);
                });
        }
    );
  }

  editProjeto(p: number, nome: string){
    let headers = new Headers({'Content-Type': 'application/json'});
    let projeto = {
      projeto: nome
    };

    let body = JSON.stringify(projeto);

    return new Promise( resolve => {
      this.http.put(this.url + '/projetos/' + p, body, {headers: headers})
      .toPromise()
      .then(response => resolve(response.json()));
    })

  }

  deleteProjeto(codigo: number): Promise<any> {
    return new Promise (resolve => {
      this.http.delete(this.url + '/projetos/' + codigo)
      .toPromise()
      .then(
        resposta => {
          resolve(resposta.json())
        }
      )
    })
  }

  incluirProjeto(nome: string){
    let headers = new Headers({'Content-Type': 'application/json'});
    let projeto = {
      projeto: nome
    };

    let body = JSON.stringify(projeto);

    return new Promise( resolve => {
      this.http.post(this.url + '/projetos', body, {headers: headers})
      .toPromise()
      .then(response => resolve(response.json()));
    })
  }

}
