import { Geolocation } from '@capacitor/core';
import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Local, Sugerencia, User } from 'src/app/models';
import { AlertController, ToastController, LoadingController  } from '@ionic/angular';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})

//Class AdminComponent
export class AdminComponent implements OnInit {

  //Attributes
  //User object and an observable
  user$: Observable<User>=this.authSvc.auth.user;
  user:User;

  //Location attributes
  latitud:number;
  longitud:number;

  //Array of suggestions
  sugerencias: Sugerencia[] = [];

  //A new object Local named nuevoLocal
  nuevoLocal: Local = {
    Nombre: '',
    Descripcion: '',
    Direccion: '',
    openHours: '',
    OpenDays: '',
    imagen: '',
    ubicacion: {
      lat:null,
      lng:null
    },
    id:'',
    likes: null,
    fechaCreacion: new Date()
  };

  newImage = '';
  newFile = '';

  //Paths that are going to be used in some methods
  private path = 'Locales/';
  private pathsug = 'Sugerencias/';
  loading:any;

  //Constructor with all the services
  constructor(private menu: MenuController,
    public database:FirestoreService,
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private storageService: FirestorageService,
    public authSvc:FirebaseauthService,
    private router: Router
    ) {
      //Auth for get user
      this.authSvc.stateAuth().subscribe(res=>{
        //If there's no user
        if(res === null){
          //Move to the page home
          this.router.navigate(['home']);
        }
        //If there's a user
        else{
          //If its id is different from dWoZ8iNFmeUfAL3eNWUEVPH9IrC3
          if (res.uid != 'dWoZ8iNFmeUfAL3eNWUEVPH9IrC3') {
            //Move to tabs page
            this.router.navigate(['tabs']);
          }
        }
        //Show in console there's an active user
        console.log("usuario activo->",res.uid);
      });
    }

  //The method to be called when the page starts
  ngOnInit() {

    //Get suggestions
    this.getSugerencias();
  }

  //Methos openMenu
  openMenu() {

    //Works with a toggle
    this.menu.toggle('first');
  }

  //Method to create a new local
  async crearlocal() {

    //presentLioading is called
    this.presentLoading();
    const path = 'locales';
    const name = this.nuevoLocal.Nombre;

    //The image is saved in storageServices
    const res = await this.storageService.uploadImage(this.newFile, path, name);

    //The image is saved in the new Local
    this.nuevoLocal.imagen = res;

    //Get latitude and longitude
    const coords=await Geolocation.getCurrentPosition();
    this.nuevoLocal.ubicacion.lat=coords.coords.latitude;
    this.nuevoLocal.ubicacion.lng=coords.coords.longitude;

    //The local is saved in the database
    this.database.createDoc(this.nuevoLocal, this.path, this.nuevoLocal.id).then(res => {
      this.loading.dismiss();

      //The saved was a success
      this.presentToast('Se ha creado con éxito');
      //If there's an error...
    }).catch(error => {
      console.log(error);
      //It's shown in console there was a problem at saving
      this.presentToast('Ocurrió un error al crear el local');
    });
  }

  //Method for upload an image
  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.newImage = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  //Get the collection of all the suggests and save it in sugerencias
  getSugerencias() {
    try{
    this.database.getCollection<Sugerencia>(this.pathsug).subscribe(res => {
      this.sugerencias = res;
    });}catch(error){
      //If there is an error, it'll be shown in console
      console.log('error->', error);
    }
  }

  //Remove a suggest, it took an object Sugerencia named oportunidad as a parameter
  async eliminarSugerencia(oportunidad: Sugerencia) {
    //Alert
    const alert = await this.alertController.create({

      //Messages to be displayed
      cssClass: 'my-custom-class',
      header: 'Advertencia',
      message: '¿Seguro que deseas <strong>eliminar</strong> la sugerencia?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sí',
          handler: () => {
            //The deleting was confirmed and we'll be shown in console
            console.log('Confirm Okay');

            //The suggest is deleted in the database
            this.database.deleteDoc(this.pathsug, oportunidad.id).then(res => {

              //Toast displayed
              this.presentToast('Se ha eliminado la sugerencia');
              this.alertController.dismiss();
            }).catch(error => {
              //If there's any error it'll be catch
              console.log(error);

              //Toast displayed
              this.presentToast('Ocurrió un error al eliminar la sugerencia');
            });
          }
        }
      ]
    });
    await alert.present();
  }

  //Method to display a toast, it has a string has a parameter
  async presentToast(msg) {
    /*A constant is created with a toast controller
    The message is defined with the parameter and the duration
    is equals to 2000 milliseconds*/
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  //Method for display a loading message
  async presentLoading() {
    //A loading controller is created with a class and a message
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Procesando petición...',
    });
    await this.loading.present();
  }

  //Method for logout
  async logOut(){
    //The service is called with its method (logout)
    await this.authSvc.logout();
    this.router.navigate(['home']);
  }

  //Method that use a string as parameter
  //It gets the info of the user
  getUserInfo(uid:string){
    const path ='users';
    //Makes a search in the database and returns a response
    this.database.getDoc(path,uid).subscribe(res =>{
      console.log(res);
    });
  }

  //Method to get the use's position
  async getUserPosition(){
    //Gets the location by the method current position
    const coords=await Geolocation.getCurrentPosition();
    /*Gets the latitude and longitude and they are stored
    in the object's attributes*/
    this.latitud=coords.coords.latitude;
    this.longitud=coords.coords.longitude;
  }

}
