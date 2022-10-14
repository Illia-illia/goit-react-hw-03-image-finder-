import { Component } from 'react';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import { ImagesList } from './ImageGallery.styled';

const API_KEY = '29578283-f288e571e878ef9103bc84709';
const BASE_URL = 'https://pixabay.com/api/?';

export class ImageGallery extends Component {
  state = {
    images: null,
    isLoading: false,
  };
  async componentDidUpdate(prevProps, _) {
    const prevRequest = prevProps.imageRequest;
    const nextRequest = this.props.imageRequest;
    if (prevRequest !== nextRequest) {
      this.setState({ isLoading: true });
      await fetch(
        `${BASE_URL}q=${nextRequest}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(r => r.json())
        .then(images => this.setState({ images }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }
  render() {
    const { images, isLoading } = this.state;
    const { imageRequest } = this.props;
    return (
      <ImagesList>
        {isLoading && <div>LOADING...</div>}
        {!imageRequest && <p>Please enter a request</p>}
        {images && <ImageGalleryItem images={images} />}
      </ImagesList>
    );
  }
}
