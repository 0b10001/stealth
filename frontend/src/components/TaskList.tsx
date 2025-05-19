import { useState, useEffect } from 'react';
import axios from 'axios';
import { Task } from '../types';

interface TaskListProps {
  userId: number;
}

const TaskList = ({ userId }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [userId]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/users/${userId}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/users/${userId}/tasks`, { title: newTask });
      setNewTask('');
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      <form onSubmit={handleCreateTask} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="New task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Add Task</button>
        </div>
      </form>

      <div className="list-group">
        {tasks.map((task) => (
          <div key={task.id} className="list-group-item">
            {task.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList; 