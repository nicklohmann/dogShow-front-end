// npm modules 
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Dogs from './pages/Dogs/Dogs'
import ChangePassword from './pages/ChangePassword/ChangePassword'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as dogService from './services/dogService'

// styles
import './App.css'

// types
import { User, Profile } from './types/models'
import { Dog } from './types/models'

function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(authService.getUser())
  const [dogs, setDogs] = useState<Dog[]>([])
  const navigate = useNavigate()
  
    useEffect((): void => {
    const fetchDogs = async (): Promise<void> => {
      try {
        const profileData: Dog[] = await dogService.getAllDogs()
        setDogs(profileData)
      } catch (error) {
        console.log(error)
      }
    }
    user ? fetchDogs() : setDogs([])
  }, [user])
  const handleLogout = (): void => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = (): void => {
    setUser(authService.getUser())
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/Dogs"
          element={
            <ProtectedRoute user={user}>
              <Dogs 
                user={user}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
