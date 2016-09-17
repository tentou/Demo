/**
 * reducer 是用来描述 action 如何改变 state 树的
 * Created by tentou on 2016/9/15.
 * visibilityFilter和todos  都是state的属性
 */
import {combineReducers} from 'redux';
import {ADD_TODO,COMPLETE_TODO,SET_VISIBILITY_FILTER,VisibilityFilters} from '../actions/actions.js'
const {SHOW_ALL} = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL,action) {
  switch (action.type){
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todos(state = [],action) {
  switch (action.type){
    case ADD_TODO:
      return [
        ...state,
        {
          text:action.text,
          completed:false
        }
      ]
    case COMPLETE_TODO:
      return [
        ...state.slice(0,action.index),
        Object.assign({}, state[action.index], {
          completed: true
        }),
        ...state.slice(action.index + 1)
      ]
    default:
      return state
  }
}

const todoApp = combineReducers({     //将上边两个reducers通过combineReducers合并成一个reducers
  visibilityFilter,
  todos
})

export default todoApp;   //todoApp 是一个合并后的reducers   他们return的都是最后的state 可以通过dispatch来传入参数描述要修改成的状态，最后通过store.getState()来完成修改这个动作
