import { enqueueSetState } from './set-state'

function createElement(type, props, ...children) {
  return {
    type,
    props,
    children
  }
}

export class Component {
  constructor(props = {}) {
    this.state = {}
    this.props = props
  }

  setState(stateChange) {
    enqueueSetState(stateChange, this)
  }
}

export default {
  createElement
}
