import { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from 'components/ImageFinder/ImageGallery';
import Button from './Button';
import Loader from './Loader';
import fetchImages from './API';

function ImageFinder() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [lastPage, setLastPage] = useState(false);

  useEffect(() => {
    if (!query.trim()) return;
    async function fetchData() {
      const { hits, totalHits } = await fetchImages({
        page,
        query,
        switchLoading,
      });

      page === 1
        ? setData(hits)
        : setData(prevState => [...prevState, ...hits]);

      if (page === Math.ceil(totalHits / 12)) setLastPage(true);
    }
    fetchData();
  }, [page, query]);

  function switchLoading() {
    setLoading(prevState => !prevState);
  }

  async function onSearch(searchQuery) {
    setPage(1);
    setQuery(searchQuery);
    window.scrollTo(0, 0);
  }

  return (
    <>
      <Searchbar onSearch={onSearch} />
      {data && <ImageGallery data={data} />}
      {data && !lastPage && (
        <Button loadMore={() => setPage(prevState => prevState + 1)} />
      )}
      {loading && <Loader />}
    </>
  );
}

export default ImageFinder;
