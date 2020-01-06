import React, { Component } from 'react';
import _ from 'lodash';
import Chart from './chart';
import { colors as coreColors } from '../config';

export default class ComparisonChart extends Component {
	processData() {
		// Get array of all users
		const users = _.chain( this.props.issues ).map( issue => issue.assignee ? issue.assignee.displayName : 'Unassigned' ).uniq().value();

		// Make sure Unassigned is last in the list.
		const unassIdx = users.findIndex( ( user ) => 'Unassigned' === user );
		users.push( users.splice( unassIdx, 1 )[0] );


		let status = [
			'Open',
			'In Progress',
			'In Review',
			'Closed',
			..._.map( issue => issue.status )
		];

		status = _.uniq( status );

		const colors = [
			'#BDD0E0',
			'#007EEA',
			'#FFCB52',
			'#43AB3C',
			...coreColors,
		];

		const datasets = [];

		for ( const idx in status ) {
			datasets.push( {
				label: status[ idx ],
				data: Array.from( users, user => 0 ),
				backgroundColor: colors[ idx ],
			} );
		}

		for (const issue of this.props.issues) {
			// Figure out name to show.
			const name = issue.assignee ? issue.assignee.displayName : 'Unassigned';

			const setIdx = datasets.findIndex( ( set ) => issue.status === set.label );
			const userIdx = users.findIndex( ( user ) => user === name  );

			datasets[ setIdx ].data[ userIdx ]++;
		}

		const data = {
			datasets,
			labels: users,
		};

		return data;
	}

	render() {
		const data = this.processData();

		const options = {
			scales: {
				xAxes: [
					{
						stacked: true,
						gridLines: {
							display: false,
						},
						ticks: {
							fontSize: 24,
							beginAtZero: true,
							stepSize: 1,
						},
					}
				],
				yAxes: [
					{
						stacked: true,
						gridLines: {
							display: false,
						},
						ticks: {
							fontSize: 36,
							beginAtZero: true,
							stepSize: 1,
						},
					}
				]
			}
		};

		return <Chart title={ this.props.title } data={ data } options={ options } type="horizontalBar" />;
	}
}
