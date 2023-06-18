import { Injectable } from '@angular/core';
import { collectionData, doc, docData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc } from '@firebase/firestore';
import { Observable, Subject } from 'rxjs';
import { IProfile } from './Profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  city = new Subject<string | undefined>();
  
  constructor(private firestore: Firestore) { }

  addProfile(profile: IProfile) {
    const profileRef = collection(this.firestore, 'profiles');
    return addDoc(profileRef, profile);
  }

  getProfile(): Observable<IProfile[]> {
    const profileRef = collection(this.firestore, 'profiles');
    return collectionData(profileRef, {idField:'id'}) as Observable<IProfile[]>;
  }

  deleteProfile(profile: IProfile) {
    const docRef=doc(this.firestore, `profiles/${profile.id}`);
    return deleteDoc(docRef);
  }

  specificProfile(profile: IProfile) {
    const ref=doc(this.firestore, `profiles/${profile.id}`);
    return docData(ref, {idField:'id'}) as Observable<IProfile>; 
  }
}
