import React from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import PropTypes from 'prop-types';
import Login from './Login';
import firebase from 'firebase';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
	static propTypes = {
		updateFish: PropTypes.func,
		deleteFish: PropTypes.func,
		addFish: PropTypes.func,
		loadSampleFishes: PropTypes.func,
		fishes: PropTypes.object,
	};

	state = {
		uid: null,
		owner: null,
	};

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.authHandler({ user });
			}
		});
	}

	authHandler = async (authData) => {
		//1. Look up the current store in firebase database
		const store = await base.fetch(this.props.storeId, { context: this });
		console.log(store);
		//2. claim if there is no owner
		if (!store.owner) {
			await base.post(`${this.props.storeId}/owner`, {
				data: authData.user.uid,
			});
		}
		//3. set state inventory component to reflect current user
		this.setState({
			uid: authData.user.uid,
			owner: store.owner || authData.user.id,
		});
		console.log(authData);
	};

	authenticate = (provider) => {
		const authProvider = new firebase.auth[`${provider}AuthProvider`]();
		firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
	};

	logout = async () => {
		console.log('logout');
		await firebase.auth().signOut();
		this.setState({ uid: null });
	};

	render() {
		const logout = <button onClick={this.logout}>Log out</button>;
		//1. check if they are logged in: if they are not, show auths
		if (!this.state.uid) {
			return <Login authenticate={this.authenticate} />;
		}
		//2. check if the user is the owner of the store
		if (this.state.uid !== this.state.owner) {
			return (
				<div>
					<p>Sorry you're not the owner!</p>
					{logout}
				</div>
			);
		}

		return (
			<div className='inventory'>
				<h2>Inventory!!</h2>
				{logout}
				{Object.keys(this.props.fishes).map((key) => (
					<EditFishForm
						key={key}
						index={key}
						fish={this.props.fishes[key]}
						updateFish={this.props.updateFish}
						deleteFish={this.props.deleteFish}
					/>
				))}
				<AddFishForm addFish={this.props.addFish} />
				<button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
			</div>
		);
	}
}

export default Inventory;
