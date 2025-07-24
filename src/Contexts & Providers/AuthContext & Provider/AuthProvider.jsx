import React, {  useEffect, useState } from 'react';
// import { useLocation } from 'react-router';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase.config';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const provider = new GoogleAuthProvider;
    const updateUser = (updatedUser) =>{
        return updateProfile(auth.currentUser,updatedUser);
    }

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    
    const logOut = () =>{
        return signOut(auth)
    }
    const signIn = (email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }
    const signInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth,provider)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false);
        })
        return () =>{
            unsubscribe();
        }
    }, []);
    
    const authData = {
        user,
        setUser,
        createUser,
        logOut,
        signIn,
        loading,
        setLoading,
        updateUser,
        signInWithGoogle
    }
    // console.log(user);
    return <AuthContext value={authData}>{children}</AuthContext>
};

export default AuthProvider;