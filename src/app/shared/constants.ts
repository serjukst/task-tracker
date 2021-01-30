import { ISelectionOptions } from './interfaces';

export const taskStatus: ISelectionOptions[] = [
  { value: 'To Do' },
  { value: 'In Progress' },
  { value: 'In Review' },
  { value: 'Done' },
];

export const taskResolution: ISelectionOptions[] = [
  { value: 'Unresolved' },
  { value: 'Resolved' },
];

export const taskTypes: ISelectionOptions[] = [
  { value: 'New Feature' },
  { value: 'Epic' },
  { value: 'User Story' },
  { value: 'Task' },
  { value: 'Bug' },
];

export const priorityTypes: ISelectionOptions[] = [
  { value: 'Major' },
  { value: 'Trivial' },
  { value: 'Blocker' },
  { value: 'Critical' },
  { value: 'Minor' },
];
