import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <ul className="nav py-4">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tasks">Tasks</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Header
