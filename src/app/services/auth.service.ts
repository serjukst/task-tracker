import { IUser } from './../interfaces';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  authState: Observable<firebase.User>;

  constructor(public auth: AngularFireAuth) {
    this.authState = auth.authState;
  }

  public register(email: string, password: string):Promise<firebase.auth.UserCredential> {
    return this.auth.createUserWithEmailAndPassword(email, password)

  }

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
