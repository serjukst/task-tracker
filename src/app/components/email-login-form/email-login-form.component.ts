import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-email-login-form',
  templateUrl: './email-login-form.component.html',
  styleUrls: ['./email-login-form.component.scss'],
})
export class EmailLoginFormComponent implements OnInit {
  public form: FormGroup;
  public hide = true;
  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
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

    this.auth
      .loginWithEmail(user)
      .then((result) => {
        //console.log(result.user.uid);
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
