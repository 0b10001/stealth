import { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '../types';
import TaskList from './TaskList';

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/users', newUser);
      setNewUser({ name: '', email: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <h2>Create User</h2>
          <form onSubmit={handleCreateUser}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary">Create User</button>
          </form>

          <h2 className="mt-4">Users</h2>
          <div className="list-group">
            {users.map((user) => (
              <button
                key={user.id}
                className={`list-group-item list-group-item-action ${selectedUser === user.id ? 'active' : ''}`}
                onClick={() => setSelectedUser(user.id)}
              >
                {user.name} ({user.email})
              </button>
            ))}
          </div>
        </div>
        <div className="col-md-8">
          {selectedUser && <TaskList userId={selectedUser} />}
        </div>
      </div>
    </div>
  );
};

export default UserList; 