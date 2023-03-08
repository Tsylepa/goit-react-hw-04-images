import { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from 'components/ImageFinder/ImageGallery';
import axios from 'axios';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';

function ImageFinder() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    if (page === 1) return;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  async function fetchImages(page) {
    const BASE_URL = 'https://pixabay.com/api';
    const searchParams = new URLSearchParams({
      key: '32917365-5bd31ba6b729a0861d5d37e11',
      q: query,
      page: page,
      per_page: 12,
    });

    try {
      setLoading(true);

      const {
        data: { hits },
      } = await axios.get(`${BASE_URL}?${searchParams}`);
      return hits;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchData() {
    const incomingData = await fetchImages(page);
    setData(prevState => [...prevState, ...incomingData]);
  }

  async function onSearch(e) {
    e.preventDefault();
    setPage(1);
    const data = await fetchImages();
    setData(data);

    window.scrollTo(0, 0);
  }

  function handleInput(e) {
    setQuery(e.target.value);
  }

  function openModal(image) {
    setModalIsOpen(true);
    setModalImage(image);
    document.addEventListener('keydown', onEscPress);
  }

  function closeModal() {
    setModalIsOpen(false);
    document.removeEventListener('keydown', onEscPress);
  }

  function onEscPress(e) {
    if (e.key !== 'Escape') return;
    closeModal();
  }

  return (
    <>
      <Searchbar onSearch={onSearch} handleInput={handleInput} />
      <ImageGallery data={data} openModal={openModal} />
      {data.length !== 0 && (
        <Button loadMore={() => setPage(prevState => prevState + 1)} />
      )}
      {modalIsOpen && <Modal closeModal={closeModal} image={modalImage} />}
      {loading && <Loader />}
    </>
  );
}

export default ImageFinder;
