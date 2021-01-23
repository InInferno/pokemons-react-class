import React, { Component } from 'react';
import { 
  pokemonFetchData,
  pokemonsListFetchData,
  listOpen
} from '../../store/actions/pokemons';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom'
import './Pokemon.css'

class Pokemon extends Component {

  componentDidMount() {
    this.props.fetchDataPokemon(`https://pokeapi.co/api/v2/pokemon/${this.props.match.params.id}`);
    this.props.fetchDataPokemonsList(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=0`);
  }

  pokemonsListIsOpen = () => {
    console.log(typeof(this.props.listIsOpenBoolean))
    this.props.listIsOpen();
  }

  getNextPokemonsList = (event) => {
    event.preventDefault();
    this.props.fetchDataPokemonsList(`${this.props.pokemonsList.next}`);
  }
  
  getPreviousPokemonsList = (event) => {
    event.preventDefault();
    this.props.fetchDataPokemonsList(`${this.props.pokemonsList.previous}`);
  }

  componentDidUpdate(prevId) {
    if (this.props.match.params.id !== prevId.match.params.id) {
      this.props.fetchDataPokemon(`https://pokeapi.co/api/v2/pokemon/${this.props.match.params.id}`);
    }
  }

  render() {
    
    return (


      <div className="container-single">

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
                    return <Link 
                    className="pokemons-list__link" 
                    key={index} 
                    to={`/pokemon/${pokemon.url.match(/\d+(?=\D*$)/)}`}
                    >
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
        

        {/* Подробная карточка покемона */}
        {this.props.pokemon &&
          <div className="single-card">

            <div className="single-card__container">
              <p className="single-card__name">{this.props.pokemon.name[0].toUpperCase() + this.props.pokemon.name.substring(1)}</p>
              <img 
              className="single-card__image"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.props.pokemon.id}.png`} 
              alt="pokemon" />
            </div>

            <div className="single-card__container">
            <p className="single-card__text">Рост:</p>
            <p className="single-card__text-item">{this.props.pokemon.height * 10} сантиметров</p>
            <p className="single-card__text">Вес:</p>
            <p className="single-card__text-item">{this.props.pokemon.weight / 10} килограмм</p>
            
            <p className="single-card__text">Тип:</p>
            <ul className="single-card__list">
              {this.props.pokemon.types.map((type, index)=> {
                return<li 
                  key={index}
                  className="single-card__list-item"
                  >
                    <p className="single-card__list-text">{type.type.name}</p>
                </li>
                })
              }
            </ul>

            <p className="single-card__text">Способности:</p>
            <ul className="single-card__list">
              {this.props.pokemon.abilities.map((ability, index)=> {
                return<li 
                  key={index}
                  className="single-card__list-item"
                  >
                    <p className="single-card__list-text">{ability.ability.name}</p>
                </li>
                })
              }
            </ul>
            </div>
          </div> 
        }

      </div>
    )
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    fetchDataPokemon: url => dispatch(pokemonFetchData(url)),
    fetchDataPokemonsList: url => dispatch(pokemonsListFetchData(url)),
    listIsOpen: () => dispatch(listOpen())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Pokemon));
