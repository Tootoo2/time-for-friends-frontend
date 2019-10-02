import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../store/actions/actions';

import styles from './Header.module.css';

class Header extends Component {

	render() {
		return (
			<header className={styles.Header}>
				<nav>
					<ul>
						<li>
							<NavLink
								to='/'
								exact
								style={{
									textDecoration: 'none',
									color: 'black',
									fontSize: '1.2em',
								}}
								activeStyle={{
									textDecoration: 'underline black',
								}}
							>
								Contacts
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/newcontact'
								style={{
									textDecoration: 'none',
									color: 'black',
									fontSize: '1.2em',
								}}
							>
								New Contact
							</NavLink>
						</li>
						<li>
							{this.props.auth ? (
								<p onClick={this.props.logoutUser}>{this.props.user.name}</p>
							) : (
								<NavLink
									to='/login'
									style={{
										textDecoration: 'none',
										color: 'black',
										fontSize: '1.2em',
									}}
									activeStyle={{
										textDecoration: 'underline black',
									}}
								>
									<i className='fas fa-user'></i>
								</NavLink>
							)}
						</li>
					</ul>
				</nav>
			</header>
		);
	}
}

const mapStateToProps = state => {
	return {
		auth: state.isAuthenticated,
		user: state.user,
	};
};

export default connect(
	mapStateToProps,
	{ logoutUser },
)(Header);
