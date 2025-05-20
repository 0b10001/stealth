import { useState, useEffect } from "react";
import axios from "axios";
import { Task } from "../types";
import React from "react";

interface TaskListProps {
  userId: number;
}

const TaskList = ({ userId }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);
  const [sortField, setSortField] = useState<keyof Task>("title");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [userId]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `https://stealth-tybu.onrender.com/users/${userId}/tasks`,
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://stealth-tybu.onrender.com/users/${userId}/tasks`,
        {
          title: newTask,
        },
      );
      setNewTask("");
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleSort = (field: keyof Task) => {
    setSortField(field);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Tasks</h2>
      <form onSubmit={handleCreateTask} className="mb-4">
        <div className="input-group">
          <input
            required
            type="text"
            className="form-control"
            placeholder="New task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </div>
      </form>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Filter tasks..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="list-group">
        {currentTasks.map((task) => (
          <div key={task.id} className="list-group-item">
            {task.title}
          </div>
        ))}
      </div>

      <nav>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(sortedTasks.length / tasksPerPage) }).map((_, index) => (
            <li key={index} className="page-item">
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TaskList;
