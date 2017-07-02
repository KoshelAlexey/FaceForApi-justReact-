import React from "react";
import ReactDOM from "react-dom";

import DisplayField from "./displayfield";

import SearchResult from "./searchresult";

export default class Center extends React.Component{
    constructor(props){
        super(props);
        this.state = {res:[], inpval:""};
        this.idTimer = "";        
        this.change = this.change.bind(this);
        this.clear = this.clear.bind(this);
        this.search =this.search.bind(this);
        this.stopSearch = this.stopSearch.bind(this);
    };
    change(event){
        this.setState({inpval: event.target.value});
    };
    clear(){
        document.getElementById("search").style.display = "none" ; 
        this.setState({inpval: "", res:[]});        
    };
    search(){
        this.idTimer = setInterval(
            ()=>{
                if(this.state.inpval !== ""){
                    fetch(`https://api.themoviedb.org/3/search/movie?api_key=2bffc68560bcf99a67d3ea8fa8f937b4&query=${this.state.inpval}`, {method:"get"})
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
                                this.setState({res:data.results});
                            }
                        )
                        .catch(function(err) {
                            console.log('Fetch Error :', err);
                        });
                }
            },500);
    };
    stopSearch(){
        clearInterval(this.idTimer);
    }
    render(){
        return(
                <div >
                    <div className="row search">
                        <form>
                           <input type="search"
                                  className="input"
                                  value={this.state.inpval}
                                  onFocus={this.search}
                                  onBlur={this.stopSearch}
                                  onChange={this.change}
                                  placeholder="Type text"/>
                           <button type="button" onClick={this.clear}>Clear Search</button>
                         
                        </form>
                    </div>
                    <div className="row ">
                        <div className="col-lg-2 col-md-2 col-sm-2"></div>
                        <div className="col-lg-8 col-md-8 col-sm-8 content">
                            <div id="search" style={{display: "none"}}>
                                <span className="header">Search Results</span>
                                <SearchResult result={this.state.res}/>
                                <hr style={{ backgroundColor:"red",height:"3px"}}/>
                            </div>                            
                            <span className="header">Popular</span>
                            <DisplayField path="popular"/>
                            <hr style={{ backgroundColor:"red",height:"3px"}}/>
                            <span className="header">Upcoming</span>
                            <DisplayField path="upcoming"/>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-2"></div>
                    </div>
                </div>

            )
    };
};