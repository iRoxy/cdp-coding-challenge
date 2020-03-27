import React, { useState } from 'react';

const AddUserForm = (props) => {
  const initialFormState = {
    _id: null, firstname: '', lastname: '', email_address: '', department: '',
  };
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    console.log('Adding...', user);
  };

  return (
    <form
      onSubmit={(event) => {
			  event.preventDefault();
			  if (!user.firstname || !user.lastname) return;

			  props.addUser(user);
			  setUser(initialFormState);
      }}
    >
      <label>First Name</label>
      <input type="text" name="firstname" value={user.firstname} onChange={handleInputChange} />
      <label>Last Name</label>
      <input type="text" name="lastname" value={user.lastname} onChange={handleInputChange} />
      <label>Email</label>
      <input type="text" name="email_address" value={user.email_address} onChange={handleInputChange} />
      <label>Department</label>
      <input type="text" name="department" value={user.department} onChange={handleInputChange} />
      <button>Add new user</button>
    </form>
  );
};

export default AddUserForm;
