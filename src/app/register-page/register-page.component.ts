import { FirestoreService } from './../services/firestore.service';
import { AuthService } from '../services/auth.service';
import { IUser } from '../shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  public form: FormGroup;
  public hide = true;
  constructor(
    private auth: AuthService,
    private fs: FirestoreService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      displayName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  public async submit(): Promise<void> {
    if (this.form.invalid) {
      return;
    }

    const user: IUser = this.form.value;

    this.auth.register(user.email, user.password)
      .then((result) => {
        const { email, displayName } = user
        this.fs.addUser({ uid: result.user.uid, email, displayName });
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
