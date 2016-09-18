/**
 *
 * Created by zhangpeng on 2016/9/18.
 */
import {combineReducers} from 'redux';
import {change} from '../actions/actions.js'

function propsStyle(state=0,action) {
  switch (action.type){
    case change:
      return state +1
    default:          //必须有
      return state
  }

}
const todoApp = combineReducers({
  propsStyle       //这个属性名propsStyle必须和函数propsStyle同名  表示通过这个函数处理后的state的值为state.propsStyle  connect会将state.propsStyle赋值到props
})
export default todoApp;
