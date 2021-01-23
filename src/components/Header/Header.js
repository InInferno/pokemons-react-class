import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Link className="header__logo" to={`/`}></Link>
        <h1 className='header__title'>Pokemons</h1>
      </div>
    )
  }
}

export default connect()(Header);
