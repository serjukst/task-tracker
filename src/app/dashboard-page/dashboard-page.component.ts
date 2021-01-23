import { ITask } from './../interfaces';
import { FirestoreService } from './../services/firestore.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddTaskComponent } from '../components/add-task/add-task.component';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  public tasks: ITask[];
  public countToDoTask: number;
  public countProgressTask: number;
  public countReviewTask: number;
  public countDoneTask: number;

  constructor(
    private firestoreService: FirestoreService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.sub.add(
      this.firestoreService.tasks.subscribe((result) => {
        this.tasks = result
        this.countToDoTask = result.filter( (el) => el.status === 'todo').length
        this.countProgressTask = result.filter( (el) => el.status === 'progress').length
        this.countReviewTask = result.filter( (el) => el.status === 'review').length
        this.countDoneTask = result.filter( (el) => el.status === 'done').length
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddTaskComponent);
  }
}
