import React, { Component } from 'react';
import ChartJS from 'chart.js';

export default class Chart extends Component {
	renderChart() {
		new ChartJS(
			this.canvas.getContext( '2d' ),
			{
				type: this.props.type || 'pie',
				data: this.props.data,
				options: this.props.options,
			}
		);
	}

	componentDidMount() {
		this.renderChart();
	}

	componentDidUpdate() {
		this.renderChart();
	}

	render() {
		return (
			<section className="chart">
				<h2>{ this.props.title }</h2>
				<canvas ref={ canvas => this.canvas = canvas } />
			</section>
		);
	}
}
