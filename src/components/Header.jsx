import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react';

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
            <Link to={'/'} className='logo text-xl lg:text-2xl'>FLIX</Link>
            <form className='searchBar' onSubmit={handleSubmit}>
              <input id='searchBar' onChange={(e)=>setInput(e.target.value)} value={input} type="search" placeholder='Search a movie' />
              <button className='flex justify-center items-center hover:text-[#8b5cf680] transition duration-300'><Search/></button>
            </form>
      </div>
    </>
  )
}

export default Header

