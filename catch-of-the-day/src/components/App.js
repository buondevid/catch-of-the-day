import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import exampleFishes from '../sample-fishes.js';
import Fish from './Fish';
import base from '../base';
import PropTypes from 'prop-types';

class App extends React.Component {
	state = {
		fishes: {},
		order: {},
	};

	static propTypes = {
		match: PropTypes.object
	}

	componentDidMount() {
		const localStorageRef = localStorage.getItem(this.props.match.params.storeId);
		if (localStorageRef) {
			this.setState({ order: JSON.parse(localStorageRef) });
		}
		this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
			context: this,
			state: 'fishes',
		});
	}

	componentDidUpdate() {
		localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
		console.log('unmounting');
	}

	addFish = (fish) => {
		// 1. Take a copy of existing state
		const fishes = { ...this.state.fishes };
		// 2. Add new fish to new fishes var
		fishes[`fish${Date.now()}`] = fish;
		// 3. State the new fishes obj to state
		this.setState({
			fishes: fishes,
		});
	};

	updateFish = (key, updatedFish) => {
		//1. take a copy of current State
		const fishes = { ...this.state.fishes };
		//2. update that state
		fishes[key] = updatedFish;
		//3. Set that to state
		this.setState({ fishes });
	};

	deleteFish = (key) => {
		//1. take a copy of State
		const fishes = { ...this.state.fishes };
		//2. update the state
		fishes[key] = null;
		//3. update state
		this.setState({ fishes });
	};

	loadSampleFishes = () => {
		this.setState({
			fishes: exampleFishes,
		});
	};

	addToOrder = (key) => {
		// 1. take a copy of state
		const order = { ...this.state.order };
		// 2. add to the order OR update the number of order
		order[key] = order[key] + 1 || 1;
		// 3. call setState to update state obj
		this.setState({ order });
	};

	deleteFishOrder = (key) => {
		const order = { ...this.state.order };
		delete order[key];
		this.setState({ order });
	};

	render() {
		return (
			<div className='catch-of-the-day'>
				<div className='menu'>
					<Header tagline='Fresh Seafood Market' />
					<ul>
						{Object.keys(this.state.fishes).map((fish) => (
							<Fish
								addToOrder={this.addToOrder}
								details={this.state.fishes[fish]}
								key={fish}
								index={fish}
							/>
						))}
					</ul>
				</div>
				{/* you can pass the whole State with {...this.state}, but preferred to select singular keys */}
				<Order
					fishes={this.state.fishes}
					order={this.state.order}
					deleteFishOrder={this.deleteFishOrder}
				/>
				<Inventory
					fishes={this.state.fishes}
					loadSampleFishes={this.loadSampleFishes}
					addFish={this.addFish}
					updateFish={this.updateFish}
					deleteFish={this.deleteFish}
					storeId={this.props.match.params.storeId}
				/>
			</div>
		);
	}
}

export default App;
