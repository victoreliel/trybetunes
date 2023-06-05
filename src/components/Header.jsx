import React, { Component } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      userLogin: '',
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const userInfo = await getUser();
      this.setState({
        userLogin: userInfo.name,
        loading: false,
      });
    });
  }

  render() {
    const { userLogin, loading } = this.state;
    return (
      <div>
        { loading ? <Loading /> : (
          <div className="header-and-nav">
            <header data-testid="header-component">
              <Link to="/">
                <img className="header-logo" src="https://achtenberg16.github.io/trybe-tunes/static/media/headerLogo.806a1a7d.svg" alt="Logo da TrybeTunes" />
              </Link>
              <div className="user" data-testid="header-user-name">
                <div className="user-icon">
                  <BiUserCircle />
                </div>
                { userLogin }
              </div>
            </header>
            <nav>
              <Link
                className="link"
                to="/search"
                data-testid="link-to-search"
              >
                Pesquisa
              </Link>
              <Link
                className="link"
                to="/favorites"
                data-testid="link-to-favorites"
              >
                Favoritas
              </Link>
              <Link
                className="link"
                to="/profile"
                data-testid="link-to-profile"
              >
                Perfil
              </Link>
            </nav>
          </div>
        )}
      </div>
    );
  }
}

export default Header;
