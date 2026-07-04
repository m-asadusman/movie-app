import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import tmdb from '../utils/tmdb'
import { fetchMovies } from '../utils/tmdb'

function Home() {

  const [movies, setMovies] = useState([])

  useEffect(()=>{
    const loadMovies = async()=>{
      const data = await fetchMovies()
      setMovies(data)
    }
    loadMovies()
  },[])

  return (
    <>
        <h1 className='tag text-lg sm:text-xl lg:text-2xl'>Now Playing🔻</h1>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 padding'>
            {movies.map((movie)=>(
              <MovieCard key={movie.id} movie={movie}/>
            ))}
        </div>      
    </>
  )
}

export default Home