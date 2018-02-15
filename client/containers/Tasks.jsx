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
    axios.get('http://localhost:3000/tasks')
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
      <div>
        <h2>Tasks Page</h2>
        <hr />
        <h4>Your tasks are...</h4>
        <ul>
          {this.state.tasks.map((task, index) =>
            <li key={index}>{task.text}</li>
          )}
        </ul>
        <form action="http://localhost:3000/tasks" method="post">
          Firstname: <input type="text" name="somerandomtext" /><br />
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

export default Tasks;
