"use client"
import useAuthInfo from '@/Hooks/useAuthInfo'
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const PrivateRoutes = ({children}) => {
  const {user, loading} = useAuthInfo();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if(!loading && !user) {
        router.replace(`/login`)
    }
  }, [loading, pathName, router, user]);

  if(loading || !user) {
    return(
        <div className='flex justify-center items-center'>
            <span className="loading loading-ring loading-xl"></span>
        </div>
    )
  }


  return children
}

export default PrivateRoutes
