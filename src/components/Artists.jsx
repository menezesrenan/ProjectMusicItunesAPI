import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Artists extends Component {
  render() {
    const { collectionName, artworkUrl100, artistName } = this.props;
    return (
      <div>
        <img src={ artworkUrl100 } alt={ `capa do album do artista ${artistName}` } />
        <p>{ collectionName }</p>
        <p>{ artistName }</p>
      </div>
    );
  }
}

Artists.propTypes = {
  artistName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  collectionName: PropTypes.string,
}.isRequired;

export default Artists;
