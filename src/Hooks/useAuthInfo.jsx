'use client'
import { AuthContext } from '@/Context/AuthContext'
import React, { use } from 'react'

const useAuthInfo = () => {
  const authInfo = use(AuthContext)
  return authInfo;
}

export default useAuthInfo

// get all element all of hegher of in   1 *6