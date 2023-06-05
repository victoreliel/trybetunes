import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import error404Img from './error-404.png';

class NotFound extends Component {
  render() {
    return (
      <div className="page-not-found" data-testid="page-not-found">
        <Link to="/">
          <img src={ error404Img } alt="Page not found" />
        </Link>
        <span>[PT] Clique na imagem para voltar à página inicial</span>
        <span>[EN] Click on the image to return to the home page</span>
      </div>
    );
  }
}

export default NotFound;
