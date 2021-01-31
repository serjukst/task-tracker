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

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  private unsub$ = new Subject<void>();
  public tasks: ITask[];

  public toDoTasks: ITask[];
  public progressTasks: ITask[];
  public reviewTasks: ITask[];
  public doneTasks: ITask[];

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
          this.toDoTasks = [];
          this.progressTasks = [];
          this.reviewTasks = [];
          this.doneTasks = [];
          result.forEach((task) => {
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

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log(event.container);
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

  openDialog() {
    this.dialog.open(AddTaskComponent);
  }
}
