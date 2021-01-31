import { takeUntil } from 'rxjs/operators';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import firebase from 'firebase/app';
import { IUser } from './shared/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  unsub$ = new Subject<void>();
  authState: firebase.User;
  user: IUser;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fs: FirestoreService
  ) {}

  ngOnInit(): void {
    this.auth.authState.pipe(takeUntil(this.unsub$)).subscribe((result) => {
      this.authState = result;
      if (result) {
        this.fs
          .getCurrentUser(result.uid)
          .pipe(takeUntil(this.unsub$))
          .subscribe((user) => {
            this.user = user;
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  signOut() {
    this.unsub$.next();
    this.unsub$.complete();
    this.user = null;
    this.router.navigate(['/login']);
    this.auth.signOut().catch(err => console.log(err));
  }
}
