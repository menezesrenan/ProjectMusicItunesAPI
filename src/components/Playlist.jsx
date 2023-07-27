import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
// import Favorites from '../pages/Favorites';

class Playlist extends Component {
  state = {
    loading: false,
    favorited: false,
    playList: [],
  };

  componentDidMount() {
    this.isFavorited();
    this.favoriteSongsList();
  }

  favoriteSongsList = async () => {
    this.setState({ loading: true });
    const playList = await getFavoriteSongs();
    this.setState({ playList, loading: false });
  };

  isFavorited = async () => {
    const { trackId } = this.props;
    const favoriteSongs = await getFavoriteSongs();
    const favorited = favoriteSongs
      ? favoriteSongs.some((track) => track.trackId === trackId)
      : false;
    this.setState({ favorited });
    return favorited;
  };

  onFavoriteClick = async (favorited) => {
    const { song } = this.props;
    if (favorited) {
      this.setState({ loading: true });
      await removeSong(song);
      this.setState({ loading: false, favorited: false });
    } else {
      this.setState({ loading: true });
      await addSong(song);
      this.setState({ loading: false, favorited: true });
    }
  };

  handleChange = async (song) => {
    this.onFavoriteClick(song);
    await this.favoriteSongsList();
  };

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
    } = this.props;

    const { loading, favorited, playList } = this.state;
    return (
      <div>

        {loading && <spam>Carregando...</spam>}

        <label htmlFor="input_favorites">
          Favorita
          <input
            type="checkbox"
            name="favorite"
            checked={ favorited }
            id="input_favorites"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ () => this.handleChange(favorited) }
          />

          <h4>{trackName}</h4>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
          </audio>
        </label>
        <p>{ `${playList.length} músicas favoritas!` }</p>

      </div>
    );
  }
}

Playlist.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  // trackInfo: PropTypes.shape.isRequired,
  song: PropTypes.shape.isRequired,

};

export default Playlist;
