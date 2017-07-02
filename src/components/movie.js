import React from "react";
import ReactDOM from "react-dom";
import Popup from "./popup";

export default class Movie extends React.Component{
    constructor(props){
        super(props);
        this.state={style:{}};
        this.on = this.on.bind(this);
        this.over = this.over.bind(this);
        this.out = this.out.bind(this);
        this.wait = "";
    };
    on(){
        document.getElementById("pop").style.visibility = "visible";
        ReactDOM.render(<Popup obj={this.props.obj} api={this.props.api}/>, document.getElementById('pop'));
    };
    over(){
        this.setState({style:{opacity:"1"}});
    };
    out(){
        this.setState({style:{opacity:"0"}});
    };

    render(){
        return(
            <div className="movie" id="movie" onClick={this.on} onMouseOver={this.over} onMouseOut={this.out} >
                    <img src={`https://image.tmdb.org/t/p/w154/${this.props.obj.poster_path}`}/>
                    <div className="filmname" style={this.state.style}>{this.props.obj.title}</div>
            </div>
            )
    };
};