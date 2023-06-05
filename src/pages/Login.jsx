import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BsMusicPlayer } from 'react-icons/bs';
import { BiMusic } from 'react-icons/bi';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      isSubmitButtonDisabled: true,
      userLogin: '',
      loading: false,
    };
  }

  validateLogin = ({ userLogin } = this.state) => {
    const minInputLength = 3;
    return userLogin.length < minInputLength;
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.setState({ isSubmitButtonDisabled: this.validateLogin() });
    });
  }

  handleClick = () => {
    this.setState({ loading: true }, async () => {
      const { userLogin } = this.state;
      const { history } = this.props;
      await createUser({ name: userLogin });
      history.push('/search');
    });
  }

  render() {
    const { isSubmitButtonDisabled, loading } = this.state;
    return (
      <section className="login-page" data-testid="page-login">
        { loading ? <Loading /> : (
          <div className="form-container">
            <div className="title-container">
              <BsMusicPlayer />
              <h1>TrybeTunes</h1>
              <BiMusic />
            </div>
            <h4>Login</h4>
            <form className="login-form">
              <input
                type="text"
                name="userLogin"
                className="input-login"
                data-testid="login-name-input"
                placeholder="Digite seu nome"
                onChange={ (event) => this.handleChange(event) }
              />
              <button
                type="submit"
                className="login-button-submit"
                data-testid="login-submit-button"
                disabled={ isSubmitButtonDisabled }
                onClick={ this.handleClick }
              >
                Enviar
              </button>
            </form>
          </div>
        ) }
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
