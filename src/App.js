import React from 'react';
import Header from './components/Header/Header'
import Pokemons from './components/Pokemons/Pokemons'
import Pokemon from './components/Pokemon/Pokemon'
import Navigation from './components/Navigation/Navigation'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <Pokemons />
          </Route>
          <Route exact path="/pokemon/:id">
            <Navigation />
            <Pokemon />
          </Route>
        </Switch>
      </BrowserRouter>
 
    </>
  );
}

export default App;
