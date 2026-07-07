import React from 'react'

function Footer() {

    const date = new Date().getFullYear()

  return (
    <div className='padding text-center text-gray-400 text-sm py-4 border-t border-[#8a5cf680] bg-[#8a5cf617]'>
        Copyright © {date}. All Rights Reserved
    </div>
  )
}

export default Footer