import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginWithGoogle() {
    this.auth
      .loginWithGoogle()
      .then((result) => {
        const credential = (<any>result).credential;
        return {
          token: credential.accessToken,
          user: result.user.uid
        };
      })
      .then((credential) => {
        //console.log(credential);
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
