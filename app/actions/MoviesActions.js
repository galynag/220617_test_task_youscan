/**
 * Created by Galina on 23.06.2017.
 */
import * as types from '../constants/ActionTypes';

export function addFilmId(id) {
    return{
        type: types.ADD_FILM_ID,
        id
    }
}
export function addToLocalStorage(id) {
    return{
        type: types.ADD_TO_LOCAL_STORAGE,
        id
    }
}
export function delFromLocalStorage(id) {
    return{
        type: types.DELETE_FROM_LOCAL_STORAGE,
        id
    }
}
export function loadMovies() {
    return{
        [CALL_API]: {
            method: 'get',
            url: 'https://api.themoviedb.org/3/genre/movie/list?api_key=685240b750268877f01b68a97137f247&language=en-US',
            successType: LOADED_MOVIES
        }
    };
}
