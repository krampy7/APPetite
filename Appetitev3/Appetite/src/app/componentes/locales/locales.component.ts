import { Component, Input, OnInit } from '@angular/core';
import { Local } from 'src/app/models';
import { ModalController } from '@ionic/angular';
import { ComentariosComponent } from 'src/app/pages/comentarios/comentarios.component';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { User } from 'src/app/models';
import { MapaComponent } from 'src/app/pages/mapa/mapa.component';

@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.scss'],
})

//Class LocalesComponent
export class LocalesComponent implements OnInit {

  @Input() local: Local;
  idlocal='';

  //Constructor with services as parameters
  constructor(public modalController: ModalController,
    public authSvc: FirebaseauthService,
    public firebase: FirestoreService) {}

  //Object's attributes

  //User info
  user: User;
  autor = '';
  idUser = '';

  //Info for change the html
  tooglehearth:string;

  //The method that is run when
  async ngOnInit() {

    console.log("A component has started");

    this.authSvc.stateAuth().subscribe(res => {

      //If there is a user
      if (res != null) {

        //Get the values of the current user
        this.autor = res.displayName;
        this.idUser = res.uid;

        //Looks for the idUser in the local's array named likes
        const corazon = this.local.likes.indexOf(this.idUser);

        //If isn't found
        if (corazon == -1) {

          //The attribute of the object changes, so it can be changed in the HTML
          this.tooglehearth="heart-outline";
        }
        //If is found
        else {
          //The attribute of the object changes, so it can be changed in the HTML
          this.tooglehearth="heart";
        }
      }
    });
  }

  //Show the modal
  async presentModal() {
    const modal = await this.modalController.create({
      component: ComentariosComponent,
      cssClass: 'my-custom-class',
      componentProps: { local: this.local }
    });
    return await modal.present();
  }

  //Async method
  async mapa() {
    const modal = await this.modalController.create({
      component: MapaComponent,
      cssClass: 'my-custom-class',
      componentProps: { local: this.local }
    });
    return await modal.present();
  }

  //Toogle likes method
  toogleLike() {

    //Search the id user inside the array(likes) that has that specific local
    const corazon = this.local.likes.indexOf(this.idUser);

    //If is not found
    if (corazon == -1) {
      this.darMegusta();
    }
    //If it's found
    else {
      this.quitarMegusta();
    }

  }

  //Likes method
  darMegusta() {
    const path = 'Locales/';

    //Pushes the id of the user into se array-likes that is an attribute of local object/model
    this.local.likes.push(this.idUser);

    //Updates database with the object, path, local's id
    this.firebase.updateDoc(this.local, path, this.local.id);
  }

  //Remove like method
  quitarMegusta() {
    const path = 'Locales/';

    //It removes the like from the local model
    const eliminar = this.local.likes.indexOf(this.idUser);
    this.local.likes.splice(eliminar, 1);

    //Update the database
    this.firebase.updateDoc(this.local, path, this.local.id);
  }

  //Method that shows in console how much likes have a local
  mostrarLikes() {
    console.log('El local es: ->', this.local.Nombre, 'y tiene:', this.local.likes);
  }

}
