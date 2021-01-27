import { ISelectOptions, ITask } from './../../interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { take } from 'rxjs/internal/operators'
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  maxId: number;

  form: FormGroup;
  taskTypes: ISelectOptions[] = [
    { value: 'feature', viewValue: 'New Feature' },
    { value: 'epic', viewValue: 'Epic' },
    { value: 'story', viewValue: 'User Story' },
    { value: 'task', viewValue: 'Task' },
    { value: 'bug', viewValue: 'Bug' },
  ];

  priorityTypes: ISelectOptions[] = [
    { value: 'major', viewValue: 'Major' },
    { value: 'trivial', viewValue: 'Trivial' },
    { value: 'blocker', viewValue: 'Blocker' },
    { value: 'critical', viewValue: 'Critical' },
    { value: 'minor', viewValue: 'Minor' },
  ];

  constructor(private fs: FirestoreService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      summary: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      type: new FormControl(this.taskTypes[0].value),
      priority: new FormControl(this.priorityTypes[0].value),
      assignee: new FormControl('Unassigned'),
      dueDate: new FormControl(),
    });

    this.fs.getTask()
    .pipe(take(1))
    .subscribe((result) => {
      const taskIds: number[] = result.map(task => task.id);
      this.maxId = Math.max(...taskIds);
    })
  }

  submit() {
    const newTask: ITask = {
      ...this.form.value,
      title: 'Task',
      labels: ['bug'],
      id: this.maxId + 1,
      status: 'todo',
    };
    this.fs.addTask(newTask);
  }
}
