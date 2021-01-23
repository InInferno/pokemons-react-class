import { 
    pokemonsDataSuccess,
    pokemonDataSuccess,
    pokemonsListDataSuccess,
    listOpenSuccess,
    isFetchStart,
    isFetchError
} from './actions'
import errorHandler from '../../utils/errorHandler'

export function pokemonsFetchData(url) { 
    return (dispatch) => {
        dispatch(isFetchStart(true))
        dispatch(isFetchError(null))
        dispatch(pokemonsDataSuccess(null))
        dispatch(pokemonDataSuccess(null))
        fetch(url)
            .then(res => {
                dispatch(pokemonsDataSuccess(null))
                if (res.status !== 200) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(pokemons => {
                dispatch(pokemonsDataSuccess(pokemons))
            })
            .finally(pokemons => {
                dispatch(isFetchStart(false))
            })
            .catch((err) => {
                dispatch(isFetchError(errorHandler(err.message)))
            });
    }
}

export function pokemonFetchData(url) { 
    return (dispatch) => {
        dispatch(isFetchStart(true))
        dispatch(isFetchError(null))
        dispatch(pokemonDataSuccess(null))
        fetch(url)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(pokemon => {
                dispatch(pokemonDataSuccess(pokemon))
            })
            .finally(pokemon => {
                dispatch(isFetchStart(false))
            })
            .catch((err) => {
                dispatch(isFetchError(errorHandler(err.message)))
            });
    }
}

export function pokemonsListFetchData(url) { 
    return (dispatch) => {
        dispatch(isFetchStart(true))
        dispatch(isFetchError(null))
        fetch(url)
            .then(res => {
                dispatch(pokemonsListDataSuccess(null))
                if (res.status !== 200) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(pokemons => {
                dispatch(pokemonsListDataSuccess(pokemons))
            })
            .finally(pokemons => {
                dispatch(isFetchStart(false))
            })
            .catch((err) => {
                dispatch(isFetchError(errorHandler(err.message)))
            });
    }
}

export function listOpen() {
    return (dispatch) => {
        dispatch(listOpenSuccess())
    }
}
