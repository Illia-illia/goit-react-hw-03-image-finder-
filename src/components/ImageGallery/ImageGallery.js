import { Component } from 'react';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import { ImagesList } from './ImageGallery.styled';

const API_KEY = '29578283-f288e571e878ef9103bc84709';
const BASE_URL = 'https://pixabay.com/api/?';

export class ImageGallery extends Component {
  state = {
    images: null,
  };
  async componentDidUpdate(prevProps, _) {
    const prevRequest = prevProps.imageRequest;
    const nextRequest = this.props.imageRequest;
    if (prevRequest !== nextRequest) {
      await fetch(
        `${BASE_URL}q=${nextRequest}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(r => r.json())
        .then(images => this.setState({ images }));
    }
  }
  render() {
    return (
      <ImagesList>
        {!this.state.images && <p>Please enter a request</p>}
        {this.state.images && <ImageGalleryItem images={this.state.images} />}
      </ImagesList>
    );
  }
}
