import { Component } from '@angular/core';
import { Auth,
         createUserWithEmailAndPassword,
         signInWithEmailAndPassword } from '@angular/fire/auth';

import {
  addDoc,
  Firestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angular-firebase-auth';
  public data: any = []

  // constructor(private auth: Auth) {
  //   //this.getData()
  // }

  constructor(private firestore: Firestore) {
    this.getData()
  }

   getData() {
    const dbInstance = collection(this.firestore, 'users');
    getDocs(dbInstance)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })];
        console.log('Data ' + this.data);
      })
  }

  addData(value: any) {
     const dbInstance = collection(this.firestore, 'users');
     addDoc(dbInstance, value)
       .then(() => {
         alert('Data Sent')
       })
       .catch((err) => {
         alert(err.message)
       })
  }

  handlerLogin(value: any){
    // signInWithEmailAndPassword(this.auth, value.email, value.password)
    // .then((response: any) => {
    //   console.log(response.user);
    // })
    // .catch((error: any) => {
    //   console.log(error.message);
    // });
  }

  handlerRegister(value: any){
    // createUserWithEmailAndPassword(this.auth, value.email, value.password)
    // .then((response: any) => {
    //   alert(response.user);
    // })
    // .catch((error: any) => {
    //   alert(error.message);
    // });
  }

   updateData(id: string) {
    const dataToUpdate = doc(this.firestore, 'users', id);
    updateDoc(dataToUpdate, {
      name: 'Nishant',
      email: 'Nishant123@gmail.com'
    })
      .then(() => {
        alert('Data updated');
        this.getData()
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  deleteData(id: string) {
    const dataToDelete = doc(this.firestore, 'users', id);
    deleteDoc(dataToDelete)
    .then(() => {
      alert('Data Deleted');
      this.getData()
    })
    .catch((err) => {
      alert(err.message)
    })
  }


}
