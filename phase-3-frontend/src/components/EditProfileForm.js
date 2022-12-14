import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./EditProfileForm.css"


function EditProfileForm ({ activeUser, setActiveUser }) {
	const initialValues = {
		first_name: "",
		last_name: "",
		image_url: "",
	};

	const [formData, setFormData] = useState(initialValues);

	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`http://localhost:9292/find_by_username/${params.username}`)
		.then(res => res.json())
		.then(user => {
			if (activeUser) {
				if (user.id !== activeUser.id) {
					navigate(`/user/${activeUser.username}`);
				}
			}
			setFormData(user);
		})
	},[params])

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData(formData => ({...formData, [name]: value}))
	}

	function handleSubmit(event) {
		event.preventDefault();
		fetch(`http://localhost:9292/users/${activeUser.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then(res => res.json())
			.then(user => {
				setActiveUser(user);
				setFormData(initialValues);
				navigate(`/user/${user.username}`);
			})
			.catch(e => console.error(e));
	}

	return ( 
    <div className="edit-container">
        <h1>Edit Profile</h1>

				<form onSubmit={handleSubmit}>

				<div className="label">first name:</div>
				<input
					required
					className="field"
					id="edit-firstname"
					type="text"
					name="first_name"
					value={formData.first_name}
					onChange={handleChange}
				/>

				<br />

				<div className="label">last name:</div>
				<input
					required
					className="field"
					id="edit-lastname"
					type="text"
					name="last_name"
					value={formData.last_name}
					onChange={handleChange}
				/>

				<br />

				<div className="label">profile image:</div>
				<input
					required
					className="field"
					id="edit-image-url"
					type="image-url"
					name="image_url"
					value={formData.image_url}
					onChange={handleChange}
				/>

				<br/>
	
				<input className="submit-button" type="submit" value="submit" />
				<br/>
				{activeUser ? <Link to={`/user/${activeUser.username}`}>Back to Profile</Link> : null}
			</form>

    </div>    
  )
}

export default EditProfileForm; 