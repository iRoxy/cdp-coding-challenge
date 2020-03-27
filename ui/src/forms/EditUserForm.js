import React, { useState, useEffect } from 'react'

const EditUserForm = props => {
  const [ user, setUser ] = useState(props.currentUser)

  useEffect(
    () => {
      setUser(props.currentUser)
    },
    [ props ]
  )
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value });
    console.log('editing user: ', user);
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        props.updateUser(user._id, user)
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
      <button>Update user</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}

export default EditUserForm
