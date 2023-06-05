import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TiHeart } from 'react-icons/ti';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorite: false,
    };
  }

  componentDidMount() {
    const { favorite } = this.props;
    this.setState({ favorite });
  }

  getMusicInfo = async (collectionId, trackId) => {
    const albumContent = await getMusics(collectionId);
    return albumContent.filter((music, index) => index !== 0 && music)
      .find((music) => music.trackId === trackId);
  }

  handleCheck = ({ target }, collectionId, trackId) => {
    this.setState({
      loading: true,
      favorite: target.checked,
    }, async () => {
      const musicInfo = await this.getMusicInfo(collectionId, trackId);
      if (target.checked === true) {
        await addSong(musicInfo);
      } else {
        await removeSong(musicInfo);
      }
      this.setState({ loading: false });
    });
  }

  render() {
    const { trackName, previewUrl, trackId, collectionId } = this.props;
    const { loading, favorite } = this.state;
    return (
      <section>
        { loading && <Loading /> }
        <h4>{ trackName }</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          {`O seu navegador não suporta o elemento ${trackName}`}
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId }>
          <input
            type="checkbox"
            id={ trackId }
            className="favorite-input"
            data-testid={ `checkbox-music-${trackId}` }
            checked={ favorite }
            onChange={ ({ target }) => this.handleCheck(
              { target }, collectionId, trackId,
            ) }
          />
          <TiHeart size={ 25 } className="favorite-icon" />
        </label>
      </section>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  collectionId: PropTypes.number,
}.isRequired;

export default MusicCard;
