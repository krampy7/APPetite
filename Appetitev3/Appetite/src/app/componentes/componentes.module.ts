import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalesComponent } from './locales/locales.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    LocalesComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    GoogleMapsModule
  ], exports:[
    LocalesComponent
]
})
export class ComponentesModule { }
