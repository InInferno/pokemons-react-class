import initialState from '../initialState';
import { 
    POKEMONS_FETCH_DATA_SUCCESS, 
    POKEMON_FETCH_DATA_SUCCESS, 
    POKEMONS_LIST_FETCH_DATA_SUCCESS,
    LIST_IS_OPEN_SUCCESS,
    FETCH_IS_START,
    FETCH_ERROR
} from '../actions/actionsTypes';

export function pokemonsData(state = initialState, action) {
    switch(action.type) {
        case POKEMONS_FETCH_DATA_SUCCESS: 
        return {
            ...state,
            pokemons: action.pokemons
        };
        case POKEMON_FETCH_DATA_SUCCESS: 
        return {
            ...state,
            pokemon: action.pokemon
        };
        case POKEMONS_LIST_FETCH_DATA_SUCCESS: 
        return {
            ...state,
            pokemonsList: action.pokemonsList
        };
        case LIST_IS_OPEN_SUCCESS: 
        return {
            ...state,
            listIsOpenBoolean: !state.listIsOpenBoolean
        };
        case FETCH_IS_START: 
        return {
            ...state,
            isFetchStart: action.isFetchStart 
        };
        case FETCH_ERROR: 
        return {
            ...state,
            isFetchError: action.isFetchError
        };
        
        default: return state;
    }
}
