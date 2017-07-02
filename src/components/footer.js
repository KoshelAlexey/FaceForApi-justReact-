import React from "react";
import ReactDOM from "react-dom";

export default class Footer extends React.Component{
    constructor(props){
        super(props);
    };
    render(){
        return(
                <div className="row footer"><a href="https://github.com/KoshelAlexey">GitHub:https://github.com/KoshelAlexey</a></div>
            )
    };
};