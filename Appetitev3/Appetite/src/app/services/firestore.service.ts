import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public database:AngularFirestore) { }

  createDoc(data: any, path: string, id: string){
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);
   }

   getDoc(path:string, id:string){
     const collection = this.database.collection(path);
     return collection.doc(id).valueChanges();
   }

   deleteDoc(path: string,id: string){
     const collection = this.database.collection(path);
     return collection.doc(id).delete();
   }

   updateDoc(data: any, path: string,id: string){
     const collection = this.database.collection(path);
     return collection.doc(id).update(data);
   }

   getId(){
     return this.database.createId();
   }

   getCollection <tipo> (path:string){
     const collection =this.database.collection<tipo>(path);
     return collection.valueChanges();
   }

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

   getCollectionPaginada<tipo>(path: string, limit:number){
    const collection =this.database.collection<tipo>(path, ref => ref
    .orderBy('fecha','desc')
    .limit(limit)
    );
    return collection.valueChanges();
  }

}
