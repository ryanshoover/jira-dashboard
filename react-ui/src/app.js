import React, { Component } from 'react';
import { Issue, PieChart } from './components';
import './app.css';

class App extends Component {
	constructor( props ) {
		super( props );

		this.props = props;

		this.state = {
			epic: {
				summary: '',
			},
			issues: [],
		};

		this.INTERVAL = 60000 * 5; // 5 minutes

		this.updateData = this.updateData.bind( this );
		this.setState.bind( this );
	}

	componentDidMount() {
		this.updateData();

		this.intervalID = setInterval( () => this.updateData(), this.INTERVAL );
	}

	updateData() {
		fetch( `/api` )
			.then( res => {
				if ( 200 !== res.status ) {
					throw new Error( res.statusText );
				}

				return res.json();
			} )
			.then( data => {
				this.setState( data );
			} )
			.catch( err => console.error( err ) );
	}

	render() {
		return (
			<div className="app">
				<header className="app-header">
					<h1>{ this.props.title }</h1>
				</header>
				<main className="epic">
					<Issue issue={ this.state.epic } />
					<PieChart title="Status" field="status" issues={ this.state.issues } epic={ this.state.epic } />
					<PieChart title="Team" field="assignee" issues={ this.state.issues } epic={ this.state.epic } />
				</main>
			</div>
		);
	}
}

export default App;
