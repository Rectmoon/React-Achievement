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

/* 
   1. webpack + babel 编译时，会替换jsx为React.createElement(type, props, ...children)
   2. 所有 React.createElement() 执行结束后得到一个js对象(vdom)
   3. ReactDOM.render(vdom, container) 可以将vdom转换成真实dom并追加到container中, 
      通过递归遍历vdom树， 并根据vtype不同, 执行不同逻辑 1: origin  2: class  3: functional

   ## why     
    DOM 操作很慢，轻微的操作都可能导致页面重新排版，非常耗性能。
   相比于DOM对象，js对象处理起来更快、更简单，通过diff算法对比新旧
   vdom之间的差异，可以批量、最小化地执行dom操作，从而提高性能

   ## diff策略
   1. 同级比较，WEB UI中DOM节点跨层级地移动操作特别少，可以忽略不计
   2. 拥有相同类的两个组件将生成相似的树形结构，拥有不同类的两个组件将会生产不同的树形结构
   3. 对于同一层级的一组子节点，通过唯一的key进行区分

   基于以上三个前提策略，React分别对tree doff 、 component diff 以及 element diff 进行了算法
   优化，从而保证了整体界面构建的性能

   element diff
    差异类型
      1. 替换原来的节点： 如把div换成p， Comp1换成Comp2
      2. 移动、删除、新增子节点：如调换ul中多个各自节点的顺序
      3. 修改了节点的属性，如节点类名发生了变化
      4，对于文本节点，文本内容可能会改变
*/

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
