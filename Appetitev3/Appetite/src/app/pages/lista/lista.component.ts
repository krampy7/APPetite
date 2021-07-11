import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Local } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {

  locales: Local[] = [];

  private path = 'Locales/';

  constructor(public modalController: ModalController,
    public database:FirestoreService,) { }

  ngOnInit() {
    this.getLocales();
  }

  getLocales() {
    this.database.getCollection<Local>(this.path).subscribe(res => {
      this.locales = res;
    });
  }

}
