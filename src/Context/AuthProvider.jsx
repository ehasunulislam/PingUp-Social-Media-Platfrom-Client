"use client"
import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '@/firebase/firebase.config';

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  /* register functionality start */
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }
  /* register functionality end */


  /* google popup functionality start */
  const googleProvider = new GoogleAuthProvider();

  const signInWithGooglePopUpFunction = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }
  /* google popup functionality end */

  
  /* loagin User functionality start */
  const loginUserFunctionality = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }
  /* loagin User functionality end */

  /* forgot password functionality start */
  const forgetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  }
  /* forgot password functionality end */


  /* signOut functionality start */
  const logOutFunctionality = () => {
    setLoading(true);
    return signOut(auth)
  }
  /* signOut functionality end */


  /* update user functionality start */
  const updateUserProfileFunction = (name, photoURL) => {
    if(!auth.currentUser) {
        return;
    }

    return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL
    })
  }
  /* update user functionality end */

  /* subscribe functonality start */
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
    })

    return() => {
        unsubcribe();
    }
  }, [])
  /* subscribe functonality end */
  

  const authInfo = {
    user, loading,
    createUser,
    updateUserProfileFunction,
    signInWithGooglePopUpFunction,
    loginUserFunctionality,
    forgetPassword,
    logOutFunctionality,
  }

  return(
    <AuthContext value={authInfo}>
        {children}
    </AuthContext>
  )
}

export default AuthProvider
