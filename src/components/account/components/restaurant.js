import { h, Component } from 'preact';
import { Card, TextField, Button, Dialog } from 'preact-mdl';
import menu from '../data/menu';
import burger from '../assets/classic-burger.png';


export default class Restaurant extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false,
			newItem: '',
			newPrice: '',
			newInitialQuantity: '',
			menu: []
		};
	}
	toggleModal = () => {
		this.setState({ isModalOpen: !this.state.isModalOpen});
	}

	setNewItem = () => {
		
	}

	addItem = name => {
		if (!this.state[name])
			this.setState({[name]: 1 });
		else
		this.setState({[name]: this.state[name] += 1});
	}

	subtractItem = name => {
		if (!this.state[name])
			return;
		if (this.state[name] === 0)
			return;
		this.setState({[name]: this.state[name] -= 1});
	}
	renderItems = () => {
		return menu.map(i =>
		<Card
		style={{
			boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
			margin: 10,
			position: 'relative',
			width: 400,
			height: 200,
			display: 'flex',
  			justifyContent: 'center',
  			alignItems: 'center',
			marginLeft: 0,
			marginRight: 0
		}}
		>

		<div
		style={{
			background: 'rgb(220, 220, 220)',
			padding:'10px',
			borderRadius: '50%',
			boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
			margin: 4,
			marginLeft: 'auto'
		}}
		>
		{ this.state[i.name] || 0 }
		</div>

		<div
		style={{
			display: 'flex',
			justifyContent: 'flex-start',
			alignItems: 'center'
		}}>
			<h1 style={{margin:0}}>
				{i.name}
			</h1>
		</div>

		<div
			style={{bottom: '2px'}}
		>
			<Button
			style={{boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)'}}
			name={i.name}
			onClick={() => this.addItem(i.name)}
			>+</Button>
			<Button
			style={{boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)'}}
			onClick={() => this.subtractItem(i.name)}
			>-</Button>
		</div>
		</Card>
		);
	}
	
	render() {
		console.log(this.state);
		return (
			<div>
				{
					this.state.isModalOpen &&
					<Dialog
					modal={true}
					open={this.state.isModalOpen}
					style={{
						width: 500,
						height: 300,
						zIndex: 9999,
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'center'
					}}
					>
					<div
					style={{
						textAlign: 'center'
					}}
					>
						<TextField>Item</TextField>
						<TextField>Price</TextField>
						<TextField>Initial Quantity</TextField>
					</div>

					<Button
					style={{boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)', margin: 5}}
					>Add Item</Button>
					<Button
					style={{boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)', margin: 5}}
					onClick={this.toggleModal}
					>Cancel</Button>
					</Dialog>
				}
				<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					flexDirection: 'column',
					width: 400
				}}>
				<Button
				disabled={this.state.isModalOpen}
				style={{boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)'}}
				onClick={this.toggleModal}
				>Add Item</Button>
				{this.renderItems()}
				</div>
			</div>
		);
	}
}
