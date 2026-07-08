import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../utils/tmdb';
import MovieCard from './MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function SearchResults() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.get('q');
  const page = Number(searchParams.get('page')) || 1;
  const [totalPages, setTotalPages] = useState(0);

  const setPage = (newPage) => {
    setSearchParams({ q: query, page: newPage });
  };

  useEffect(() => {
    if (query) {
      setSearchParams({ q: query, page: 1 });
    }
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
    return <h3 className="mtag tag text-lg sm:text-xl lg:text-2xl"><div className='animate-spin'>🎬</div></h3>;
  }

  if (error) {
    return <h3 className="mtag tag text-lg sm:text-xl lg:text-2xl">{error}</h3>;
  }

  if (!query) {
    return <h3 className="mtag tag text-lg sm:text-xl lg:text-2xl">Type something to search</h3>;
  }

  if (movies.length === 0) {
    return (
      <>
        <p className="mtag tag text-lg sm:text-xl lg:text-2xl">Sorry, we don't have that.</p>
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
          <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="page-btns rounded disabled:opacity-50 disabled:cursor-not-allowed"><ChevronLeft/></button>

          {pageNumbers.map((p, index) => {
            if (p === undefined || p === null) return null;
            const isNumber = typeof p === 'number';
            const isActive = isNumber && p === page;
            return <button key={index} onClick={() => isNumber && setPage(p)} disabled={!isNumber} className={`page-btns ${isActive ? 'active' : ''}`}>{p}</button>;
          })}

          <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="page-btns rounded disabled:opacity-50 disabled:cursor-not-allowed"><ChevronRight/></button>
        </div>
      )}
    </>
  );
}

export default SearchResults;