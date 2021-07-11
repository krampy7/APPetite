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

//Class MapaComponent
export class MapaComponent implements OnInit {


  //Input local interface
  @Input() local: Local;

  //Position variables are declared
  private latitud=0;
  private longitud=0;
  position={}
  label={}

  title='gmaps';

  //Constructor with services
  constructor(public modalController: ModalController,
    public firebase: FirestoreService) { }

  //ngOnInit
  //Calls print function
  ngOnInit() {
    this.printMap();
  }

  //printMap method
  printMap(){
    //Object posision
    const position= {lat: this.local.ubicacion.lat, lng: this.local.ubicacion.lng}
    //Access to local's location and assign the latitude and longitude to the object's attributes
    this.latitud=position.lat;
    this.longitud=position.lng;
    //Position gets the value of the object's attributes
    this.position={
      lat: this.latitud,
      lng: this.longitud
    };
    //Label gets the name of the local
    this.label = {
      text: this.local.Nombre
    }
  }

  //Method that interacts with modal controller
  closeModal() {
    this.modalController.dismiss();
  }

}
