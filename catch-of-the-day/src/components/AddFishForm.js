import React from 'react';
import PropTypes from 'prop-types';

class AddFishForm extends React.Component {

	static propTypes = {
		addFish: PropTypes.func,
	}

	nameRef = React.createRef();
	priceRef = React.createRef();
	statusRef = React.createRef();
	descRef = React.createRef();
	imageRef = React.createRef();


	createFish = (e) => {
		//1. stop the form from submitting
		e.preventDefault();
		//2. grab ref into object
		const fish = {
			name: this.nameRef.current.value,
			price: parseFloat(this.priceRef.current.value),
			status: this.statusRef.current.value,
			desc: this.descRef.current.value,
			image: this.imageRef.current.value,
		}
		this.props.addFish(fish);
		// 3. Reset the form
		e.target.reset();
	}


	render() {
		return (
			<form className='fish-edit' onSubmit={this.createFish}>
				<input name='name' ref={this.nameRef} type='text' placeholder='Name'/>
				<input name='price' ref={this.priceRef} type='text' placeholder='Price'/>
				<select ref={this.statusRef} name='status'>
					<option value='available'>Fresh</option>
					<option value='available'>Sold out!</option>
				</select>
				<textarea ref={this.descRef} name='desc' type='text' placeholder='Desc'/>
				<input ref={this.imageRef} name='image' type='text' placeholder='Image'/>
				<button>Add Fish</button>
			</form>
		);
	}
}

export default AddFishForm;
