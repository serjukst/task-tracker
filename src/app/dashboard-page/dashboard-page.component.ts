import { AuthService } from './../services/auth.service';
import { ITask } from '../shared/interfaces';
import { FirestoreService } from './../services/firestore.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { AddTaskComponent } from '../components/add-task/add-task.component';
import { takeUntil } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  private unsub$ = new Subject<void>();
  private currentUser;
  public isFilterEnable = false;
  public tasks: ITask[];

  public toDoTasks: ITask[];
  public progressTasks: ITask[];
  public reviewTasks: ITask[];
  public doneTasks: ITask[];

  constructor(
    private fs: FirestoreService,
    public dialog: MatDialog,
    private router: Router,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fs
      .getTasks()
      .pipe(takeUntil(this.unsub$))
      .subscribe(
        (result) => {
          this.tasks = result;
          this.filterTasks(this.tasks);
        },
        (err) => {
          if (err.code === 'permission-denied') {
            this.router.navigate(['/login']);
          }
        }
      );
    this.auth.authState
      .pipe(takeUntil(this.unsub$))
      .subscribe((res) => (this.currentUser = res.displayName));
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  public drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const dropedTask: any = event.container.data[event.currentIndex];

      switch (event.container.id) {
        case 'cdk-drop-list-0':
          dropedTask.status = 'To Do';
          break;
        case 'cdk-drop-list-1':
          dropedTask.status = 'In Progress';
          break;
        case 'cdk-drop-list-2':
          dropedTask.status = 'In Review';
          break;
        case 'cdk-drop-list-3':
          dropedTask.status = 'Done';
          break;
      }
      this.fs.updateTaskById(dropedTask);
    }
  }

  public showCurrentUserTasks(): void {
    const filterTasksByCurrentUser = this.tasks.filter(
      (task) => task.assignee === this.currentUser
    );

    if (filterTasksByCurrentUser.length) {
      this.filterTasks(filterTasksByCurrentUser);
      this.isFilterEnable = true;
    } else {
      this.snackBar.open('You haven`t any assigned tasks', null, {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

  public showAllTasks(): void {
    this.filterTasks(this.tasks);
    this.isFilterEnable = false;
  }

  public openDialog(): void {
    this.dialog.open(AddTaskComponent);
  }

  private filterTasks(tasks: ITask[]): void {
    this.toDoTasks = [];
    this.progressTasks = [];
    this.reviewTasks = [];
    this.doneTasks = [];

    tasks.forEach((task) => {
      switch (task.status) {
        case 'To Do':
          this.toDoTasks.push(task);
          break;
        case 'In Progress':
          this.progressTasks.push(task);
          break;
        case 'In Review':
          this.reviewTasks.push(task);
          break;
        case 'Done':
          this.doneTasks.push(task);
          break;
      }
    });
  }
}
