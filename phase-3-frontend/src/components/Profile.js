import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MenuCard from "./MenuCard";
import "./Profile.css"


function Profile ({ activeUser }) {
	const [profile, setProfile] = useState({})
	const [menus, setMenus] = useState([])
	const [isActiveUser, setIsActiveUser] = useState(false)
	const [likes, setlikes] = useState([])
	
	const params = useParams();

	useEffect(() => {
		fetch(`http://localhost:9292/find_by_username/${params.username}`)
			.then(res => res.json())
			.then(user => {
				setProfile(user);
				setMenus(user.menus);
				setlikes(user.liked_menus);
				if (activeUser) {
					if (user.id === activeUser.id) {
						setIsActiveUser(true)
					}
				}
			})
	},[activeUser, params])

	return ( 
    <div className="profile-container">
			{profile ? (

				<>
					<h1 className="profile-heading">{isActiveUser ? "Your Profile |" : null } {`${profile.first_name} ${profile.last_name}`}</h1>

					<div className="profile-pic-div">
						<img className="user-picture-in-profile"
						src={profile.image_url}
						alt="profile"
						/>

						{isActiveUser ? (
							<Link className="link-to-edit" to={`/edit-user/${profile.username}`}><button className="edit-button">Edit Profile</button></Link>
						) : null}
					</div>

					<h2 className="headings-for-profile-images">{isActiveUser ? "Your Menus" : `${profile.first_name}'s Menus`}</h2>

					<div>
						{menus.map(menu => (
							<div key={menu.id} className="your-menus">
							<MenuCard className="your-menu-images" menu={menu} tag={"menu"}/>
							</div>
						))}
					</div>

					<h2 className="headings-for-profile-images"> Liked Menus </h2>


					<div>
						 {likes.map(like => (
						<div key={like.id} className="liked-menus">
							<MenuCard className="liked-menu-images" menu={like} tag={"like"}/>
						</div>
					))}
						
					</div>


				</>

				




			) : null}

				

    </div>    
  )
}

export default Profile;