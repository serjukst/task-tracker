import {
  taskResolution,
  taskTypes,
  priorityTypes,
  taskStatus,
} from './../shared/constants';
import { ISelectionOptions, ITask } from './../shared/interfaces';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss'],
})
export class TaskPageComponent implements OnInit, OnDestroy {
  private unsub$ = new Subject<void>();

  public task: ITask;
  public form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    summary: new FormControl(),
    type: new FormControl(),
    priority: new FormControl(),
    assignee: new FormControl(),
    status: new FormControl(),
    resolution: new FormControl(),
    dueDate: new FormControl(),
  });

  public taskStatus: ISelectionOptions[] = taskStatus;
  public taskResolution: ISelectionOptions[] = taskResolution;
  public taskTypes: ISelectionOptions[] = taskTypes;
  public priorityTypes: ISelectionOptions[] = priorityTypes;
  public usersList: ISelectionOptions[] = [{ value: 'Unassigned' }];

  constructor(private route: ActivatedRoute, private fs: FirestoreService) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.unsub$))
      .subscribe((params: Params) => {
        this.fs
          .getTasksById(params.id)
          .pipe(takeUntil(this.unsub$))
          .subscribe((task: ITask) => {
            this.task = task;
            console.log(task);
            this.form.setValue({
              title: task.title,
              description: task.description,
              summary: task?.summary,
              type: task?.type,
              priority: task?.priority,
              assignee: task?.assignee,
              status: task?.status,
              resolution: task?.resolution,
              dueDate: new Date(task.dueDate),
            });
          });
      });

    this.fs
      .getUsers()
      .pipe(takeUntil(this.unsub$))
      .subscribe((result) => {
        result.forEach((user) => {
          const isDublicateUser = this.usersList.find(
            (el) => el.value === user.displayName
          );
          if (isDublicateUser) {
            return;
          }

          this.usersList.push({ value: user.displayName });
        });
      });
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  submit() {}
}
