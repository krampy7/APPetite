import { Component, OnInit } from '@angular/core';
import { FirestoreService } from './../../services/firestore.service';
import { Sugerencia } from 'src/app/models';
import { AlertController, ToastController, LoadingController, MenuController  } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sugerir',
  templateUrl: './sugerir.component.html',
  styleUrls: ['./sugerir.component.scss'],
})

//Class SugerirComponent
export class SugerirComponent implements OnInit {

  //Object nuevaSugerencia instantiated with the interface
  nuevaSugerencia: Sugerencia = {
    Nombre: '',
    Descripcion: '',
    Direccion: '',
    openHours: '',
    OpenDays: '',
    ubicacion:{
      lat:0,
      lng:0,
  },
  //Likes, a new id and date created as attributes for the object
    likes:['tyuio'],
    id: this.database.getId(),
    fechaCreacion: new Date()
  };

  private path = 'Sugerencias/'

  //Loading element of type any
  loading: any;

  //Constructor with services
  constructor(
    public database: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    private router: Router) { }

  //ngOnInit
  ngOnInit() {}

  //Method crearSugerencia
  crearSugerencia() {
    //Calls presentLoading method
    this.presentLoading();
    //Create a new suggest (sugerencia) in the database
    this.database.createDoc(this.nuevaSugerencia, this.path, this.nuevaSugerencia.id).then(res => {
      //Calls method loading
      this.loading.dismiss();
      //Calls method present Toast
      this.presentToast('Su solicitud será procesada');
    }).catch(error => {
      console.log(error);
      this.presentToast('No se pudo generar su solicitud');
    });
    this.router.navigate(['tabs/lista']);
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Procesando petición...',
    });
    await this.loading.present();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
