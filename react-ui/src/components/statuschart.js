import React, { Component } from 'react';
import PieChart from './piechart';
import { colors as coreColors } from '../config';

export default class StatusChart extends Component {
	processData() {
		// Force data to have these 4 items in order.
		const count = {
			Open: 0,
			'In Progress': 0,
			'In Review': 0,
			Closed: 0,
		};

		for ( const issue of this.props.issues ) {
			count[ issue.status ] = count[ issue.status ] ? count[ issue.status ] + 1 : 1;
		}

		const data = {
			datasets: [
				{
					data: Object.values( count ),
					backgroundColor: [
						'#BDD0E0',
						'#007EEA',
						'#FFCB52',
						'#43AB3C',
						...coreColors,
					],
				},
			],
			labels: Object.keys( count ),
		};

		return data;
	}

	render() {
		const data = this.processData();

		return <PieChart title={ this.props.title } data={ data } />;
	}
}
