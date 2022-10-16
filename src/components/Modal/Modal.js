import { Component } from 'react';
import { PropTypes } from 'prop-types';

import { Backdrop, ModalImage } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleClick);
  }

  handleClick = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  closeModal = () => {
    this.props.onClose();
  };

  render() {
    return (
      <Backdrop onClick={this.closeModal}>
        <ModalImage src={this.props.largeImage} alt={this.props.tags} />
      </Backdrop>
    );
  }
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
};
