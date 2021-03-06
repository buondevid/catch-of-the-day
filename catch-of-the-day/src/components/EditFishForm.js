import React from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {

	static propTypes = {
		fish: PropTypes.shape({
			image: PropTypes.string,
			name: PropTypes.string,
			price: PropTypes.number,
			description: PropTypes.string,
			status: PropTypes.string,
		}),
		updateFish: PropTypes.func,
		index: PropTypes.string
	}

	handleChange = (e) => {
		console.log(e.target.value);
		//update that fish
		//1. take cipy of current fish
		//1A. use computed property [] to update every key in fish obj, without making 5 different methods
		const updatedFish = {...this.props.fish, [e.target.name]: e.target.value};
		console.log(updatedFish);
		//2. update fish
		this.props.updateFish(this.props.index, updatedFish);
	}

	render() {
		return (
			<div className='fish-edit'>
				<input type='text' name='name' onChange={this.handleChange} value={this.props.fish.name} />
				<input
					type='text'
					name='price'
					onChange={this.handleChange}
					value={this.props.fish.price}
				/>
				<select
					type='text'
					name='status'
					onChange={this.handleChange}
					value={this.props.fish.status}
				>
					<option value='available'>Fresh</option>
					<option value='available'>Sold out!</option>
				</select>
				<textarea
					type='text'
					name='desc'
					onChange={this.handleChange}
					value={this.props.fish.desc}
				/>
				<input
					type='text'
					name='image'
					onChange={this.handleChange}
					value={this.props.fish.image}
				/>
				<button onClick={(e) => this.props.deleteFish(this.props.index)}>Remove Fish</button>
			</div>
		);
	}
}

export default EditFishForm;
