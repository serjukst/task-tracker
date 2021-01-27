import { Observable } from 'rxjs';
import { ITask, IUser } from './../interfaces';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  constructor(private afs: AngularFirestore) {}

  public getTask(): Observable<ITask[]> {
    return this.afs
      .collection<ITask>('tasks')
      .valueChanges({ idField: 'customID' });
  }

  public addUser(user: IUser):void {
    this.afs.collection<IUser>('users').doc(user.uid).set(user);
  }

  public getCurrentUser(userId):Observable<IUser> {
    return this.afs.doc<IUser>(`users/${userId}`).valueChanges();
  }

  public addTask(task: ITask): void {
    const id = this.afs.createId();
    this.afs.collection<ITask>('tasks').doc(id).set(task);
  }

  public updateTaskById(task: ITask) {
    this.afs.doc<ITask>(`tasks/${task.customID}`).update(task);
  }

  public getTaskById(customID: string): Observable<ITask> {
    return this.afs.doc<ITask>(`tasks/${customID}`).valueChanges();
  }
}
