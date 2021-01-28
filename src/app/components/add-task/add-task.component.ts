import { takeUntil } from 'rxjs/operators';
import { ITask } from './../../interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit, OnDestroy {
  private unsub$ = new Subject<void>();
  public nextSequence: number;
  public form: FormGroup;

  public taskTypes: { value: string }[] = [
    { value: 'New Feature' },
    { value: 'Epic' },
    { value: 'User Story' },
    { value: 'Task' },
    { value: 'Bug' },
  ];

  public priorityTypes: { value: string }[] = [
    { value: 'Major' },
    { value: 'Trivial' },
    { value: 'Blocker' },
    { value: 'Critical' },
    { value: 'Minor' },
  ];

  public usersList = [{ value: 'Unassigned' }];

  constructor(private fs: FirestoreService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('Task', [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      summary: new FormControl(null),
      type: new FormControl(this.taskTypes[0].value),
      priority: new FormControl(this.priorityTypes[0].value),
      assignee: new FormControl(this.usersList[0].value),
      dueDate: new FormControl(new Date()),
    });

    this.fs
      .getTasks()
      .pipe(takeUntil(this.unsub$))
      .subscribe((result) => {
        this.nextSequence = result.length + 1;
      });

    this.fs
      .getUsers()
      .pipe(takeUntil(this.unsub$))
      .subscribe((result) => {
        result.forEach((user) => {
          this.usersList.push({ value: user.displayName });
        });
      });
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  public submit(): void {
    const newTask: ITask = {
      ...this.form.value,
      sequence: this.nextSequence,
      status: 'todo',
      resolution: 'Unresolved',
      created: new Date(),
    };
    this.fs.addTask(newTask);
  }
}
