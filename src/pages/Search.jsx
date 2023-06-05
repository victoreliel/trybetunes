import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import Header from '../components/Header';
import Albums from '../components/Albums';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      isSubmitButtonDisabled: true,
      searchText: '',
      loading: false,
      albums: [],
      searchResult: false,
      artist: '',
    };
  }

  handleValidation = ({ target }) => {
    const { value } = target;
    this.setState({ searchText: value }, () => {
      const minInputLength = 2;
      const disabled = value.length < minInputLength;
      this.setState({ isSubmitButtonDisabled: disabled });
    });
  }

  handleSearch = () => {
    const { searchText } = this.state;
    this.setState({
      loading: true,
      artist: searchText,
      searchResult: true },
    async () => {
      const albumsInfo = await searchAlbumsAPI(searchText);
      this.setState({
        albums: albumsInfo,
        searchText: '',
        isSubmitButtonDisabled: true,
        loading: false,
      });
    });
  }

  render() {
    const {
      isSubmitButtonDisabled,
      searchText,
      loading,
      albums,
      artist,
      searchResult,
    } = this.state;
    return (
      <div>
        <Header />
        <div className="search-page">
          <section className="search-container" data-testid="page-search">
            <input
              type="text"
              name="artist-input"
              className="artist-input"
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
              value={ searchText }
              onChange={ (event) => this.handleValidation(event) }
            />
            <button
              type="submit"
              className="search-button-submit"
              data-testid="search-artist-button"
              disabled={ isSubmitButtonDisabled }
              onClick={ this.handleSearch }
            >
              <BsSearch />
            </button>
          </section>
        </div>
        { loading && <Loading /> }
        { searchResult && <Albums albums={ albums } artist={ artist } /> }
      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Search;
