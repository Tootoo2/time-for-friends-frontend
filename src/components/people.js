import React, { Component } from 'react';
import axios from 'axios';

class People extends Component {
	state = {
		people: [],
	};

	componentDidMount() {
		axios.get('http://localhost:3001/api/people').then(response => {
			this.setState({ people: response.data });
		});
  }
  
  test = () => {
    return this.state.people.map(p=><div>{p.name.firstName}</div>)
  }

	render() {
		return (
			<div>
				<p>{this.test()}</p>
			</div>
		);
	}
}

export default People;
