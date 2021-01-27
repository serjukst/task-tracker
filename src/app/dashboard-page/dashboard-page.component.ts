import { ITask } from './../interfaces';
import { FirestoreService } from './../services/firestore.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { AddTaskComponent } from '../components/add-task/add-task.component';
import { takeUntil } from 'rxjs/internal/operators';

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

  constructor(private fs: FirestoreService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fs
      .getTask()
      .pipe(takeUntil(this.unsub$))
      .subscribe((result) => {
        this.tasks = result;
        this.countToDoTask = result.filter((el) => el.status === 'todo').length;
        this.countProgressTask = result.filter(
          (el) => el.status === 'progress'
        ).length;
        this.countReviewTask = result.filter(
          (el) => el.status === 'review'
        ).length;
        this.countDoneTask = result.filter((el) => el.status === 'done').length;
      });
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  openDialog() {
    this.dialog.open(AddTaskComponent);
  }
}
