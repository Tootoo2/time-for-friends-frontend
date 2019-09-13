import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.css';

const header = () => (
	<header className={styles.Header}>
		<nav>
			<ul>
				<li>
					<NavLink
						to='/'
						exact
						style={{ textDecoration: 'none', color: 'black',  fontSize: "1.2em" }}
						activeStyle={{
							textDecoration: 'underline black' ,
						}}
					>
						Contacts
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/newcontact'
						style={{ textDecoration: 'none', color: 'black',  fontSize: "1.2em" }}
						activeStyle={{
							textDecoration: 'underline black',
						}}
					>
						New Contact
					</NavLink>
				</li>
			</ul>
		</nav>
	</header>
);

export default header;
