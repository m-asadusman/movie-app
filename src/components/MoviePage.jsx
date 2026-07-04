import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieTrailer } from '../utils/tmdb';
import tmdb from '../utils/tmdb'; 
import MovieCard from './MovieCard';

function MoviePage() {
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const loadData = async () => {
      const movieData = await fetchMovieDetails(id);
      const trailerData = await fetchMovieTrailer(id);
      setMovie(movieData);
      setTrailer(trailerData);
    };
    
    loadData();
  }, [id]);

  if (!movie) return <h3 className="tag text-lg sm:text-xl lg:text-2xl">...Loading</h3>;

  return (
    <>
      <div className='padding'>
        <img src={`${tmdb.imageBase}${movie.poster_path}`} alt={movie.title} />
        <h3>{movie.title}</h3>
        <p>{movie.overview}</p>
        {trailer ? (
          <iframe
            src={`https://www.youtube.com/embed/${trailer}`}
            title="Trailer"
            allowFullScreen
          />
        ) : (
          <p>No trailer available</p>
        )}
      </div>
    </>
  );
}

export default MoviePage;