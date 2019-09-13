import React, { Component } from 'react';
import moment from 'moment-timezone';

class Clock extends Component {
	state = {
		time: moment().format('HH:mm:ss'),
	};

	componentDidMount() {
		setInterval(() => {
			this.tick();
		}, 200);
	}

	tick() {
		let timeStamp = Date.now();
    let timeZone = this.props.timeZone;
    if(this.props.timeZone===undefined){
      timeZone=moment.tz.guess();
    }
		this.setState({
			time: moment.tz(timeStamp, timeZone).format('HH:mm:ss'),
		});
	}

	render() {
		return (
			<div>
				<h4>{this.state.time}</h4>
			</div>
		);
	}
}

export default Clock;
