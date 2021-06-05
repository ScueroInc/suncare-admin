import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weuvadmin';
  dermatologos: Observable<any[]>;
  constructor (private firestore: AngularFirestore){
    this.dermatologos = firestore.collection('dermatologos').valueChanges();
  }
}
