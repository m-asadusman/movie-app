
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../utils/tmdb';
import MovieCard from './MovieCard';

function SearchResults() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0)
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    const loadMovies = async () => {

      if (!query) {
        setMovies([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await searchMovies(query, page);
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 0);
      } catch (err) {
        setError('Failed to load search results. Please try again.');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [query, page]);

  const getPageNumbers = () => {
    const delta = 2; // How many pages to show on each side of current page
    const range = [];
    const start = Math.max(1, page - delta);
    const end = Math.min(totalPages, page + delta);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // Add first page if not in range
    if (start > 1) {
      range.unshift(1);
      if (start > 2) range.splice(1, 0, '...');
    }

    // Add last page if not in range
    if (end < totalPages) {
      if (end < totalPages - 1) range.push('...');
      range.push(totalPages);
    }

    return range;
  };

  const pageNumbers = getPageNumbers();

  if (loading) {
    return <h3 className="tag text-lg sm:text-xl lg:text-2xl">Searching...</h3>;
  }

  if (error) {
    return <h3 className="tag text-lg sm:text-xl lg:text-2xl">{error}</h3>;
  }

  if (!query) {
    return <h3 className="tag text-lg sm:text-xl lg:text-2xl">Type something to search</h3>;
  }

  if (movies.length === 0) {
    return (
      <>
        <p className="tag text-lg sm:text-xl lg:text-2xl">Sorry, we don't have that.</p>
      </>
    );
  }

  return (
    <>
      <h1 className='tag text-lg sm:text-xl lg:text-2xl'>Search results for: '{query}'</h1>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 padding'>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {totalPages > 0 && (
        <div className="flex flex-wrap justify-center items-center gap-2 py-6">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="page-btns rounded disabled:opacity-50 disabled:cursor-not-allowed">◀</button>

          {pageNumbers.map((p, index) => {
            if (p === undefined || p === null) return null;
            const isNumber = typeof p === 'number';
            const isActive = isNumber && p === page;
            return <button key={index} onClick={() => isNumber && setPage(p)} disabled={!isNumber} className={`page-btns ${isActive ? 'active' : ''}`}>{p}</button>;
          })}

          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="page-btns rounded disabled:opacity-50 disabled:cursor-not-allowed">▶</button>
        </div>
      )}

    </>
  );
}

export default SearchResults;