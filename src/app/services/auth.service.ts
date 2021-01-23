import { IUser } from './../interfaces';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(public auth: AngularFireAuth) {}

  public loginWithEmail(user: IUser): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  public loginWithGoogle(): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  public signOut(): Promise<void> {
    return this.auth.signOut()
  }
}
