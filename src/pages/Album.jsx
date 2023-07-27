import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Playlist from '../components/Playlist';

class Album extends React.Component {
  state = {
    albuns: [],
  };

  componentDidMount() {
    this.getAlbumMusics();
  }

  getAlbumMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({ albuns: musics });
  };

  render() {
    const { albuns } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          albuns.map((artist, index) => (index === 0 ? (
            <div key={ index }>
              <p data-testid="artist-name">{artist.artistName}</p>
              <p data-testid="album-name">{artist.collectionName}</p>
            </div>
          ) : (<Playlist
            key={ index }
            trackName={ artist.trackName }
            previewUrl={ artist.previewUrl }
            trackId={ artist.trackId }
            song={ artist }
          />)))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
};

export default Album;
