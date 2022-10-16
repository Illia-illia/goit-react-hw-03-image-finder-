import { Item, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ images }) => {
  return (
    <>
      {images.map(({ id, webformatURL, largeImageURL }) => (
        <Item key={id}>
          <Img src={webformatURL} alt={webformatURL} />
        </Item>
      ))}
    </>
  );
};
