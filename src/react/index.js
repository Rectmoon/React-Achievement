import { enqueueSetState } from './set-state'

function createElement(type, props, ...children) {
  return {
    type,
    props,
    children
  }
}

!(function() {
  // hooks logic

  let memoizedState = [] // hooks 存放在这个数组
  let cursor = 0 // 当前 memoizedState 下标

  function useState(initialValue) {
    memoizedState[cursor] = memoizedState[cursor] || initialValue
    const currentCursor = cursor
    function setState(newState) {
      memoizedState[currentCursor] = newState
      render()
    }
    return [memoizedState[cursor++], setState] // 返回当前 state，并把 cursor 加 1
  }

  function useEffect(callback, depArray) {
    const hasNoDeps = !depArray
    const deps = memoizedState[cursor]
    const hasChangedDeps = deps ? !depArray.every((el, i) => el === deps[i]) : true
    if (hasNoDeps || hasChangedDeps) {
      callback()
      memoizedState[cursor] = depArray
    }
    cursor++
  }
})()

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
  createElement,
  useState,
  useEffect
}
