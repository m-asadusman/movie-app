import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {

  const [input, setInput] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(input.trim()){
      navigate(`/search?q=${encodeURIComponent(input.trim())}`)
      setInput('')
    }
  } 

  return (
    <>
      <div className='header'>
            <Link to={'/'} className='logo text-lg lg:text-xl'>MOVIES</Link>
            <form className='searchBar' onSubmit={handleSubmit}>
              <input id='searchBar' onChange={(e)=>setInput(e.target.value)} value={input} type="search" placeholder='Search a movie' />
              <button>🔍</button>
            </form>
      </div>
    </>
  )
}

export default Header

