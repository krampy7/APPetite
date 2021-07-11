import { ComponentesModule } from './../componentes/componentes.module';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { SugerirComponent } from './sugerir/sugerir.component';
import { MapaComponent } from './mapa/mapa.component';
import { ListaComponent } from './lista/lista.component';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';



@NgModule({
  declarations: [
    HomeComponent,
    ListaComponent,
    MapaComponent,
    SugerirComponent,
    ComentariosComponent,
    
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ComponentesModule,
    FormsModule,
    GoogleMapsModule
  ],
  entryComponents:[
    ComentariosComponent
  ]
})
export class PagesModule { }
