/**
 * Created by Galina on 23.06.2017.
 */
import React, {Component} from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';


export default class MoviesItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            details : [],
            movieid: 58,
            video : ''
        }

};
    componentDidMount()
{
    axios.get(`https://api.themoviedb.org/3/movie/${this.state.movieid}?api_key=685240b750268877f01b68a97137f247&language=en-US`)
        .then(res => {
            this.setState({
                details: res.data,
            });
            // console.log(this.state.genres);
        });
    axios.get(`https://api.themoviedb.org/3/movie/${this.state.movieid}/videos?api_key=685240b750268877f01b68a97137f247&language=en-US`)
        .then(res => {
            this.setState({
                video: res.data.results[0].key,
            });
        });

};
    onReady =(e)=> {
        // access to player in all event handlers via event.target
        e.target.pauseVideo();
    }

    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 0
            }
        };
        return(
            <YouTube
                videoId={this.state.video}
                opts={opts}
                onReady={this.onReady}
            />
        )
    }
}