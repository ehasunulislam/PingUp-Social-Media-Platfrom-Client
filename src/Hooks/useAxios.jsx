import axios from 'axios'
import React from 'react'

const axiosSecure = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
})

const useAxios = () => {
  return axiosSecure
}

export default useAxios
