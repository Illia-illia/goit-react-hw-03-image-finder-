import { Item, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ images }) => {
  return (
    <>
      {images.hits.map(({ id, webformatURL, largeImageURL }) => (
        <Item key={id}>
          <Img src={webformatURL} alt={webformatURL} />
        </Item>
      ))}
    </>
  );
};
