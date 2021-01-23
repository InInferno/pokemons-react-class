import React, { Component } from 'react';
import './Pokemons.css';
import { connect } from "react-redux";
import { 
  pokemonsFetchData, 
  pokemonFetchData, 
  pokemonsListFetchData,
  listOpen
 } from '../../store/actions/pokemons';
import { Link } from 'react-router-dom';


class Pokemons extends Component {

  componentDidMount() {
    this.props.fetchData(`https://pokeapi.co/api/v2/pokemon`);
    this.props.fetchDataPokemonsList(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=0`);
  }

  getPokemon = (event) => {
    event.preventDefault();
    if (this.searchInput.value !== '') {
      this.props.fetchDataPokemon(`https://pokeapi.co/api/v2/pokemon/${this.searchInput.value}`);
    }
  }

  getNextPokemons = (event) => {
    event.preventDefault();
    this.props.fetchData(`${this.props.pokemons.next}`);
  }
  
  getPreviousPokemons = (event) => {
    event.preventDefault();
    this.props.fetchData(`${this.props.pokemons.previous}`);
  }

  getNextPokemonsList = (event) => {
    event.preventDefault();
    this.props.fetchDataPokemonsList(`${this.props.pokemonsList.next}`);
  }
  
  getPreviousPokemonsList = (event) => {
    event.preventDefault();
    this.props.fetchDataPokemonsList(`${this.props.pokemonsList.previous}`);
  }

  pokemonsListIsOpen = () => {
    console.log(typeof(this.props.listIsOpenBoolean))
    this.props.listIsOpen();
  }
  

  render() {
    return (
      <div className='page'>

        {/*Форма поиска  */}
        <form className='search-form' onSubmit={ this.getPokemon }>
          <label className='search-title'>
            Введите название покемона:
          </label>
          <div className='search-field'>
            <input className='search-input' type="text" ref={(input) => {this.searchInput = input}} />
            {/* <button className='search-button' type="submit">Найти</button> */}
            <button className="search-button" type="submit">
              <div className="search-button__image"></div>
            </button>
          </div>
        </form>

        {/* Прелоадер */}
        {(this.props.isFetchStart) &&
          <div className='preloader'></div>
        }
        
        {/* Блок ошибки */}
        {(this.props.isFetchError) &&
          <h2 className='error-block'>{this.props.isFetchError}</h2>
        }  


        {/* Карточка покемона при поиске */}
        {this.props.pokemon &&
          <Link className="pokemons-list__link" to={`/pokemon/${this.props.pokemon.id}`}>
            <div className='pokemon-card pokemon-card_single-search'>
              <p className='pokemon-card__name'>
                {this.props.pokemon.name[0].toUpperCase() + this.props.pokemon.name.substring(1)}
              </p>
              <div className="pokemon-card__images">
                <img 
                  className="pokemon-card__image"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.props.pokemon.id}.png`}
                  alt='pokemon'/>
              </div>
            </div>
          </Link>
        }


        {this.props.pokemons &&
        <div className="container">

          {/* Выпадающий список покемонов */}
          <div className="pokemons-list-container">
            <div className="icon-list">
              <p className="icon-list__text">Список покемонов</p>
              <div className={`icon-list__img_${this.props.listIsOpenBoolean}`} onClick={this.pokemonsListIsOpen}></div>
            </div>
            {(this.props.listIsOpenBoolean && this.props.pokemonsList) &&
              <div className='pokemons-list'>
                <ul className="pokemons-list__container">
                  {this.props.pokemonsList.results.sort((a, b) => {
                    if(a.name < b.name) { return -1; }
                    if(a.name > b.name) { return 1; }
                    return 0;
                  }).map((pokemon, index) => {  
                    return <Link className="pokemons-list__link" key={index} to={`/pokemon/${pokemon.url.match(/\d+(?=\D*$)/)}`}>
                      <li className="pokemons-list__card" key={index}>
                        <p className='pokemons-list__name'>
                        {pokemon.name}
                        </p>
                      </li>
                    </Link>})
                  }
                </ul>

                <div className="pokemons-list-container__buttons">
                  {this.props.pokemonsList.previous && 
                    <button className="pokemons-list-container__button_previous" onClick={ this.getPreviousPokemonsList }>Предыдущие</button>
                  }            
                  {(this.props.pokemonsList.next) && 
                    <button className="pokemons-list-container__button_next" onClick={ this.getNextPokemonsList }>Следующие</button>
                  }
                </div>

              </div>         
            }
          </div>



            {/* Покемоны на главной странице */}
          <div className="pokemons-container">
            <ul className="pokemons-card-container">
              {this.props.pokemons.results.map((pokemon, index)=> {
                return <Link className="pokemon-card__link" key={index} to={`/pokemon/${pokemon.url.match(/\d+(?=\D*$)/)}`}>
                <li className="pokemon-card" key={index}>
                          <p className='pokemon-card__name'>
                            {pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}
                          </p>
                          <div className="pokemon-card__images">
                            <img 
                            className="pokemon-card__image" 
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.match(/\d+(?=\D*$)/)}.png`} 
                            alt='pokemon'/>
                          </div>
                        </li>
                  </Link>
                })
              }
            </ul>
            <div className="pokemons-container__buttons">
              {this.props.pokemons.previous && 
                <button className="pokemons-container__button_previous" onClick={ this.getPreviousPokemons }>&lt;</button>
              }           
              {(this.props.pokemons.next) && 
                <button className="pokemons-container__button_next" onClick={ this.getNextPokemons }>&gt;</button>
              }
            </div>

          </div>
        </div> 
        }

      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(pokemonsFetchData(url)),
    fetchDataPokemon: url => dispatch(pokemonFetchData(url)),
    fetchDataPokemonsList: url => dispatch(pokemonsListFetchData(url)),
    listIsOpen: () => dispatch(listOpen())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pokemons);
