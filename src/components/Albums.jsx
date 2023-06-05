import React, { Component } from 'react';
import PropTypes, { object } from 'prop-types';
import { MdAlbum } from 'react-icons/md';
import { Link } from 'react-router-dom';

class Albums extends Component {
  render() {
    const { albums, artist } = this.props;
    if (albums.length > 0) {
      return (
        <div>
          <h4 className="result-title">
            { `Resultado de álbuns de: ${artist}` }
          </h4>
          <div className="search-result">
            { albums.map((album, index) => (
              <div className="album-card" key={ index }>
                <img
                  className="album-image"
                  src={ album.artworkUrl100 }
                  alt={ album.artistId }
                />
                <p>{ album.collectionName }</p>
                <p>{ album.artistName }</p>
                <Link
                  className="remove-link-style"
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  <MdAlbum className="album-icon" />
                </Link>
              </div>
            )) }
          </div>
        </div>
      );
    }
    return (
      <span>Nenhum álbum foi encontrado</span>
    );
  }
}

Albums.propTypes = {
  albums: PropTypes.arrayOf(object),
  artist: PropTypes.string,
}.isRequired;

export default Albums;
