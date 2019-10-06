import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/actions';

import styles from './login.module.css';
import Modal from '../../components/UI/Modal/Modal';

class Login extends Component {
	state = {
		email: '',
		password: '',
		errors: {},
		showModal: false,
	};
	timeout;

	componentWillUnmount() {
		clearTimeout(this.timeout);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.auth) {
			nextProps.history.push('/');
		}
		if (nextProps.errors) {
			return {
				errors: nextProps.errors,
			};
		}
	}

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();

		const userData = {
			email: this.state.email,
			password: this.state.password,
		};

		this.props.loginUser(userData);
		this.timeout = setTimeout(() => {
			if (!this.props.auth) {
				this.changeModalState();
			}
		}, 1000);
	};

	changeModalState = () => {
		this.setState({ showModal: !this.state.showModal });
	};

	render() {
		const { errors } = this.state;
		let modalInfo =
			errors.email || errors.password ? (
				<>
					{errors.email} <br /> {errors.password}
				</>
			) : (
				<h4>Username and password do not match</h4>
			);
		return (
			<>
				<Modal show={this.state.showModal} modalClosed={this.changeModalState}>
					{modalInfo}
				</Modal>
				<div className={styles.LoginContainer}>
					<h3>Login to meet your friends</h3>
					<form className={styles.LoginForm} onSubmit={this.onSubmit}>
						<input
							className={styles.InputFields}
							type='text'
							onChange={this.onChange}
							value={this.state.email}
							id='email'
							placeholder='Email'
						></input>
						<input
							className={styles.InputFields}
							type='password'
							onChange={this.onChange}
							value={this.state.password}
							id='password'
							placeholder='Password'
						></input>
						<button type='submit'>Log in</button>
					</form>
				</div>
			</>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.isAuthenticated,
	errors: state.errors,
});

export default connect(
	mapStateToProps,
	{ loginUser },
)(Login);
