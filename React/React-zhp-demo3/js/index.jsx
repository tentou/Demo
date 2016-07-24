var React = require('react');
var ReactDom = require('react-dom');

var Hello = React.createClass({
    getInitialState:function(){
        //alert("init");                    //设置虚拟DOM初始值
        return {
            fontSize:'12px'
        }
    },
    render:function(){
        return <div style={{fontSize:this.state.fontSize}}>Hello{this.props.name}</div>
    },
    componentWillMount:function(){             //将要插入真实DOM
        //alert("will")
    },
    componentDidMount:function(){              //真实DOM插入完成
        //alert("did")
        //有个初始的fontSize，我想让他插入Dom的时候为28px
        var _self = this;                        //这里向下传递的这个this，其实可以利用继承的call bind apply
        window.setTimeout(function(){
            _self.setState({
                fontSize:'28px'
            })
        },1000)
    }
});
ReactDom.render(<Hello name="World" />,document.getElementById("container"));



/*
*   继承的方法
*
 window.setTimeout(function(){
 _self.setState({
 fontSize:'28px'
 })
 }.bind(this),1000)

* */