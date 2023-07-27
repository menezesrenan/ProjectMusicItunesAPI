import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    userName: '',
    isDisabled: true,
    loading: false,
    redirect: false,
  };

  validateLength = () => {
    const lengthMin = 3;
    const { userName } = this.state;
    const userNameValidate = userName.length >= lengthMin;
    this.setState({
      isDisabled: !userNameValidate,
    });
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.validateLength);
  };

  handleClick = () => {
    const { userName } = this.state;
    this.setState({ loading: true }, async () => {
      await createUser({ name: userName });
      this.setState({ loading: false, redirect: true });
    });
  };

  render() {
    const {
      userName, isDisabled, redirect, loading } = this.state;
    return (
      <div data-testid="page-login">
        {!loading ? (
          <form>
            <h1>Login</h1>
            <input
              id="userName"
              type="text"
              data-testid="login-name-input"
              name="userName"
              onChange={ this.handleChange }
              value={ userName }
              placeholder="nome de usuário"
            />
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ isDisabled }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </form>
        ) : <span>Carregando...</span>}
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

Login.propTypes = {
  name: PropTypes.string,
  isDisabled: PropTypes.bool,
  loading: PropTypes.bool,
  redirect: PropTypes.bool,
  handleChange: PropTypes.func,
  handleState: PropTypes.func,
  handleClick: PropTypes.func,
  loadingText: PropTypes.string,
}.isRequired;

export default Login;
