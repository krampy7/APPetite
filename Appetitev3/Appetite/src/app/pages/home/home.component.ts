import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { User } from './../../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

//Class HomeComponent
export class HomeComponent implements OnInit {

  //Interface user
   user:User;

  //Constructor with services
  constructor(public authSvc:FirebaseauthService,
    private router: Router) {}

  //ngOnit()
  async ngOnInit() {
    //Subscription
    this.authSvc.stateAuth().subscribe(res=>{
      //If there is no user
      if(res === null){
        console.log('No has inicido sesión')

      }
      //If there is a user
      else{
        //If user's id is equals to dWoZ8iNFmeUfAL3eNWUEVPH9IrC3
        if (res.uid === 'dWoZ8iNFmeUfAL3eNWUEVPH9IrC3') {
          //Redirect to admin page
          this.router.navigate(['admin']);
        }
        //If it's not dWoZ8iNFmeUfAL3eNWUEVPH9IrC3
        else{
          //Redirect to page lista
          this.router.navigate(['tabs/lista']);
        }
      }
    });
  }

  //onLoginGoogle method
  async onLoginGoogle(){
    try{
      //Method login() is being called
      this.user = await this.authSvc.login();
      //If there is a user
      if (this.user) {
        //Display in console the id of the user
        console.log('user->', this.user.uid);
        //Calls the method redirectUser from the actual object
        this.redirectUser(this.user.uid);
      }
    }
    //If there is an error
    catch (error){
      //Display error in console
      console.log('Error->', error);
    }
  }

  //Method with an user's id as a parameter
  private redirectUser(user_id:string){
    //If the user's id is dWoZ8iNFmeUfAL3eNWUEVPH9IrC3
    if (user_id == 'dWoZ8iNFmeUfAL3eNWUEVPH9IrC3') {
      //Redirect to page admin
      this.router.navigate(['admin']);
    }
    else{
      //Redirect to page lista
      this.router.navigate(['tabs/lista']);
    }
  }
}
