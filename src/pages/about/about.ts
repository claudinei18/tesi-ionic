import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  nome: string = 'Claudinei Gomes Mendes';
  matricula: number = 509424;
  sobre: string = 'Aplicação para criação de Projetos e vincular Tarefas a esses projetos!';
  linkApp: string = 'https://github.com/claudinei18/tesi-ionic';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
