import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { User } from '../models';



@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {

  public user$:Observable<User>;

  constructor(public auth: AngularFireAuth, private afs: AngularFirestore) {
    this.getUid();
  }

  async login() {
    try {
      const { user } = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async logout() {
    try {
      await this.auth.signOut();
    } catch (error) {
      console.log('Error->', error);
    }
  }

  private updateUserData(user:User){
    const userRef:AngularFirestoreDocument<User>=this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid:user.uid,
      email:user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
    };
    return userRef.set(data, {merge:true});
  }

  async getUid() {
    const user = await this.auth.currentUser;
    if (user === null) {
      return null;
    }
    else {
      return user.uid;
    }
  }

  stateAuth() {
    return this.auth.authState
  }

}
