export interface ITask {
  title: string;
  description: string;
  labels?: String[];
  priority: string;
  reporter: string;
  resolution: string;
  status: string;
  type: string;
  assignee: string;
  created: Date;
  updated: Date;
  id: number;
  customID: string;
}

export interface ISelectOptions {
  value: string;
  viewValue: string;
}

export interface IUser {
  uid: string;
  email: string;
  displayName: string;
  password?: string;
}