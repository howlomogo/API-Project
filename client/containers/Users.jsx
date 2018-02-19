import React, { Component } from 'react';
const axios = require('axios')

class Users extends Component {
  constructor() {
    super()
    this.state = {
      inputFirstName: '',
      inputLastName: '',
      users: []
    }
    this.removeUser = this.removeUser.bind(this)
    this.addUser = this.addUser.bind(this)
  }

  componentDidMount() {
    this.getUsers()
  }

  getUsers() {
    axios.get('http://localhost:3000/api/users/view')
      .then((response) => {
        // return the users from http://localhost:3000/users
        console.log('---response.data', response.data)
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
      </div>
    )
  }
}

export default Users;
