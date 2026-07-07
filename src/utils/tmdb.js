const tmdb = {
    apikey: import.meta.env.VITE_TMDB_API_KEY,
    baseUrl: 'https://api.themoviedb.org/3',
    imageBase: 'https://image.tmdb.org/t/p/w500'
}

export default tmdb

export const fetchMovies = async (page = 1)=>{
    const res = await fetch(tmdb.baseUrl+'/movie/now_playing?api_key='+tmdb.apikey+'&page='+page)
    const data = await res.json()
    return data
}

export const fetchMovieDetails = async (id)=>{
    const res = await fetch(`${tmdb.baseUrl}/movie/${id}?api_key=${tmdb.apikey}&append_to_response=credits`)
    const data = await res.json()
    return data
}

export const fetchMovieTrailer = async (id) => {
  const response = await fetch(`${tmdb.baseUrl}/movie/${id}/videos?api_key=${tmdb.apikey}`);
  const data = await response.json();

  const trailer = data.results.find(
    video => video.type === 'Trailer' && video.site === 'YouTube'
  );

  return trailer ? trailer.key : null; 
};

export const searchMovies = async (query, page = 1)=>{
  const res = await fetch(`${tmdb.baseUrl}/search/movie?api_key=${tmdb.apikey}&query=${encodeURIComponent(query)}&page=${page}`)
  const data = await res.json()
  return data
}