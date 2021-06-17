import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {

	render() {
		const { image, name, desc, price, status } = this.props.details;
		const isAvailable = status === 'available';


		return (
			<li className='menu-fish'>
				<img src={image} alt={name}/>
				<h3 className='fish-name'>{name}
					<span className='price'>{formatPrice(price)}</span>
				</h3>
				<p>{desc}</p>
				{/* also, when passing parameters into event functions, you can use an arrow function or method "handleClick" () => this.props.addToOrder(this.props.index) */}
				<button onClick={this.props.addToOrder.bind(null, this.props.index)} disabled={!isAvailable}>{isAvailable ? 'Add to order' : 'Sold out'}</button>
			</li>
		)
	}
}

export default Fish;