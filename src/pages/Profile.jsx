import React, { Component } from 'react';
import Header from '../components/Header';

class Profile extends Component {
  render() {
    return (
      <div>
        <Header />
        <section data-testid="page-profile">Perfil</section>
      </div>
    );
  }
}

export default Profile;
