import React, { Component } from 'react';
import Header from '../components/Header';

class Favorites extends Component {
  render() {
    return (
      <div>
        <Header />
        <section data-testid="page-favorites">Favoritas</section>
      </div>
    );
  }
}

export default Favorites;
