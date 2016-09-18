/**
 *
 * Created by zhangpeng on 2016/9/18.
 */
import {combineReducers} from 'redux';
import {change} from '../actions/actions.js'

function propsStyle(state={fontSize: '12px'},action) {
  switch (action.type){
    case change:
      return {fontSize: '59px'}
    default:          //必须有
      return state
  }

}
const todoApp = combineReducers({
  propsStyle       //这个存到state.propsStyle
})
export default todoApp;
