import React, { Component } from 'react';

export default class Issue extends Component {
	render() {
		return (
			<section className="issue">
				<h1>{ this.props.issue.summary }</h1>
			</section>
		);
	}
}
