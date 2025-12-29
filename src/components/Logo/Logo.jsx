import Image from 'next/image'
import React from 'react'
import assets from '../Assets/assets'

const Logo = () => {
  return (
    <div>
      <Image src={assets.logo} width={130} height={130}  alt='logo'/>
    </div>
  )
}

export default Logo
