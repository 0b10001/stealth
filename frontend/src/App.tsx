import UserList from "./components/UserList";
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';

function App() {
  return (
    <div className="container">
      <h1 className="my-4">User Task Manager</h1>
      <UserList />
    </div>
  );
}

export default App;
