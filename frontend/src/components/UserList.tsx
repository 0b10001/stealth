import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "../types";
import TaskList from "./TaskList";
import Weather from "./Weather";
import React from "react";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://stealth-tybu.onrender.com/users",
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("https://stealth-tybu.onrender.com/users", newUser);
      setNewUser({ name: "", email: "" });
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(filter.toLowerCase()) ||
    user.email.toLowerCase().includes(filter.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <Weather />
          <h2>Create User</h2>
          <form onSubmit={handleCreateUser}>
            <div className="mb-3">
              <input
                required
                type="text"
                className="form-control"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <input
                required
                type="email"
                className="form-control"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Create User
            </button>
          </form>

          <h2 className="mt-4">Users</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Filter users..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr
                    key={user.id}
                    className={selectedUser === user.id ? "table-active" : ""}
                    onClick={() => setSelectedUser(user.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <nav>
            <ul className="pagination">
              {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }).map((_, index) => (
                <li key={index} className="page-item">
                  <button onClick={() => paginate(index + 1)} className="page-link">
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="col-md-8">
          {selectedUser && <TaskList userId={selectedUser} />}
        </div>
      </div>
    </div>
  );
};

export default UserList;
