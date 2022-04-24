import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup, signInWithEmailAndPassword,onAuthStateChanged, signOut} from 'firebase/auth'
import {auth} from '../firebase'

export const authContext = createContext();
//custom hook
export const useAuth = () =>{
  const context = useContext(authContext)
  if(!context) throw new Error('There is no auth provider')
  return context
}


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const signup = (email, password) => createUserWithEmailAndPassword(auth,email,password);
    const login = (email,password) => signInWithEmailAndPassword(auth,email,password);
    const loginWithGoogle = () =>{
      const googleProvider = new GoogleAuthProvider()
      return signInWithPopup(auth, googleProvider)
    }
    const logout = () => signOut(auth);
    useEffect(() =>{
      const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        setLoading(false)
      })
      return() => unsubscribe();
    },[])
  
  return <authContext.Provider value={{ signup,login,user, logout,loading, loginWithGoogle }}>{children}</authContext.Provider>;
}