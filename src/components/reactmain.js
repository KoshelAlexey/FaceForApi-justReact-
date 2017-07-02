import React from "react";
import ReactDOM from "react-dom";

import Header from "./header";
import Center from "./center";
import Footer from "./footer";
import Popup from "./popup";

export default class ReactMain extends React.Component{
    constructor(props){
        super(props);
    };
    render(){
        return(
                <div className="container-fluid main" id="main">
                    <Header/>
                    <Center/>
                    <Footer id="footer"/>
                </div>


            )
    };
};