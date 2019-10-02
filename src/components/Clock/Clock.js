import React, { Component } from 'react';
import moment from 'moment-timezone';

class Clock extends Component {
	state = {
		time: moment.tz(moment(), this.props.timeZone).format('HH:mm:ss'),
	};

	componentDidMount() {
		this.interval = setInterval(() => {
			this.tick();
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	tick() {
		let timeStamp = moment();
		let timeZone = this.props.timeZone;
		if (this.props.timeZone === undefined) {
			timeZone = moment.tz.guess();
		}
		let newTime = moment.tz(timeStamp, timeZone).format('HH:mm:ss');
		this.setState({
			time: newTime,
		});
	}

	render() {
		return (
			<>
				<h4>{this.state.time}</h4>
			</>
		);
	}
}

export default Clock;
