import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    loading: false,
    userName: '',
  };

  componentDidMount() {
    this.getUserApi();
  }

  getUserApi = () => {
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      this.setState({
        userName: user.name,
        loading: false,
      });
    });
  };

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        <nav>
          <ul>
            <li>
              <Link data-testid="link-to-search" to="/search">Search</Link>
            </li>
            <li>
              <Link to="/album/:id">Album</Link>
            </li>
            <li>
              <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
            </li>
            <li>
              <Link data-testid="link-to-profile" to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/profile/edit">Profile Edit</Link>
            </li>
          </ul>
          { loading
            ? <span>Carregando...</span>
            : (
              <div>
                <p data-testid="header-user-name">
                  {
                    userName
                  }
                </p>
              </div>)}
        </nav>
      </header>
    );
  }
}
