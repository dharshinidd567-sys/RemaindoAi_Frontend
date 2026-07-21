export type Category = 'All' | 'Work' | 'Personal' | 'Family' | 'Health';

export interface Task {
  id(id: any): void;
  taskId: string;
  _id: string;
  title: string;
  description?: string;
  category: Exclude<Category, 'All'>;
  priority?: 'Low' | 'Medium' | 'High';
  tag?: string;
  dueTime?: string;
  dueDate?: string;
  isOverdue: boolean;
  isDone: boolean;
  order: number;
  reminder?: string;
  repeat?: string;
  color?: any;
  emoji?: string;
  notes?: string;
}

export interface Summary {
  total: number;
  done: number;
  pending: number;
  overdue: number;
  percent: number;
}

export interface TasksResponse {
  tasks: Task[];
  summary: Summary;
}