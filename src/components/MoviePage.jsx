import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieTrailer } from '../utils/tmdb';
import tmdb from '../utils/tmdb';

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

  if (!movie) return <h3 className="mtag tag text-lg sm:text-xl lg:text-2xl"><div className='animate-spin'>🎬</div></h3>;

  const director = movie.credits?.crew?.find(person => person.job === 'Director');
  const cast = movie.credits?.cast?.slice(0, 5) || [];

  return (
    <div className="moviepage padding flex flex-col items-center">
      <div className='flex flex-col md:flex-row md:gap-7 w-full max-w-6xl'>
        <img
          src={`${tmdb.imageBase}${movie.poster_path}`}
          alt={movie.title}
          onError={(e) => e.target.src = 'https://placehold.co/500x750/1a1a2e/444?text=No+Poster'}
          className="w-55 sm:w-56 md:w-64 lg:w-70 xl:w-80 object-cover rounded-2xl self-center"
        />
        <div className='flex flex-col items-start justify-start'>
          <h3 className="text-xl md:text-2xl font-bold">{movie.title}</h3>
          <p className="text-gray-400 text-sm md:text-base">
            {movie.release_date?.split('-')[0]} • {movie.runtime} min • ⭐ {movie.vote_average?.toFixed(1)}/10
          </p>

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="genres flex flex-wrap gap-2 my-2">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="genre font-bold text-sm bg-[#8a5cf640] text-gray-300 rounded-full border border-[#8a5cf680]">
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {director && (
            <p className="text-sm md:text-base text-gray-400 mt-1">
              Director: <span className="text-gray-300">{director.name}</span>
            </p>
          )}  

          {cast.length > 0 && (
            <p className="text-sm md:text-base text-gray-400 mt-1">
              Cast: <span className="text-gray-300">{cast.map(c => c.name).join(', ')}</span>
            </p>
          )}

          <p className="text-gray-300 mt-4 text-justify max-w-2xl">{movie.overview}</p>
        </div>
      </div>

      {trailer ? (
        <>
          <span className="trailer-text text-xl md:text-2xl font-bold mt-6">Watch Trailer 🔻</span>
          <div className='trailer border-3 border-[#8a5cf680] rounded-2xl w-full lg:w-200 overflow-hidden' style={{ padding: '0px' }}>
            <iframe
              src={`https://www.youtube.com/embed/${trailer}`}
              title="Trailer"
              allowFullScreen
              className="w-full rounded-xl h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px]"
            />
          </div>
        </>
      ) : (
        <p className='no-trailer text-center text-gray-400 py-8'>No trailer available</p>
      )}
    </div>
  );
}

export default MoviePage;