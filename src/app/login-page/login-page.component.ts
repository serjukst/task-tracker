import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirestoreService } from './../services/firestore.service';
import { AuthService } from './../services/auth.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private fs: FirestoreService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginWithGoogle() {
    this.auth
      .loginWithGoogle()
      .then((result) => {
        const { uid, email, displayName } = result.user;
        this.fs.addUser({ uid, email, displayName });
        this.router.navigate(['dashboard']);
      })
      .catch((error) => {
        this.snackBar.open(error.message, null, {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      });
  }
}
