import { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from 'components/ImageFinder/ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';
import fetchImages from './API/API';

function ImageFinder() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [lastPage, setLastPage] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { hits, totalHits } = await fetchImages({
        page,
        query,
        switchLoading,
      });

      page === 1
        ? setData(hits)
        : setData(prevState => [...prevState, ...hits]);
      checkLastPage(totalHits);
    }
    fetchData();
  }, [page, query]);

  function switchLoading() {
    setLoading(prevState => !prevState);
  }

  async function onSearch(e) {
    e.preventDefault();
    setPage(1);
    setQuery(e.target.query.value);
    window.scrollTo(0, 0);
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

  function checkLastPage(totalHits) {
    if (page === Math.ceil(totalHits / 12)) setLastPage(true);
  }

  return (
    <>
      <Searchbar onSearch={onSearch} />
      {data && <ImageGallery data={data} openModal={openModal} />}
      {data && !lastPage && (
        <Button loadMore={() => setPage(prevState => prevState + 1)} />
      )}
      {modalIsOpen && <Modal closeModal={closeModal} image={modalImage} />}
      {loading && <Loader />}
    </>
  );
}

export default ImageFinder;
