import React, { Component } from 'react';
import PieChart from './piechart';
import { colors } from '../config';

export default class AssigneeChart extends Component {
	processData() {
		// Force data to have these 4 items in order.
		const count = {};

		for ( const issue of this.props.issues ) {
			const name = issue.assignee ? issue.assignee.displayName : 'Unassigned';
			count[ name ] = count[ name ] ? count[ name ] + 1 : 1;
		}

		const data = {
			datasets: [
				{
					data: Object.values( count ),
					backgroundColor: colors,
				},
			],
			labels: Object.keys( count ),
		};

		return data;
	}

	render() {
		const data = this.processData();

		return <PieChart title={ this.props.title } data={ data } chartType="doughnut" />;
	}
}
