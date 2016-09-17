/**
 * Created by zhangpeng on 2016/9/14.
 */
import React, { Component, PropTypes } from 'react';
import Todo from './Todo';

export default class TodoList extends Component {
    render() {
        return (
            <ul>
                {this.props.todos.map((todo, index) =>    //返回一个数组
                    <Todo {...todo}    //这个解析出text= 'Use Redux', completed= true 用es3的话就写成 a={todo}  调用的时候this.props.a.text   这么调用就行了
                          key={index}
                          onClick={() => this.props.onTodoClick(index)} />
                )}
            </ul>
        )
    }
}

// TodoList.propTypes = {
//     onTodoClick: PropTypes.func.isRequired,
//     todos: PropTypes.arrayOf(PropTypes.shape({
//         text: PropTypes.string.isRequired,
//         completed: PropTypes.bool.isRequired
//     }).isRequired).isRequired
// }
