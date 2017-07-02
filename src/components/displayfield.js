import React from "react";
import ReactDOM from "react-dom";

import Movie from "./movie";

export default class DisplayField extends React.Component{
    constructor(props){
        super(props);
        this.state = {componentsArray:[]};
        this.wait = "";
    };
    componentWillMount(){
        this.wait = "wait";
    };
    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/movie/${this.props.path}?api_key=2bffc68560bcf99a67d3ea8fa8f937b4`, {method:"get"})
            .then(
                (response)=> {
                    if (response.status === 404){
                        alert(`Response failed. Please try again leter. Status Code: ${response.status}`);
                        return;
                    }
                    else{
                        return response.json()
                    }
                }
            )
            .then(
                (data)=> {
                    this.wait = "done";
                    this.setState({componentsArray:data.results.map(
                        (obj,ind)=><Movie obj={obj={id:obj.id,
                                                    poster_path:obj.poster_path,
                                                    title:obj.title
                                                    }}
                                          key={ind}/>)});
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :', err);
            });

    };
    render(){
        return(
            <div className={this.wait} >
                <div className="data" >
                    {this.state.componentsArray}
                </div>
            </div>
            )
    };
};