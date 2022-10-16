import { Component } from 'react';
import { toast } from 'react-toastify';
import { PropTypes } from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

import { ImagesList, Button, Item } from './ImageGallery.styled';

const API_KEY = '29578283-f288e571e878ef9103bc84709';
const BASE_URL = 'https://pixabay.com/api/?';

export class ImageGallery extends Component {
  state = {
    images: [],
    isLoading: false,
    page: 1,
    total: 0,
    largeImage: null,
    isModal: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevProps.imageRequest;
    const nextRequest = this.props.imageRequest;

    if (prevRequest !== nextRequest) {
      this.setState({ isLoading: true, images: [] });
      await fetch(
        `${BASE_URL}q=${nextRequest}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(r => r.json())
        .then(images => {
          this.setState({ page: 1 });
          const total = images.totalHits - 12;
          if (images.hits.length === 0) {
            toast.error(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            return this.setState({
              images: [],
              isLoading: false,
            });
          }
          this.setState({
            images: images.hits,
            isLoading: false,
            total,
          });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }

    if (prevState.page !== this.state.page) {
      this.setState({ isLoading: true });
      fetch(
        `${BASE_URL}q=${nextRequest}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(r => r.json())
        .then(images => {
          if (this.state.total <= 0) {
            toast.info(
              "We're sorry, but you've reached the end of search results."
            );
            this.setState({ isLoading: false });
          }
          if (this.state.page > 1) {
            return this.setState({
              images: [...prevState.images, ...images.hits],
              isLoading: false,
              total: prevState.total - 12,
            });
          }
        });
    }
  }

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = largeImage => {
    this.setState({ isModal: true, largeImage });
  };

  closeModal = () => this.setState({ isModal: false });

  render() {
    const { images, isLoading, largeImage } = this.state;
    const { imageRequest } = this.props;
    return (
      <>
        <ImagesList>
          {!imageRequest && <p>Please enter a request</p>}
          {images &&
            this.state.images.map(images => (
              <Item key={images.id}>
                <ImageGalleryItem images={images} onClick={this.openModal} />
              </Item>
            ))}
        </ImagesList>
        {isLoading && <Loader />}
        {this.state.isModal && (
          <Modal largeImage={largeImage} onClose={this.closeModal} />
        )}
        {images.length > 0 && (
          <Button type="button" onClick={this.onLoadMore}>
            Load more
          </Button>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  imageRequest: PropTypes.string.isRequired,
};
