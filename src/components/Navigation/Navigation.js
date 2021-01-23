import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

class Navigation extends Component {
  render() {
    return (
      <div className="nav-container">
        <Link className="nav-container__link" to={`/`}>На главную</Link>
      </div>
    )
  }
}

export default Navigation;
