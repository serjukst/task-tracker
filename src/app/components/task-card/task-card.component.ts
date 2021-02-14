import { Component, Input, OnInit } from '@angular/core';
import { ITask } from '../../shared/interfaces';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input() task: ITask;

  constructor() {}

  ngOnInit(): void {}
}
