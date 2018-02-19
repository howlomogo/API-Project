import React, { Component } from 'react';
const axios = require('axios')

class Users extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      userToUpdate: '' // contains id of the user to update from the modal
    }
    this.removeUser = this.removeUser.bind(this)
    this.addUser = this.addUser.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.userToUpdate = this.userToUpdate.bind(this)
  }

  componentDidMount() {
    this.getUsers()
  }

  getUsers() {
    axios.get('http://localhost:3000/api/users/view')
      .then((response) => {
        // return the users from http://localhost:3000/users
        // console.log('---response.data', response.data)
        this.setState({users: response.data})
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  addUser(e) {
    e.preventDefault()
    axios.post('http://localhost:3000/api/users/add', {
      data: {
        firstname: this.inputFirstName.value,
        lastname: this.inputLastName.value
      }
    })
      .then((response) => {
        // Clear the input text
        this.inputFirstName.value = '',
        this.inputLastName.value = ''
        this.getUsers() // Get updated users
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  updateUser(e) {
    e.preventDefault()
    console.log('---UPDATE USER', this.state.userToUpdate)
    axios.put('http://localhost:3000/api/users/update', {
      data: {
        userId: this.state.userToUpdate,
        firstname: this.updateFirstName.value,
        lastname: this.updateLastName.value
      }
    })
      .then((response) => {
        // Clear the input text
        this.updateFirstName.value = '',
        this.updateLastName.value = ''
        this.getUsers() // Get updated users
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeUser(_id) {
    axios.delete('http://localhost:3000/api/users/remove', {
      data: {
        userId: _id
      }
    })
      .then((response) => {
        this.getUsers() // Get updated users
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // User Selected to update
  userToUpdate(_id) {
    console.log('---update user with id - ', _id)
    this.setState({
      userToUpdate: _id
    })
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h2>Users Page</h2>
          <hr />
          <div className="row">
            {this.state.users.map((user, index) =>
              <div key={index} className="col-md-4">
                <div className="card mb-4">
                  <div className="card-block">
                    <h6>Name:</h6>
                    <h4 className="card-title">{user.firstname} {user.lastname}</h4>
                    <h6>ID:</h6>
                    <p className="card-text">{user._id}</p>

                    {/* Probably not the best idea to be using an onClick and opening the modal at the same time... But is ok for this */}
                    <button type="button" onClick={() => this.userToUpdate(user._id)} className="btn btn-primary" data-toggle="modal" data-target="#updateModal">
                      Update User
                    </button>

                    <button onClick={() => this.removeUser(user._id)} className="btn btn-danger">Remove User</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <form className="form" onSubmit={this.addUser}>
            <div className="form-group">
              <label htmlFor="firstname">First Name:</label>
              <input
                ref={inputFirstName => this.inputFirstName = inputFirstName}
                className="form-control"
                type="text"
                id="firstname"
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstname">Last Name:</label>
              <input
                ref={inputLastName => this.inputLastName = inputLastName}
                className="form-control"
                type="text"
                id="lastname"
              />
            </div>
            <div className="form-group">
              <input className="btn btn-primary" type="submit" value="Submit"/>
            </div>
          </form>
        </div>

        {/* Update Modal */}
        <div className="modal fade" id="updateModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              { /* Dodgy form markup but it's just for testing */ }
              <form className="form" onSubmit={this.updateUser}>
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Update User</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="firstname">First Name:</label>
                      <input
                        ref={updateFirstName => this.updateFirstName = updateFirstName}
                        className="form-control"
                        type="text"
                        id="firstname"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="firstname">Last Name:</label>
                      <input
                        ref={updateLastName => this.updateLastName = updateLastName}
                        className="form-control"
                        type="text"
                        id="lastname"
                      />
                    </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <input className="btn btn-primary" type="submit" value="Submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Users;
