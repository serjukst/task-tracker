import { Observable } from 'rxjs';
import { ITask, IUser } from '../shared/interfaces';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  constructor(private afs: AngularFirestore) {}

  public getTasks(): Observable<ITask[]> {
    return this.afs
      .collection<ITask>('tasks')
      .valueChanges({ idField: 'customID' });
  }

  public getUsers(): Observable<IUser[]> {
    return this.afs
      .collection<IUser>('users')
      .valueChanges();
  }

  public addUser(user: IUser):void {
    this.afs.collection<IUser>('users').doc(user.uid).set(user);
  }

  public getCurrentUser(userId: string):Observable<IUser> {
    return this.afs.doc<IUser>(`users/${userId}`).valueChanges();
  }

  public addTask(task: ITask): void {
    const id = this.afs.createId();
    this.afs.collection<ITask>('tasks').doc(id).set(task);
  }

  public updateTaskById(task: ITask) {
    this.afs.doc<ITask>(`tasks/${task.customID}`).update(task);
  }

  public getTasksById(customID: string): Observable<ITask> {
    return this.afs.doc<ITask>(`tasks/${customID}`).valueChanges();
  }
}
