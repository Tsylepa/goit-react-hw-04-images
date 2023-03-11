import { useEffect, useState } from 'react';
import { Overlay, Img } from './Modal.styled';
import PropTypes from 'prop-types';

const Modal = function ({ closeModal, image }) {
  useEffect(() => {
    document.addEventListener('keydown', onEscPress);

    return () => {
      document.removeEventListener('keydown', onEscPress);
    };
  }, [onEscPress]);

  function onEscPress(e) {
    if (e.key !== 'Escape') return;
    console.log('dsdsdsd');
    closeModal();
  }

  return (
    <Overlay
      onClick={e => {
        e.target === e.currentTarget && closeModal(e);
      }}
    >
      <div>
        <Img src={image} alt="" />
      </div>
    </Overlay>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
};

export default Modal;
