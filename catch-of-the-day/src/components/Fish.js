import React from 'react';
import { formatPrice } from '../helpers';
import PropTypes from 'prop-types';

class Fish extends React.Component {
	static propTypes = {
		// PropTypes.shape is to describe exactly which kind of properties the obj passed in should have
		details: PropTypes.shape({
			image: PropTypes.string,
			name: PropTypes.string,
			price: PropTypes.number,
			description: PropTypes.string,
			status: PropTypes.string,
		}),
		addToOrder: PropTypes.func,
	};

	render() {
		const { image, name, desc, price, status } = this.props.details;
		const isAvailable = status === 'available';

		return (
			<li className='menu-fish'>
				<img src={image} alt={name} />
				<h3 className='fish-name'>
					{name}
					<span className='price'>{formatPrice(price)}</span>
				</h3>
				<p>{desc}</p>
				{/* also, when passing parameters into event functions, you can use an arrow function or method "handleClick" () => this.props.addToOrder(this.props.index) */}
				<button
					onClick={this.props.addToOrder.bind(null, this.props.index)}
					disabled={!isAvailable}
				>
					{isAvailable ? 'Add to order' : 'Sold out'}
				</button>
			</li>
		);
	}
}

export default Fish;
