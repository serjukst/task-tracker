export interface IUser {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

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
}

export interface ISelectOptions {
  value: string;
  viewValue: string;
}
