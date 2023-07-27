import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Artists from '../components/Artists';

class Search extends React.Component {
  state = {
    search: '',
    isDisabled: true,
    loading: false,
    loadingArtist: false,
    artist: '',
    results: '',
  };

  validateLength = () => {
    const lengthMin = 2;
    const { search } = this.state;
    const searchValidate = search.length >= lengthMin;
    this.setState({
      isDisabled: !searchValidate,
    });
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.validateLength);
  };

  search = async (searchRequest) => {
    this.setState({ loading: true, loadingArtist: true, artist: searchRequest });
    const results = await searchAlbumsAPI(searchRequest);
    this.setState({ loading: false, results, loadingArtist: false, search: '' });
  };

  searchByname = (results) => {
    if (results.length === 0) {
      return <span>Nenhum álbum foi encontrado</span>;
    }
    return results
      .map(({ collectionName, artworkUrl100, artistName, collectionId }, index) => (
        <Link
          key={ index }
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <Artists
            artworkUrl100={ artworkUrl100 }
            collectionName={ collectionName }
            artistName={ artistName }
          />
        </Link>
      ));
  };

  render() {
    const {
      search, isDisabled, loading, loadingArtist, results, artist,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />

        <form>
          <input
            id="name"
            type="text"
            data-testid="search-artist-input"
            name="search"
            onChange={ this.handleChange }
            value={ search }
            placeholder="Nome do artista"
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isDisabled }
            onClick={ () => this.search(search) }
          >
            Pesquisar
          </button>
        </form>

        <div>

          { loading && <spam>Carregando...</spam> }
          { !loadingArtist
            && !loading
            && results.length > 0
            && <span>{`Resultado de álbuns de: ${artist}`}</span>}
          { this.searchByname(results) }
        </div>
      </div>
    );
  }
}

export default Search;
