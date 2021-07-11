import { SugerirComponent } from './../sugerir/sugerir.component';
import { MapaComponent } from './../mapa/mapa.component';
import { ListaComponent } from './../lista/lista.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {path: 'lista', component: ListaComponent},
      {path: 'mapa', component: MapaComponent},
      {path: 'sugerir', component: SugerirComponent},
      {path: '', component: ListaComponent},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
