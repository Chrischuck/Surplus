import { h, Component } from 'preact';
import { Card, TextField, Button, Dialog } from 'preact-mdl';
import burger from '../assets/classic-burger.png';


export default class Restaurant extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false,
			newItem: '',
			newPrice: '',
			newInitialQuantity: '',
			menu: {
				burger: {
					name: 'burger',
					price: 3,
					quantity: 4
				}
			}
		};
	}
	toggleModal = () => {
		if (this.state.isModalOpen === true) {
			this.setState({
				newItem: '',
				newPrice: '',
				newInitialQuantity: ''
			});
		}
		this.setState({ isModalOpen: !this.state.isModalOpen});
	}

	setNewItem = () => {
		const { newItem, newPrice, newInitialQuantity } = this.state;
		if (!newItem) {
			return;
		}
		if (!newPrice) {
			return;
		}
		if (!newInitialQuantity) {
			return;
		}
		this.setState({
			menu: {
				[newItem]: {
					name: newItem,
					price: newPrice,
					quantity: newInitialQuantity
				},
				...this.state.menu
			},
			newItem: '',
			newPrice: '',
			newInitialQuantity: '',
			isModalOpen: false
		});
	}
	onInputChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	}

	addItem = name => {
		let newMenu = this.state.menu;
		newMenu[name].quantity = parseInt(newMenu[name].quantity, 10);
		newMenu[name].quantity += 1;
		this.setState({ menu: newMenu });
	}

	subtractItem = name => {
		let quantity = this.state.menu[name].quantity;
		if (quantity === 0)
			return;
		let newMenu = this.state.menu;
		newMenu[name].quantity -= 1;
		if (newMenu[name].quantity === 0)
			delete newMenu[name];
		this.setState({ menu: newMenu });
	}
	renderItems = () => {
		const { menu } = this.state;
		const keys = Object.keys(menu);

		return keys.map(i => {
			if (menu[i].quantity === 0)
				return null;
			return (
				<Card
				style={{
					boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
					margin: 10,
					position: 'relative',
					width: '100%',
					height: 100,
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
					padding:'13px',
					borderRadius: '50%',
					boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
					margin: 4,
					marginLeft: 'auto'
				}}
				>
				{ menu[i].quantity }
				</div>

				<div
				style={{
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: 'center'
				}}>
					<h1 style={{margin:0}}>
						{i}
					</h1>
				</div>

				<div
					style={{bottom: '2px'}}
				>
					<Button
					style={{boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)'}}
					name={i}
					onClick={() => this.addItem(i)}
					>+</Button>
					<Button
					style={{boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)'}}
					onClick={() => this.subtractItem(i)}
					>-</Button>
				</div>
				</Card>
			);
		});
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
						textAlign: 'center',
						width: 400,
						float: 'left'
					}}
					>
						<TextField
						onChange={this.onInputChange}
						name='newItem'
						value={this.state.newItem}
						>Item</TextField>
						<TextField
						onChange={this.onInputChange}
						name='newPrice'
						value={this.state.newPrice}
						>Price</TextField>
						<TextField
						onChange={this.onInputChange}
						name='newInitialQuantity'
						value={this.state.newInitialQuantity}
						>Initial Quantity</TextField>
					</div>

					<Button
					style={{boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)', margin: 5}}
					onClick={this.toggleModal}
					>Cancel</Button>
					<Button
					style={{boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)', margin: 5}}
					onClick={this.setNewItem}
					>Add Item</Button>
					</Dialog>
				}
				<div
					style={{
						display:'flex'
					}}
				>
					<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						flexDirection: 'column',
						width: 400,
						marginRight: 15
					}}>
					<Button
					disabled={this.state.isModalOpen}
					style={{boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)'}}
					onClick={this.toggleModal}
					>Add Item</Button>
					{this.renderItems()}
					</div>


					<Card style={{
						float:'right',
						boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
						width: '100%',
						height: '100%'
						}}>
						Analytics
					</Card>

				</div>
			</div>
		);
	}
}
