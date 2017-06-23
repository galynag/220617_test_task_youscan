/**
 * Created by Galina on 22.06.2017.
 */
import React, {Component} from 'react';
import axios from 'axios';
import {Pagination, Input, Row, Col, Preloader, Icon} from 'react-materialize';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page : 2,
            search: '',
            genres : [],
            movies: [],
            loading: true,
            error: null
        };
    };

    componentWillMount() {
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
                const {movies,genres} = this.state;
                for (let i=0;i<movies.length; i++) {
                    for (let n=0; n<movies[i].genre_ids.length; n++) {
                        for (let index=0; index<genres.length; index++){
                            if (movies[i].genre_ids[n]==genres[index].id) movies[i].genre_ids[n]=genres[index].name
                        }
                    }
                    console.log(movies[i].genre_ids);
                }
                console.log(this.state.movies);
            })
            .catch(err => {
                    this.setState({
                        loading: false,
                        error: err
                    });
                });
    }
    renderLoading () {
        return (
                <Col s={4}>
                    <Preloader flashing/>
                </Col>
        );
    }
    renderError() {
        return(
            <div>Something went wrong {this.state.error.message}</div>
        );
    }

    renderSearch = () => {
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
                moviesNewArray.map(item =>
                        <Col xl={3} l={4} m={6} s={12} key={item.id} className="movies-item">
                        <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${item.poster_path}`} alt={item.title}/>
                        <div className="item-content">
                            <p>{item.vote_average} <Icon small right>star</Icon></p>
                            <a href='#' target="_blank">{item.title}</a>
                            <p>Release date: {item.release_date}</p>
                            <p>Genres: {item.genre_ids.join(', ')}</p>
                            <p>{item.overview}</p>
                        </div>
                        </Col>
                )
        );
    };
    searchValue = (e) => {
        this.setState({search : e.target.value})
    };
    render() {
        const {loading} = this.state;

        return (
            <div className="container">
                <header>
                    <h1>Movies</h1>
                    <Input
                        type="text"
                        placeholder= "Enter text for filter"
                        value={this.state.search}
                        onChange={this.searchValue}
                    />
                </header>
                <Row>
                { loading ? this.renderLoading() : this.renderSearch()}
                </Row>
                <Pagination items={10} activePage={2} maxButtons={8}/>
            </div>
        );
    }
};
