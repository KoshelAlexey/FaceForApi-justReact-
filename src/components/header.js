import React from "react";
import ReactDOM from "react-dom";

export default class Header extends React.Component{
    constructor(props){
        super(props);
    };
    render(){
        return(
                <div className="row headrow">
                <div className="col-lg-2 col-md-2 col-sm-2"></div>
                    <div className="col-lg-8 col-md-8 col-sm-8 header">
                        <div className="logo"></div>
                        <div className="headertext">Movie DataBase</div>

                    </div>
                <div className="col-lg-2 col-md-2 col-sm-2"></div>
                </div>

            )
    };
};