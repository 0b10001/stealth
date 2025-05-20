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
    <div className="container-fluid py-4">
      <div className="row g-4">
        {/* Left Column */}
        <div className="col-lg-4">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <Weather />
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="h4 mb-4">Create User</h2>
              <form onSubmit={handleCreateUser}>
                <div className="mb-3">
                  <input
                    required
                    type="text"
                    className="form-control form-control-lg"
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
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-100">
                  Create User
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4 mb-0">Users</h2>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search users..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  />
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map((user) => (
                      <tr
                        key={user.id}
                        className={selectedUser === user.id ? "table-primary" : ""}
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

              <nav className="mt-4">
                <ul className="pagination justify-content-center">
                  {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }).map((_, index) => (
                    <li key={index} className="page-item">
                      <button 
                        onClick={() => paginate(index + 1)} 
                        className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {selectedUser && (
            <div className="card shadow-sm mt-4">
              <div className="card-body">
                <TaskList userId={selectedUser} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
