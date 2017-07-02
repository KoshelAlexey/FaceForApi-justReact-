import React from "react";
import ReactDOM from "react-dom";

export default class Popup extends React.Component{
    constructor(props) {
        super(props);
        this.state = {details:{title:"",
                        popularity:"",
                        genres:"",
                        release:"",
                        cast:"",
                        overview:""}};
        this.details = {};
        this.off = this.off.bind(this);
        this.wait = "";
    };
    off(e){
        if(e.target.id === "backpop"){
            document.getElementById("pop").style.visibility = "collapse";
            ReactDOM.render(<br/>, document.getElementById('pop'));
        }
    };

    componentWillMount(){
        this.wait = "popwait"
    };
    componentDidMount(){
     fetch(`https://api.themoviedb.org/3/movie/${this.props.obj.id}?api_key=2bffc68560bcf99a67d3ea8fa8f937b4`, {method:"get"})
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
                    let res = "";
                    for(let i = 0;i<data.genres.length;i++){
                        res += `${data.genres[i].name} `;
                    };
                    this.details = {title:data.title,
                                    popularity:data.popularity,
                                    release:data.release_date,
                                    overview:data.overview
                                   };
                    this.details.genres = res;
                }
            )
            .then(
                fetch(`https://api.themoviedb.org/3/movie/${this.props.obj.id}/credits?api_key=2bffc68560bcf99a67d3ea8fa8f937b4`, {method:"get"})
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
                            let res = "";
                            for(let i = 0;i<5;i++){
                                if (data.cast[i] !== undefined){
                                    res += `${data.cast[i].name}, `;
                                }
                            }
                            this.details.casts = res;
                        }
                    )
                    .then(
                        ()=>{
                            this.wait = "done";
                            this.setState({details:this.details});
                        }
                    )
            )
            .catch(function(err) {
                console.log('Fetch Error :', err);
            });
    };
    render(){
        return(
                <div className="backpop" id="backpop" onClick={this.off}>
                    <div className="frontpop">
                        <div id="poster">
                            <img src={`https://image.tmdb.org/t/p/w342/${this.props.obj.poster_path}`}/>
                        </div>
                        <div id="title">{this.state.details.title}</div>
                        <div id="popularity">
                            <span style={{fontWeight:"bold"}}>Popularity rating:</span> {this.state.details.popularity}
                        </div>
                        <div id="genres">
                            <span style={{fontWeight:"bold"}}>Genres:</span> {this.state.details.genres}
                        </div>
                        <div id="release">
                            <span style={{fontWeight:"bold"}}>Release date:</span> {this.state.details.release}
                        </div>
                        <div id="cast">
                            <span style={{fontWeight:"bold"}}>Cast:</span> {this.state.details.casts}
                        </div>
                        <div id="overview">
                            <span style={{fontWeight:"bold"}}>Overview:</span>
                            <br/>
                            <div className="overText">{this.state.details.overview}</div>
                        </div>
                        <div  className={this.wait}></div>
                    </div>
                </div>);
    };

};
