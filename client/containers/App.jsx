import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './Home.jsx'
import About from './About.jsx'
import Tasks from './Tasks.jsx'

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/tasks" component={Tasks} />
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
