import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from 'src/app/models';
import { Router } from '@angular/router';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private menu: MenuController,
    public authSvc:FirebaseauthService,
    private router: Router) { }

  user$: Observable<User>=this.authSvc.auth.user;

  ngOnInit(){}

  openMenu() {
    this.menu.toggle('first');
  }

  async logOut(){
    await this.authSvc.logout();
    this.router.navigate(['home']);
  }

}
