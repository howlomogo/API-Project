import React, { Component } from 'react';
const axios = require('axios')

class Tasks extends Component {
  constructor() {
    super()
    this.state = {
      tasks: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/tasks')
      .then((response) => {
        // return the tasks from http://localhost:3000/tasks
        console.log('---response.data', response.data)
        this.setState({tasks: response.data})
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
          <p>Your tasks are...</p>
          <ul>
            {this.state.tasks.map((task, index) =>
              <li key={index}>{task.text}</li>
            )}
          </ul>
          <form action="http://localhost:3000/api/tasks" method="post">
            Firstname: <input type="text" name="somerandomtext" /><br />
            <input className="btn btn-primary" type="submit" value="Submit"/>
          </form>
        </div>
      </div>
    )
  }
}

export default Tasks;
