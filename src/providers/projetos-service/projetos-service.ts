import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProjetosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProjetosServiceProvider {

  projetos = [
    {codigo: 0, nome: 'Álgoritmos'},
    {codigo: 1, nome: 'Pós-Graduação'},
    {codigo: 2, nome: 'EAD'}
  ];
  ultimoCodigo = 3;

  constructor(public http: Http) {
    console.log('Hello ProjetosServiceProvider Provider');
  }

  getProjetos() {
    return this.projetos;
  }

  editProjeto(codigo: number, nome: string){
    this.projetos[codigo].nome = nome;
  }

  deleteProjeto(codigo: number){
    this.projetos.splice(codigo, 1);
  }

  incluirProjeto(nome: string){
    this.projetos.push({codigo: ++this.ultimoCodigo, nome: nome})
  }

}
