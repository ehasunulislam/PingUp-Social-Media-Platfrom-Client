import Image from 'next/image'
import React from 'react'
import assets from '../Assets/assets'

const Logo = () => {
  return (
    <div>
      <Image src={assets.logo}  alt='logo'/>
    </div>
  )
}

export default Logo
