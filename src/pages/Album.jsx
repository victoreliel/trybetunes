import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MdAlbum } from 'react-icons/md';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      albumContent: [],
      albumInfo: {},
      loading: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const favorites = await getFavoriteSongs();
      this.setState({ favoriteSongs: favorites });
      const { match: { params: { id } } } = this.props;
      const albumContent = await getMusics(id);
      this.setState({
        albumContent,
        albumInfo: albumContent[0],
        loading: false,
      });
    });
  }

  checkFavorite = (id) => {
    const { favoriteSongs } = this.state;
    return favoriteSongs.some((music) => music.trackId === id);
  }

  render() {
    const { albumContent, albumInfo, loading } = this.state;
    return (
      <div>
        <Header />
        { loading ? <Loading /> : (
          <div className="album-track-page">
            <div className="album-cover" data-testid="page-album">
              <img src={ albumInfo.artworkUrl100 } alt={ albumInfo.collectionName } />
              <h2 data-testid="album-name">{ albumInfo.collectionName }</h2>
              <h4 data-testid="artist-name">{ albumInfo.artistName }</h4>
              <MdAlbum className="album-icon" />
            </div>
            <div className="music-list">
              { albumContent.map((music, index) => index !== 0 && (
                <p key={ index }>
                  <MusicCard
                    trackName={ music.trackName }
                    previewUrl={ music.previewUrl }
                    trackId={ music.trackId }
                    collectionId={ music.collectionId }
                    favorite={ this.checkFavorite(music.trackId) }
                  />
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
