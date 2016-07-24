'use strict';
var React = require('react');
var ReactDom = require('react-dom');
var Hello = React.createClass({
    getInitialState: function(){     //设置虚拟DOM初始值
        return {
            fontSize:'12px'
        }
    },
    render: function(){
        return (
            <div style={{fontSize:this.state.fontSize}}>Hello{this.props.name}</div>
        )
    },
    componentWillMount:function(){        //将要插入真实DOM

    },
    componentDidMount:function () {       //真实DOM插入完成
        var that = this;
        window.setTimeout(function(){     //setTimeout导致this指向window
            that.setState({
                fontSize:'28px'
            })
        },1000)
    }
});
var ChildNotesList = React.createClass({
    render:function(){
        return (         //不能直接插入{}，要插入带标签的元素
            <ol>
                {
                    React.Children.map(this.props.children,function(child){
                        return <li>{child}</li>
                })}
            </ol>
        );

    }
});
ReactDom.render(<div><Hello name="zp" /></div>,document.getElementById("haha"));    //同一个位置不能插入多个标签
ReactDom.render(<ChildNotesList><span>hello</span><span>world</span></ChildNotesList>,document.getElementById("hehe"));