import React, { useState, useEffect } from "react";
import Login from './components/Login';
import Feed from './components/Feed';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import MenuPage from './components/MenuPage';
import MenuForm from './components/MenuForm';
import EditProfileForm from './components/EditProfileForm';
import { Route, Routes, useNavigate } from 'react-router-dom'

function App() {
	const [activeUser, setActiveUser] = useState(null)
	

	const navigate = useNavigate();

	useEffect(() => {
		fetch("http://localhost:9292/find_active_user")
			.then(res => res.json())
			.then(user => {
				if (user) {
					setActiveUser(user)
				}
				else {
					navigate("/login")
				}
			})
			.catch(e => console.error(e))
	},[])

  return (
    <div className="App">
      {activeUser ? <NavBar activeUser={activeUser} setActiveUser={setActiveUser} /> : null}
      <Routes>
        <Route
					path='/login'
					element={<Login setActiveUser={setActiveUser} activeUser={activeUser} />}
				/>
        <Route
					path='/signup'
					element={<SignUp setActiveUser={setActiveUser} activeUser={activeUser} />}
				/>
        <Route
					path='/user/:username'
					element={<Profile activeUser={activeUser} />}
				/>
				<Route
					path='/edit-user/:username'
					element={<EditProfileForm activeUser={activeUser} setActiveUser={setActiveUser} />}
				/>
        <Route
					path='/menu/:menu_id'
					element={<MenuPage activeUser={activeUser} />}
				/>
        <Route
					path='/create-menu'
					element={<MenuForm activeUser={activeUser} setActiveUser={setActiveUser} />}
				/>
        <Route
					path='/'
					element={<Feed activeUser={activeUser}
				/>}
				/>
      </Routes>
    </div>
  )
}

export default App;
