import { Component } from '@angular/core';

import { ProjetosPage } from '../projetos/projetos';

import { TarefasPage } from '../tarefas/tarefas'

import { AboutPage } from '../about/about';

import { CameraPage } from '../camera/camera';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TarefasPage;
  tab2Root = ProjetosPage;
  
  tab3Root = AboutPage;

  tab4Root = CameraPage;

  constructor() {

  }
}
