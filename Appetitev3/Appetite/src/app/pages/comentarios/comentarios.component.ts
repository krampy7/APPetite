import { FirestoreService } from './../../services/firestore.service';
import { Comentario, Local } from 'src/app/models';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { User } from 'src/app/models';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss'],
})

//Class ComentariosComponent
export class ComentariosComponent implements OnInit {

  //Local interface is inserted
  @Input() local: Local;

  //Attribute comentario is declared
  comentario = '';

   //Array that contains comentarios
  comentarios:Comentario []=[];

  //COnstrucor with all the services
  constructor(public modalController: ModalController,
    public authSvc: FirebaseauthService,
    public firebase: FirestoreService) { }

  //Observable
  user$: Observable<User> = this.authSvc.auth.user;

  //Attribute user
  user:User;

  //Attributes for stored user's photo and name
  autor='';
  photo='';

  //ngOnit
  async ngOnInit() {
    //Subscription
    this.authSvc.stateAuth().subscribe(res=>{
      //If there is a user
      if(res != null){
        //User's name and photo are obtained
        this.autor=res.displayName;
        this.photo=res.photoURL;
      }
    });
    //The method loadComentarios is called
    this.loadComentarios();
  }

  //Method for closing the modal
  closeModal() {
    //The modal controller is being dismissed
    this.modalController.dismiss();
  }

  //Method loadComentarios
  loadComentarios(){
    let startAt= null;
    if (this.comentarios.length){
      startAt=this.comentarios[this.comentarios.length-1].fecha
    }
    const path = 'Locales/' + this.local.id + '/comentarios';
    //Get the collection of comments form the database
    this.firebase.getCollectionPaginada<Comentario>(path, 200).subscribe (res => {
      if(res.length){
        //Teh collection will pass to the array comentarios
        this.comentarios=res;
      }
    });
  }

  //Method comentar
  comentar() {
    //Get the actual comentario and make it a constant
    const comentario = this.comentario;
    //Display the comment in console
    console.log("El comentario es ", comentario);
    const path = 'Locales/' + this.local.id + '/comentarios';
    //We insert the user's data to data
    const data: Comentario = {
      autor:this.autor,
      foto:this.photo,
      comentario, //se pone una sola linea pues es la misma variable
      fecha: new Date(),
      //All the method getId from service
      id:this.firebase.getId()
    }
    //Pushes the new comment to the database
    this.firebase.createDoc(data,path,data.id).then(()=>{
      console.log('Comentario Enviado');
    });
    //The comment is uploaded
    this.comentario = '';
  }

}
