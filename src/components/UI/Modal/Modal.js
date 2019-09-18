import React, { Component } from 'react';

import styles from './Modal.module.css';
import BackDrop from '../BackDrop/BackDrop';

class Modal extends Component {
	render() {
		return (
			<>
				<BackDrop show={this.props.show} clicked={this.props.modalClosed} />
				<div
					className={styles.Modal}
					style={{
						transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: this.props.show ? '1' : '0',
					}}
				>
					{this.props.children}
				</div>
			</>
		);
	}
}

export default Modal;
