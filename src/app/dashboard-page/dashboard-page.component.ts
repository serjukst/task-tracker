import { ITask } from '../shared/interfaces';
import { FirestoreService } from './../services/firestore.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { AddTaskComponent } from '../components/add-task/add-task.component';
import { takeUntil } from 'rxjs/internal/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  private unsub$ = new Subject<void>();
  public tasks: ITask[];
  public countToDoTask: number;
  public countProgressTask: number;
  public countReviewTask: number;
  public countDoneTask: number;

  constructor(
    private fs: FirestoreService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fs
      .getTasks()
      .pipe(takeUntil(this.unsub$))
      .subscribe(
        (result) => {
          this.tasks = result;
          this.countToDoTask = result.filter(
            (el) => el.status === 'To Do'
          ).length;
          this.countProgressTask = result.filter(
            (el) => el.status === 'In Progress'
          ).length;
          this.countReviewTask = result.filter(
            (el) => el.status === 'In Review'
          ).length;
          this.countDoneTask = result.filter(
            (el) => el.status === 'Done'
          ).length;
        },
        (err) => {
          if (err.code === 'permission-denied') {
            this.router.navigate(['/login']);
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  openDialog() {
    this.dialog.open(AddTaskComponent);
  }
}
