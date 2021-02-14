import { Observable } from 'rxjs';
import { ITask, IUser } from '../shared/interfaces';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  private taskColection: AngularFirestoreCollection<ITask>;
  private userColection: AngularFirestoreCollection<IUser>;
  public tasks: Observable<ITask[]>;
  public users: Observable<IUser[]>;

  constructor(private afs: AngularFirestore) {
    this.taskColection = afs.collection<ITask>('tasks');
    this.userColection = afs.collection<IUser>('users');

    this.tasks = this.taskColection.valueChanges({ idField: 'customID' });
    this.users = this.userColection.valueChanges();
  }

  public addUser(user: IUser):void {
    this.userColection.doc(user.uid).set(user);
  }

  public getCurrentUser(userId: string):Observable<IUser> {
    return this.afs.doc<IUser>(`users/${userId}`).valueChanges();
  }

  public addTask(task: ITask): void {
    const id = this.afs.createId();
    this.taskColection.doc(id).set(task);
  }

  public updateTaskById(task: ITask): void {
    this.afs.doc<ITask>(`tasks/${task.customID}`).update(task);
  }

  public getTasksById(customID: string): Observable<ITask> {
    return this.afs.doc<ITask>(`tasks/${customID}`).valueChanges();
  }
}
