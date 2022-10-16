import { Component } from 'react';
import { toast } from 'react-toastify';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import { ImagesList, Button } from './ImageGallery.styled';

const API_KEY = '29578283-f288e571e878ef9103bc84709';
const BASE_URL = 'https://pixabay.com/api/?';

export class ImageGallery extends Component {
  state = {
    images: [],
    isLoading: false,
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevProps.imageRequest;
    const nextRequest = this.props.imageRequest;
    if (prevRequest !== nextRequest || prevState.page !== this.state.page) {
      this.setState({ isLoading: true });
      await fetch(
        `${BASE_URL}q=${nextRequest}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(r => r.json())
        .then(images => {
          if (images.length === []) {
            this.setState({
              images: [],
            });
            return toast.error(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          }

          if (this.state.page > 1) {
            console.log(prevState.images);
            console.log('new', images.hits);
            const all = [...prevState.images, ...images.hits];
            console.log('all', all);
            return this.setState({
              images: [...prevState.images, ...images.hits],
              isLoading: false,
            });
          }

          return this.setState({
            images: images.hits,
            isLoading: false,
          });
        });
    }
  }
  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isLoading } = this.state;
    const { imageRequest } = this.props;
    return (
      <>
        <ImagesList>
          {isLoading && <div>LOADING...</div>}
          {!imageRequest && <p>Please enter a request</p>}
          {images && <ImageGalleryItem images={images} />}
        </ImagesList>
        {images.length > 0 && (
          <Button type="button" onClick={this.onLoadMore}>
            Load more
          </Button>
        )}
      </>
    );
  }
}
