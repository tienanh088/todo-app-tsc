export type TPriority = {
  priority: 'high' | 'medium' | 'low';
}

export interface ITask extends TPriority {
  id?: number;
  title: string;
  isDone: boolean;
  createdAt: number;
  updatedAt: number;
}
