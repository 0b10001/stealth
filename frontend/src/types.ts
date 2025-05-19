export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Task {
  id: number;
  user_id: number;
  title: string;
  completed: boolean;
} 