import React from 'react';
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import exampleFishes from '../sample-fishes.js'
import Fish from './Fish';

class App extends React.Component {

	state = {
		fishes: {},
		order: {}
	}

	addFish = (fish) => {
		// 1. Take a copy of existing state
		const fishes = {...this.state.fishes};
		// 2. Add new fish to new fishes var
		fishes[`fish${Date.now()}`] = fish;
		// 3. State the new fishes obj to state
		this.setState({
			fishes: fishes,
		})
	}

	loadSampleFishes = () => {
		this.setState({
			fishes: exampleFishes,
		});
	}

	addToOrder = (key) => {
		// 1. take a copy of state
		const order = {...this.state.order}
		// 2. add to the order OR update the number of order
		order[key] = order[key] + 1 || 1
		// 3. call setState to update state obj
		this.setState({ order });
	}

	render() {
		return (
			<div className='catch-of-the-day'>
				<div className='menu'>
					<Header tagline='Fresh Seafood Market'/>
					<ul>
						{Object.keys(this.state.fishes).map((fish) => <Fish addToOrder={this.addToOrder} details={this.state.fishes[fish]} key={fish} index={fish}/>)}
					</ul>
				</div>
				{/* you can pass the whole State with {...this.state}, but preferred to select singular keys */}
				<Order fishes={this.state.fishes} order={this.state.order}/>
				<Inventory loadSampleFishes={this.loadSampleFishes} addFish={this.addFish}/>
			</div>
		)
	}
}

export default App;