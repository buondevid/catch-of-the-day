import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {

	myInput = React.createRef();

	goToStore = (e) => {
		//1. stop form from submitting
		e.preventDefault();
		//2. get text from that input
		const storeName = this.myInput.current.value;
		//3. change page to /store/whatever-they-entered
		this.props.history.push(`/store/${storeName}`);
	}

	render() {
		return (
			<form onSubmit={this.goToStore} className='store-selector'>
				<h2>Please Enter a Store</h2>
				<input ref={this.myInput} type='text' required placeholder='Store Name' defaultValue={getFunName()} />
				<button type='submit'>Visit Store</button>
			</form>
		);
	}
}

export default StorePicker;
