require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {connect} from 'react-redux';
import {store} from '../index'
import {changeStyle} from '../actions/actions.js'

import yeomanImage from '../images/yeoman.png'
//let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick(e){
    store.dispatch(changeStyle())    //这个changeStyle是从actions引进的，action其实就是用来修改状态的
  }
  render() {
    //从组件的props属性中导入actions里的方法和变量
    const {dispatch,propsStyle} = this.props;

    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        {propsStyle}

        <div onClick={this.handleClick.bind(this)}>Please edi to get started!</div>
      </div>
    );
  }
}

function select(state) {
  return {
    //将我们需要的state中的数据绑定到props上
    propsStyle:state.propsStyle
  }
}

 export default connect(select)(AppComponent);
//export default AppComponent;
