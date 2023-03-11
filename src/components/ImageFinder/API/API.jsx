import axios from 'axios';

async function fetchImages({ page, query, switchLoading }) {
  const BASE_URL = 'https://pixabay.com/api';
  const searchParams = new URLSearchParams({
    key: '32917365-5bd31ba6b729a0861d5d37e11',
    q: query,
    page: page,
    per_page: 12,
  });

  try {
    switchLoading();

    const { data } = await axios.get(`${BASE_URL}?${searchParams}`);
    return data;
  } catch (error) {
    console.log(error);
  } finally {
    switchLoading();
  }
}

export default fetchImages;
