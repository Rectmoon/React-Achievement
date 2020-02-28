import React, { Component } from './react'

const bugs = [
  { id: 1, title: 'bug1' },
  { id: 2, title: 'bug2' }
]

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      num: 0
    }
  }
  componentDidMount() {
    for (let i = 0; i < 100; i++) {
      this.setState(prevState => ({
        num: prevState.num + 1
      }))
      // this.setState({ num: this.state.num + 1000 })
    }
  }
  render() {
    return (
      <div className="App">
        <h1>{this.state.num}</h1>

        {bugs.map(bug => {
          return <div key={bug.id}>{bug.title}</div>
        })}
      </div>
    )
  }
}
