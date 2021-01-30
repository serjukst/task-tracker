export interface ITask {
  title: string;
  description: string;  
  summary: string;  
  priority: string;
  resolution: string;
  status: string;
  type: string;
  assignee: string;
  created: Date;
  updated: Date;
  dueDate: Date;
  sequence: number;
  customID: string;
}

export interface IUser {
  uid: string;
  email: string;
  displayName: string;
  password?: string;
}

export interface ISelectOptions {
  value: string;
  viewValue: string;
}

export interface ISelectionOptions {
  value: string;
}