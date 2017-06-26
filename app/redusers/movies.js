/**
 * Created by Galina on 23.06.2017.
 */
import omit from 'lodash/object/omit';


const initialState = {
    selectedMovie: 58,//тестовый...===activeId
    favoriteMovies: [],//что должно передаваться в LocalStorage
    page : 2,//какую страницу нужно грузить
    activeId : 0,//ид фильма о котором нужно отобразить подробную информацию
}
export default function movies(state = initialState, action) {
    switch (action.type) {

        case types.ADD_FILM_ID:
            return {
                selectedMovie: action.id,
            }
        case types.ADD_TO_LOCAL_STORAGE:
            return {
                favoriteMovies: [
                    ...state.favoriteMovies,
                    action.id
                ]
            }
        case types.DELETE_FROM_LOCAL_STORAGE:
            return {
                favoriteMovies: omit(state.favoriteMovies, action.id)
            }
        default:
            return state;
    }
}