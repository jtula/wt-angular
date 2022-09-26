import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  loading: boolean = false;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  async login(email: string, password: string) {
    try {
      const result = await this.afAuth
        .signInWithEmailAndPassword(email, password);
      this.setUserData(result.user);
      this.afAuth.authState.subscribe((user_1) => {
        if (user_1) {
          this.router.navigate(['dashboard']);
        }
      });
    } catch (error: any) {
      window.alert(error.message);
    }
  }
 
  get isLoading(): boolean {
    return this.loading;
  }
    
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified === true ? true : false;
  }

  
  async googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider()).then(() => {
      this.router.navigate(['projects']);
    });
  }
  
  async authLogin(provider: any) {
    this.loading = true;
    try {
      const result = await this.afAuth
        .signInWithPopup(provider);
      this.router.navigate(['dashboard']);
      this.setUserData(result.user);
    } catch (error) {
      window.alert(error);
    }
    this.loading = false;
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  
  logout() {
    this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}