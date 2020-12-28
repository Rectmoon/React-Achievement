import React from './react'

class Count extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 1
    }
  }

  onClickHandler () {
    this.setState({
      count: this.state.count + 1
    })
  }

  render () {
    return (
      <div>
        <h3>Count: {this.state.count}</h3>
        <button onClick={() => this.onClickHandler()}>Count+1</button>
      </div>
    )
  }
}

export default React.transfer(Count)
