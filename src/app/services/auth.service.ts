import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData : Observable<any>;
  
  constructor( public fireAuth: AngularFireAuth) {
    this.userData = fireAuth.authState;
  }

  async signIn(email:string, password: string){
    try {
      return await this.fireAuth.signInWithEmailAndPassword(email, password);
    } catch(error){
      console.log(error);
      return error;      
    }
  }

  async register(email:string, password: string){
    try {
      return await this.fireAuth.createUserWithEmailAndPassword(email, password);
    } catch(error){
      console.log(error);
    }
  }
  async logout(){
    await this.fireAuth.signOut();
  }
}
