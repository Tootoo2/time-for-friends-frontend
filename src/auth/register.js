import React, { Component } from 'react';
import axios from 'axios'

class Register extends Component {
	state = {
		name: '',
		email: '',
		password: '',
		password2: '',
	};

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();

		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2,
		};

    axios
		.post('http://localhost:3001/api/users/register', newUser)
		.then(res => console.log(res.data));	};

	render() {
		const { name, email, password, password2 } = this.state;

		return (
			<form onSubmit={this.onSubmit}>
				<input
					type='text'
					onChange={this.onChange}
					value={name}
					id='name'
					placeholder='Name'
				/>
				<input
					type='text'
					onChange={this.onChange}
					value={email}
					id='email'
					placeholder='Email'
				/>
				<input
					type='text'
					onChange={this.onChange}
					value={password}
					id='password'
					placeholder='Password'
				/>
				<input
					type='text'
					onChange={this.onChange}
					value={password2}
					id='password2'
					placeholder='Enter Password Again'
				/>
				<button type='submit'>Submit</button>
			</form>
		);
	}
}


export default Register
