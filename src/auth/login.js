import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../store/actions/actions';

class Login extends Component {
	state = {
		email: '',
		password: '',
		errors: {},
	};

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onSubmit = e => {
    e.preventDefault();
    
    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(userData)

	};

	render() {
		return (
			<>
				<form onSubmit={this.onSubmit}>
					<input
						onChange={this.onChange}
						value={this.state.email}
						id='email'
						placeholder='Enter Your Email'
					></input>
					<input
						onChange={this.onChange}
						value={this.state.password}
						id='password'
						placeholder='Password'
					></input>
					<button type='submit'>Log in</button>
				</form>
			</>
		);
	}
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
	mapStateToProps,
	{ loginUser },
)(Login);
