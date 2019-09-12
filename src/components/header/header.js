import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './header.module.css';

const header = props => (
	<header className={styles.Header}>
		<nav>
			<ul>
				<li>
					<NavLink to="/" exact>Contacts</NavLink>
          <NavLink to="/newcontact" >New Contact</NavLink>
				</li>
			</ul>
		</nav>
	</header>
);

export default header;
