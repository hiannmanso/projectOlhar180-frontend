import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthContext from './contexts/AuthContext'
import SignIn  from './pages/SignIn'
import SignUp  from './pages/SignUp'
import Home  from './pages/Home'

export default function App() {
	const [token,setToken]= useState('')
	return (
		<>
    	<BrowserRouter>
		<AuthContext.Provider value={{token,setToken}}>
					<Routes>
						<Route path='/signin' element={<SignIn/>} />
						<Route path='/signup' element={<SignUp/>} />
						<Route path='/' element={<Home/>} />
					</Routes>	

		</AuthContext.Provider>
      
      </BrowserRouter>
		</>
	)
}