import React, { Component } from 'react';

class Clock extends Component {
	state = {
		time: new Date(),
	};

	componentDidMount() {
		setInterval(() => {
			this.tick();
		}, 200);
	}

	tick() {
		this.setState({ time: new Date() });
	}

	render() {
		return (
			<div>
				<h4>{this.state.time.toLocaleTimeString()}</h4>
			</div>
		);
	}
}

export default Clock;
