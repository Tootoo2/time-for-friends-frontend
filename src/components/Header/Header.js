import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../store/actions/actions';

import styles from './Header.module.css';

class Header extends Component {
	render() {
		return (
			<header className={styles.Header}>
				<div>
					<NavLink
						to='/'
						exact
						style={{
							textDecoration: 'none',
							color: 'black',
              fontSize: '1.2em',
              margin: '8px'
						}}
						activeStyle={{
							textDecoration: 'underline black',
						}}
					>
						Contacts
					</NavLink>

					<NavLink
						to='/newcontact'
						style={{
							textDecoration: 'none',
							color: 'black',
              fontSize: '1.2em',
              margin: '8px'
						}}
						activeStyle={{
							textDecoration: 'underline black',
						}}
					>
						New Contact
					</NavLink>
				</div>
        <div className={styles.LoggedStatus}>
				{this.props.auth ? (
					<p style={{fontSize: '1.2em'}} onClick={this.props.logoutUser}>Logout</p>
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
						Login
					</NavLink>
        )}
        </div>
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
