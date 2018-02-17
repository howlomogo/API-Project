import React, { Component } from 'react';
const axios = require('axios')

class Tasks extends Component {
  constructor() {
    super()
    this.state = {
      tasks: []
    }
    this.removeUser = this.removeUser.bind(this);
  }

  componentDidMount() {
    this.getTasks()
  }

  getTasks() {
    axios.get('http://localhost:3000/api/tasks/view')
      .then((response) => {
        // return the tasks from http://localhost:3000/tasks
        console.log('---response.data', response.data)
        this.setState({tasks: response.data})
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeUser(_id) {
    axios.delete('http://localhost:3000/api/tasks/remove', {
      data: {
        taskId: _id
      }
    })
      .then((response) => {
        this.getTasks() // Get updated tasks
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h2>Tasks Page</h2>
          <hr />
          <div className="row">
            {this.state.tasks.map((task, index) =>
              <div key={index} className="col-md-4">
                <div className="card mb-4">
                  {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
                  <div className="card-block">
                    <h4 className="card-title">{task.text}</h4>
                    <p className="card-text">{task._id}</p>
                    <button onClick={() => this.removeUser(task._id)} className="btn btn-danger">Remove Task</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <form action="http://localhost:3000/api/tasks/add" method="post">
            Firstname: <input type="text" name="somerandomtext" /><br />
            <input className="btn btn-primary" type="submit" value="Submit"/>
          </form>
        </div>
      </div>
    )
  }
}

export default Tasks;
