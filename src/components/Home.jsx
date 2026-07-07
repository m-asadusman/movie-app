import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from './MovieCard';
import { fetchMovies } from '../utils/tmdb';

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  const page = Number(searchParams.get('page')) || 1;

  const setPage = (newPage) => {
    setSearchParams({ page: newPage });
  };

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const data = await fetchMovies(page);
      setMovies(data.results || []);
      setTotalPages(data.total_pages || 0);
      setLoading(false);
    };
    loadMovies();
  }, [page]);

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const start = Math.max(1, page - delta);
    const end = Math.min(totalPages, page + delta);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (start > 1) {
      range.unshift(1);
      if (start > 2) range.splice(1, 0, '...');
    }

    if (end < totalPages) {
      if (end < totalPages - 1) range.push('...');
      range.push(totalPages);
    }

    return range;
  };

  const pageNumbers = getPageNumbers();

  if (loading) {
    return <h3 className="tag text-lg sm:text-xl lg:text-2xl"><div className='animate-spin'>🎬</div></h3>;
  }

  return (
    <>
    
      <h1 className="tag text-lg sm:text-xl lg:text-2xl">Now Playing🔻</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 padding">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {totalPages > 0 && (
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 py-6">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="page-btns rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ◀
          </button>

          {pageNumbers.map((p, index) => {
            if (p === undefined || p === null) return null;
            const isNumber = typeof p === 'number';
            const isActive = isNumber && p === page;
            return (
              <button
                key={index}
                onClick={() => isNumber && setPage(p)}
                disabled={!isNumber}
                className={`page-btns ${isActive ? 'active' : ''}`}
              >
                {p}
              </button>
            );
          })}

          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="page-btns rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ▶
          </button>
        </div>
      )}
    </>
  );
}

export default Home;