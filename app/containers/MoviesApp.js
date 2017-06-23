/**
 * Created by Galina on 23.06.2017.
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MoviesActions from '../actions/MoviesActions';
import { Home,UserFavorite, MoviesItem } from '../components';
import _ from 'lodash';

@connect(state => ({
    movies: state.movies
}))
export default class MoviesApp extends Component {
    static propTypes = {
        favoriteMovies: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }
    static fetchData({store}) {
        return store.dispatch(loadMovies());
    }
    render () {
        const { movies: { favoriteMovies }, dispatch } = this.props;
        const actions = bindActionCreators(MoviesActions, dispatch);

        return (
            <div className={styles.moviesApp}>
                <h1>The MoviesList</h1>
                <Home addToLocalStorage={actions.addToLocalStorage} />
                <UserFavorite movies={favoriteMovies} actions={actions} />
            </div>
        );
    }
}