import {
    POKEMONS_FETCH_DATA_SUCCESS,
    POKEMON_FETCH_DATA_SUCCESS,
    POKEMONS_LIST_FETCH_DATA_SUCCESS,
    LIST_IS_OPEN_SUCCESS,
    FETCH_IS_START,
    FETCH_ERROR
} from './actionsTypes'

export function pokemonsDataSuccess(pokemons) {
    return {
        type: POKEMONS_FETCH_DATA_SUCCESS,
        pokemons: pokemons
    };
}

export function pokemonDataSuccess(pokemon) {
    return {
        type: POKEMON_FETCH_DATA_SUCCESS,
        pokemon: pokemon
    };
}

export function pokemonsListDataSuccess(pokemonsList) {
    return {
        type: POKEMONS_LIST_FETCH_DATA_SUCCESS,
        pokemonsList: pokemonsList
    };
}

export function listOpenSuccess() {
    return {
        type: LIST_IS_OPEN_SUCCESS
    };
}

export function isFetchStart(boolean) {
    return { 
        type: FETCH_IS_START,
        isFetchStart: boolean
    };
}

export function isFetchError(error) {
    return { 
        type: FETCH_ERROR,
        isFetchError: error
    };
}
