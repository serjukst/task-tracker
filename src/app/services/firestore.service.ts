import { Observable } from 'rxjs';
import { ITask } from './../interfaces';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  private taskCollections: AngularFirestoreCollection<ITask>;
  public tasks: Observable<ITask[]>;

  constructor(private fs: AngularFirestore) {
    this.taskCollections = fs.collection<ITask>('tasks');
    this.tasks = this.taskCollections.valueChanges();
  }

  public addTask(task: ITask): void {
    this.taskCollections.add(task);
  }
}
