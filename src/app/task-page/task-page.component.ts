import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ISelectOptions, ITask } from './../interfaces';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent implements OnInit, OnDestroy {
  panelOpenState = false;
  public task: ITask;
  public form: FormGroup =new FormGroup({
    summary: new FormControl('', [Validators.required]),
    description: new FormControl(),
    type: new FormControl(),
    priority: new FormControl(),
    assignee: new FormControl(),
    status: new FormControl(),
    resolution: new FormControl(),
    dueDate: new FormControl(),
    title: new FormControl('', [Validators.required]),
  });
  sub: Subscription;

  taskStatus: ISelectOptions[] = [
    { value: 'todo', viewValue: 'To Do' },
    { value: 'progress', viewValue: 'In Progress' },
    { value: 'review', viewValue: 'In Review' },
    { value: 'done', viewValue: 'Done' },
  ]

  taskResolution: ISelectOptions[] = [
    { value: 'resolved', viewValue: 'Resolved' },
    { value: 'unresolved', viewValue: 'Unresolved' },
  ]

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

  constructor(private route: ActivatedRoute, private fs: FirestoreService) { 
    
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params:Params) => {
      this.fs.tasks.subscribe( (tasks: ITask[]) => {
        this.task = tasks.find(task => task.id === +params.id);
        this.form.setValue({
          summary: this.task.title,
          description: this.task.description,
          type: this.task.type,
          priority: this.task.priority,
          assignee: this.task.assignee,
          status: this.task.status,
          resolution: this.task.resolution || 'Unresolved',
          dueDate: 1/22/2021,
          title: this.task.title,
        });
    });
  })
 
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  submit() {
  }

}
