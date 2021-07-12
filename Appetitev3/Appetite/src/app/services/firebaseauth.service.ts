import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})

//Class FirebaseauthService
export class FirebaseauthService {

  //Observable
  public user$:Observable<User>;

  //Constructor with Angular elements
  constructor(public auth: AngularFireAuth, private afs: AngularFirestore) {
    //Calls method getUid
    this.getUid();
  }

  //Login Async-method
  async login() {
    try {
      //Get user information by Google Provider
      const { user } = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.updateUserData(user);
      //Calls updateUserData method with the user as a parameter
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  //Logout method
  async logout() {
    try {
      //Calls method signout
      await this.auth.signOut();
    } catch (error) {
      console.log('Error->', error);
    }
  }

  //updateUserData
  private updateUserData(user:User){
    //Get the userReference
    const userRef:AngularFirestoreDocument<User>=this.afs.doc(`users/${user.uid}`);
    //Create object data with interface User
    const data: User = {
      uid:user.uid,
      email:user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
    };
    //Set userRef to
    return userRef.set(data, {merge:true});
  }

  //Get user id method
  async getUid() {
    //Get the current user
    const user = await this.auth.currentUser;
    //If there is no user, return null
    if (user === null) {
      return null;
    }
    else {
      //Else, return user id
      return user.uid;
    }
  }

  stateAuth() {
    return this.auth.authState
  }

}
