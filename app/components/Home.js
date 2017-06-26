/**
 * Created by Galina on 22.06.2017.
 */
import React, {Component} from 'react';
import axios from 'axios';
import {Pagination, Input, Row, Col, Preloader, Icon} from 'react-materialize';
import {Link} from 'react-router';
import MoviesItem from "./MoviesItem";



export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page : 2,//перенести в редакс
            search: '',
            genres : [],
            movies: [],
            loading: true,
            error: null,
            activeId: ''
        };
    };

    componentDidMount() {
        axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=685240b750268877f01b68a97137f247&language=en-US')
            .then(res => {
                this.setState({
                    genres: res.data.genres,
                });
            });
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=685240b750268877f01b68a97137f247&language=en-US&page=${this.state.page}`)
            .then(res => {
                this.setState({
                    movies : res.data.results,
                    loading: false,
                    error: null
                });
                console.log('now',this.state.movies);
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    error: err
                })
            });

    };
    renderLoading = () => {
        return (
                <Col s={4}>
                    <Preloader flashing/>
                </Col>
        );
    };
    renderError = () => {
        return(
            <div>Something went wrong {this.state.error.message}</div>
        );
    };
    addActiveId = (e) =>{
        console.log('--',e.target.value,'--',typeof(e.target.value) );
        this.setState({
            activeId: e.target.value
        });
        console.log(this.state.activeId);
    };
    renderSearch = () => {
        const { error, movies, genres } = this.state;
        let moviesNewArray = movies.filter(item =>{
            let input2 = this.state.search.toLowerCase();
            let item2=item.title.toLowerCase();
            if(item2.includes(input2)) {
                return true
            }
        });
        if(error) {
            return this.renderError;
        }
        for (let i=0;i<moviesNewArray.length; i++) {
            for (let n=0; n<moviesNewArray[i].genre_ids.length; n++) {
                for (let index=0; index<genres.length; index++){
                    if (moviesNewArray[i].genre_ids[n]==genres[index].id) moviesNewArray[i].genre_ids[n]=genres[index].name
                }
            }
        }
        return (
                moviesNewArray.map(item =>
                        <Col xl={3} l={4} m={6} s={12} key={item.id} className="movies-item">
                            <Link to={`/movie/${item.id}`} className="movies-item_link">
                                <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${item.poster_path}`} alt={item.title}/>

                                    <p>{item.vote_average} <Icon small right>star</Icon></p>
                                    <p><b>Title: </b>{item.title}</p>
                                    <p>Release date: {item.release_date}</p>
                                    <p>Genres: {item.genre_ids.join(', ')}</p>
                                    <p>{item.overview}</p>
                                <button value={item.id}
                                        onClick={this.addActiveId}
                                >More about</button>


                            </Link>
                        </Col>
                )
        );
    };
    searchValue = (e) => {
        this.setState({search : e.target.value})
    };
    render() {
        const {loading} = this.state;
        console.log('render',this.state.activeId);
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
                <MoviesItem selectedItem={this.state.activeId}/>
            </div>
        );
    }
};
