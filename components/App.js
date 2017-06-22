/**
 * Created by Galina on 22.06.2017.
 */
import React, {Component} from 'react';
import axios from 'axios';
import {Row, Col} from 'react-materialize';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page : 1,
            search: '',
            genres : [],
            movies: [],
            loading: true,
            error: null
        };
    };

    componentDidMount() {
        axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=685240b750268877f01b68a97137f247&language=en-US')
            .then(res => {
                this.setState({
                    genres : res.data.genres,
                });
                console.log(this.state.genres);
            });
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=685240b750268877f01b68a97137f247&language=en-US&page=${this.state.page}`)
            .then(res => {
                this.setState({
                    movies : res.data.results,
                    loading: false,
                    error: null
                });
                console.log(this.state.movies);
            })
    .catch(err => {
            this.setState({
                loading: false,
                error: err
            });
        });
    }
    renderLoading() {
        return (
            <div>Loading...</div>
        );
    }
    renderError() {
        return(
            <div>Something went wrong {this.state.error.message}</div>
        );
    }
    // searchValue = (e) => {
    //     this.setState({search : e.target.value})
    // };
    renderPosts() {
        const { error, movies } = this.state;
        let moviesNewArray = movies.filter(item =>{
            let input2 = this.state.search.toLowerCase();
            let item2=item.title.toLowerCase();
            if(item2.indexOf(input2) >= 0) {
                return true
            }
        });

        if(error) {
            return this.renderError;
        }

        return (
            <div>

                {moviesNewArray.map(item =>
                    <div key={item.id} className="movies-item">
                        <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${item.poster_path}`} alt={item.title}/>

                        <a href='#' target="_blank">{item.title}</a>
                        

                    </div>
                )}
            </div>
        );

    };
    render() {
        const {loading} = this.state;

        return (
            <div>
                <header>
                    <div id="logo">
                        <img src="./img/movie_db.png" alt=""/>
                    </div>
                    <h1>Movies</h1>
                    <input
                        type="text"
                        placeholder= "Enter text for filter"
                        value={this.state.search}
                        onChange={this.searchValue}
                    />
                </header>
                <div id="reclama"></div>

                { loading ? this.renderLoading() : this.renderPosts()}
            </div>
        );
    }
};
