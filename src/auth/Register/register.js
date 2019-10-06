import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../store/actions/actions';
import { withRouter } from 'react-router-dom';

import styles from './register.module.css';
import Modal from '../../components/UI/Modal/Modal';

class Register extends Component {
	state = {
		name: '',
		email: '',
		password: '',
		password2: '',
		errors: {},
		showModal: false,
	};
	timeout;

	componentDidMount() {
		if (this.props.auth) {
			this.props.history.push('/');
		}
	}
	componentWillUnmount() {
		clearTimeout(this.timeout);
	}

	static getDerivedStateFromProps(nextProps, nextState) {
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

		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2,
		};

		this.props.registerUser(newUser, this.props.history);
		this.timeout = setTimeout(() => {
			if (this.props.errors) {
				this.changeModalState();
			}
		}, 1000);
	};

	changeModalState = () => {
		this.setState({ showModal: !this.state.showModal });
	};

	render() {
		const { name, email, password, password2, errors } = this.state;

		return (
			<>
				<Modal show={this.state.showModal} modalClosed={this.changeModalState}>
					{Object.values(errors).map((err, i) => (
						<p key={i}>{err}</p>
					))}
				</Modal>
				<div className={styles.RegisterContainer}>
					<form className={styles.RegisterForm} onSubmit={this.onSubmit}>
						<input
							className={styles.InputFields}
							type='text'
							onChange={this.onChange}
							value={name}
							id='name'
							placeholder='Name'
						/>
						<input
							className={styles.InputFields}
							type='text'
							onChange={this.onChange}
							value={email}
							id='email'
							placeholder='Email'
						/>
						<input
							className={styles.InputFields}
							type='password'
							onChange={this.onChange}
							value={password}
							id='password'
							placeholder='Password'
						/>
						<input
							className={styles.InputFields}
							type='password'
							onChange={this.onChange}
							value={password2}
							id='password2'
							placeholder='Enter Password Again'
						/>
						<button type='submit'>Submit</button>
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
	{ registerUser },
)(withRouter(Register));
