import React from 'react'
import tmdb from '../utils/tmdb'
import NotFound from './NotFound'
import { Link } from 'react-router-dom'

function MovieCard({movie}) {

  if(!movie.title) return <h3 style={{textAlign:'center', marginTop:'20px'}}>Movie not found</h3>

  return (
    <>
        <Link to={`/movie/${movie.id}`} className='card'>
            <img src={tmdb.imageBase+movie.poster_path} alt={movie.title} onError={(e) => e.target.src = 'https://placehold.co/500x750/1a1a2e/444?text=No+Poster'}/>
            <h3>{movie.title}</h3>
        </Link>
    </>
  )
}

export default MovieCard