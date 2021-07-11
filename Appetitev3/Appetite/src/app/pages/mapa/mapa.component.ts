import { Component,OnInit,Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Geolocation } from "@capacitor/core";
import { Local } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @Input() local: Local;

  private latitud=0;
  private longitud=0;
  position={}
  label={}

  title='gmaps';

  constructor(public modalController: ModalController,
    public firebase: FirestoreService) { }

  ngOnInit() {
    this.printMap();
  }

  printMap(){
    const posision= {lat: this.local.ubicacion.lat, lng: this.local.ubicacion.lng}
    this.latitud=posision.lat;
    this.longitud=posision.lng;
    this.position={
      lat: this.latitud,
      lng: this.longitud
    };
    this.label = {
      text: this.local.Nombre
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
