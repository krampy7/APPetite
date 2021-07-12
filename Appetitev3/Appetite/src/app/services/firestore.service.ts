import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

//Class FireStoreService
export class FirestoreService {

  //Constructor with Angular elements
  constructor(public database:AngularFirestore) { }

  //All the following methods are for modifying, creating or deleting in the database

  //Creates a new element
  createDoc(data: any, path: string, id: string){
    //Gets collection of the path of the database
    const collection = this.database.collection(path);
    //Returns the collection with the id and the data that the user put
    return collection.doc(id).set(data);
   }

   //Gets the info a new element
   getDoc(path:string, id:string){
    //Gets collection of the path of the database
    const collection = this.database.collection(path);
    //Returns the collection with the id
    return collection.doc(id).valueChanges();
   }

   //Deletes an element
   deleteDoc(path: string,id: string){
    //Gets collection of the path of the database
    const collection = this.database.collection(path);
    //Collection's elements with an specific ID are removed
    return collection.doc(id).delete();
   }

   //Updates an element
   updateDoc(data: any, path: string,id: string){
    //Gets collection of the path of the database
    const collection = this.database.collection(path);
    //Returns the updated collection with the id
    return collection.doc(id).update(data);
   }

   //Creates a new id
   getId(){
     return this.database.createId();
   }

   //Gets a collection of the database
   getCollection <tipo> (path:string){
     //Gets collection of the path of the database
     const collection =this.database.collection<tipo>(path);
     //Returns the collection with the id
     return collection.valueChanges();
   }

   //Gets an entire collection of the database
   getCollectionAll<tipo>(path, parametro:string,condicion:any,busqueda:string,startAt:any){
     if(startAt==null){
       startAt=new Date();
     }
     const collection =this.database.collectionGroup<tipo>(path,ref => ref.where(parametro,condicion,busqueda)
     .orderBy('fecha','asc')
     .limit(1)
     .startAfter(startAt)
     );
   }

   //Gets a paged collection
   getCollectionPaginada<tipo>(path: string, limit:number){
    const collection =this.database.collection<tipo>(path, ref => ref
    .orderBy('fecha','desc')
    .limit(limit)
    );
    return collection.valueChanges();
  }

}
