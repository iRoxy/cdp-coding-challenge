import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';
import UserTable from './tables/UserTable';
import './App.css';

const App = () => {
  const apiUrl = 'http://localhost:8080';

  const initialFormState = {
    _id: null, firstname: '', lastname: '', email_address: '', department: '',
  };

  // Setting state
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [editing, setEditing] = useState(false);


  async function getUsers() {
    const res = await axios.get(`${apiUrl}/`);
    console.log('response:', res);
    setUsers(res.data);
  }

  async function removeUser(user) {
    console.log('Deleting user: ', user);
    await axios.post(`${apiUrl}/delete-user`, user);
    await getUsers();
  }

  async function createUser(user) {
    console.log('Here is the user: ', user);
    await axios.post(`${apiUrl}/user-create`, user);
    await getUsers();
  }

  async function update(user) {
    await axios.post(`${apiUrl}/update-user`, user);
    await getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);


  // CRUD operations
  const addUser = (user) => {
    createUser(user);
  };

  const deleteUser = (user) => {
    setEditing(false);
    removeUser(user);
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    console.log(id);
    console.log('added id:', updatedUser);
    console.log(users);
    update(updatedUser);
  };

  const editRow = (user) => {
    setEditing(true);
    setCurrentUser({
      _id: user._id, firstname: user.firstname, lastname: user.lastname, email_address: user.email_address, department: user.department,
    });
  };

  return (
    <div className="container">
      <h1>CRUD for Users</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <>
              <h2>Edit user</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </>
          ) : (
            <>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </>
          )}
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  );
};

export default App;
