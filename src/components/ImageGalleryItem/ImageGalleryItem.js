import { Component } from 'react';
import { PropTypes } from 'prop-types';

import { Img } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  openModal = () => {
    this.props.onClick(this.props.images.largeImageURL);
  };

  render() {
    const { images } = this.props;
    return (
      <Img
        src={images.webformatURL}
        alt={images.tags}
        onClick={this.openModal}
      />
    );
  }
}

ImageGalleryItem.propTypes = {
  images: PropTypes.object.isRequired,
};
