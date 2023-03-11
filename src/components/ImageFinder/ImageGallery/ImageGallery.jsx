import { useState } from 'react';
import { Gallery, Item } from './ImageGallery.styled';

import PropTypes from 'prop-types';
import Modal from '../Modal';

const ImageGallery = function ({ data }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  function openModal(image) {
    setModalIsOpen(true);
    setModalImage(image);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <>
      <Gallery>
        {data.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <Item key={id}>
              <img
                src={webformatURL}
                onClick={() => openModal(largeImageURL)}
                alt={tags}
              />
            </Item>
          );
        })}
      </Gallery>
      {modalIsOpen && <Modal image={modalImage} closeModal={closeModal} />}
    </>
  );
};

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGallery;
