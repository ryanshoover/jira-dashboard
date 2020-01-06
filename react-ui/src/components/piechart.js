import React, { Component } from 'react';
import Chart from 'chart.js';

export default class PieChart extends Component {
	renderChart() {
		new Chart(
			this.canvas.getContext( '2d' ),
			{
				type: this.props.chartType || 'pie',
				data: this.props.data,
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
			<section className="piechart">
				<h2>{ this.props.title }</h2>
				<canvas ref={ canvas => this.canvas = canvas } />
			</section>
		);
	}
}
