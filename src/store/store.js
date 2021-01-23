import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { pokemonsData } from './reducers/pokemonsData';


const store = createStore(
    pokemonsData,
    composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => console.info('subscribe', store.getState()))

export default store;
