import { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';

import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    imageRequest: '',
  };

  onInputValue = e => {
    const imageRequest = e.currentTarget.value.toLowerCase();
    this.setState({ imageRequest });
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.imageRequest.trim() === '') {
      return toast.error('Please enter a request');
    }
    this.props.onSubmit(this.state.imageRequest.trim());
    this.setState({ imageRequest: '' });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.onSubmit}>
          <SearchFormButton type="submit">
            <AiOutlineSearch size="32px" />
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onInputValue}
            value={this.state.imageRequest}
          />
        </SearchForm>
      </Header>
    );
  }
}
