import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalStyle } from './GlobalStyles/globalStyles';
import { Wrap } from './App.styled';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    imageRequest: '',
  };
  onFormSubmit = imageRequest => {
    this.setState({ imageRequest });
  };
  render() {
    return (
      <Wrap>
        <GlobalStyle />
        <Searchbar onSubmit={this.onFormSubmit} />
        <ImageGallery imageRequest={this.state.imageRequest} />
        <ToastContainer autoClose={3000} />
      </Wrap>
    );
  }
}
