import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Local } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})

//Class ListaComponent
export class ListaComponent implements OnInit {

  //Array called locales that saves all the locals
  locales: Local[] = [];

  private path = 'Locales/';

  //Constructor with services loaded
  constructor(public modalController: ModalController,
    public database:FirestoreService,) { }

  //When the page starts, method getLocales will be called
  ngOnInit() {
    this.getLocales();
  }

  //Method getLocales
  getLocales() {
    //Gets all the locales from the database and store them in the array locales
    this.database.getCollection<Local>(this.path).subscribe(res => {
      this.locales = res;
    });
  }

}
