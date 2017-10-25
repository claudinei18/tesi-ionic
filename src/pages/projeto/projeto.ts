import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
  projeto: string;
  novo: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public projetosService: ProjetosServiceProvider,
              public toastCtrl: ToastController) {
    this.codigo = navParams.get('codigo');
    this.novo = navParams.get('novo');
    projetosService.getProjeto(this.codigo).then(dado => {
      if(!this.novo){
        this.projeto = dado.projeto;
      }
    });

  }

  alterar(){
    this.projetosService.editProjeto(this.codigo, this.projeto);
    this.presentToast('Projeto ' + this.projeto + ' alterado com sucesso!');
    this.navCtrl.pop();
  }

  excluir(){
    this.projetosService.deleteProjeto(this.codigo);
    this.presentToast('Projeto ' + this.projeto + ' excluído com sucesso!');
    this.navCtrl.pop();
  }

  incluir(){
    this.projetosService.incluirProjeto(this.projeto);
    this.presentToast('Projeto ' + this.projeto + ' inserido com sucesso!');
    this.navCtrl.pop();
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
    console.log('ionViewDidLoad ProjetoPage');
  }

}
