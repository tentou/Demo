"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,Link,IndexRoute,Redirect,hashHistory} from 'react-router';
import {createHistory,createHashHistory,useBasename} from 'history';

const Dashboard = React.createClass({
    render() {
        return <div>Welcome to the app!</div>
    }
})
const App = React.createClass({
    render(){
        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/inbox">Inbox</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
});
const About = React.createClass({
    render() {
        return <h3>About</h3>
    }
})

const Inbox = React.createClass({
    render() {
        return (
            <div>
                <h2>Inbox</h2>
                {this.props.children || "Welcome to your Inbox"}
            </div>
        )
    }
})

const Message = React.createClass({
    render() {
        return <h3>Message {this.props.params.id}</h3>
    }
});

ReactDOM.render((
    <Router>
        <Route path="/" component={App}>
            {/* 当 url 为/时渲染 Dashboard */}
            <IndexRoute component={Dashboard} />         {/*初始页面，因为此时APP模块还没有加载this.props.children，所以用这个先代替*/}
            <Route path="about" component={About} />     {/*注意后边这个结束符号*/}
            <Route path="inbox" component={Inbox}>       {/*这个没有结束符号，所以要下边的闭合标签*/}
                <Route path="/messages/:id" component={Message} /> {/* 使用绝对路径 /messages/:id 替换 messages/:id 这样就不会有inbox这个路径了，通过绝对路径掌控URL*/}
                <Redirect from="messages/:id" to="/messages/:id" /> {/* 跳转 /inbox/messages/:id 到 /messages/:id  这是为了防止以前保存inbox/messages/:id的用户，访问报错，进行自行跳转*/}
            </Route>
        </Route>
    </Router>
),document.getElementById("container"))

{/*
 从 /messages/5 跳转到 /about，下面是这些 hook 的执行顺序：
 /messages/:id 的 onLeave
 /inbox 的 onLeave
 /about 的 onEnter
*/}