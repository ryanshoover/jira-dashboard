import React, { Component } from 'react';
import Chart from 'chart.js';
import { colors } from '../config';

export default class PieChart extends Component {

	componentDidUpdate() {
		const data = {};

		let key;

		for ( const issue of this.props.issues ) {
			switch ( this.props.field ) {
				case 'assignee':
					key = !! issue[ this.props.field ] ? issue[ this.props.field ].displayName : 'Unassigned';
					break;
				default:
					key = issue[ this.props.field ];
			};

			data[ key ] = data[ key ] || 0;
			data[ key ]++;
		}

		new Chart(
			this.canvas.getContext( '2d' ),
			{
				type: 'pie',
				data: {
					datasets: [
						{
							data: Object.values( data ),
							backgroundColor: colors,
						},
					],
					labels: Object.keys( data ),
				},
			}
		);
	}

	render() {
		return (
			<section className="piechart">
				<h2>{ this.props.title }</h2>
				<canvas ref={ canvas => this.canvas = canvas } />
			</section>
		);
	}
}
