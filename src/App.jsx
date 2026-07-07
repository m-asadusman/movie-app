import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from './components/NotFound'
import Layout from './components/Layout'
import Home from './components/Home'
import MoviePage from './components/MoviePage'
import SearchResults from './components/SearchResults'

function App() {
  

  return (
    <>
    
    <Routes>
      <Route element={<Layout/>}> 
        <Route path='/' element={<Home/>}/>
        <Route path='/movie/:id' element={<MoviePage/>}/>
        <Route path='/search' element={<SearchResults/>} />
      </Route>
      
      <Route path='*' element={<NotFound/>} />
    </Routes>
      
    </>
  )
}

export default App
