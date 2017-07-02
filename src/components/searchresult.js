import React from "react";
import ReactDOM from "react-dom";

import Movie from "./movie";

export default class SearchResult extends React.Component{
    constructor(props){
        super(props);
        this.state = {res:this.props.result};
        this.load = this.load.bind(this);
        this.wait = "";
        this.message;
    };
    load(){
            return this.props.result.map(
                (obj,ind)=><Movie obj={obj}
                                  key={ind}/>
                )
    };

    componentWillReceiveProps(nextProps){
        this.state.res = nextProps.result;
        this.wait = "done";
        if(this.state.res.length === 0){
            this.message = "Sorry, nothing found for this query.";
        }
        else{
            document.getElementById("search").style.display = "block";
            this.message = null;
        }
    }
    render(){
        return(
                <div id="sr" className={this.wait} >
                    <div className="data" >
                        {this.message}
                        {this.load()}
                    </div>
                </div>
            )
    };
};