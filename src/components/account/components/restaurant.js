import { h, Component } from 'preact';
import { Card, TextField, Button } from 'preact-mdl';
import menu from '../data/menu';
import burger from '../assets/classic-burger.png';

export default class Restaurant extends Component {
	renderItems = (type) => {
		const items = menu.filter(i => {
			return i.type === type;
		});
		return items.map(i =>
		<Card
		style={{
			boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
			margin: 10,
			position: 'relative',
			width: 400,
			height: 400,
			display: 'flex',
  			justifyContent: 'center', 
  			alignItems: 'center'

		}}
		>
		<div style={{width:300, height:300}}>
			<img src={burger} style={{maxWidth:'100%', maxHeight:'100%'}} />
		</div>
		<div
		style={{
			display: 'flex',
			justifyContent: 'center', 
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
			>+</Button>
			<Button
			style={{boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)'}}
			>-</Button>
		</div>
		</Card>
		);
	}
	
	render() {
		return (
			<div>
				<div
				style={{
					display: 'flex',
					justifyContent: 'center', 
					alignItems: 'center'
				}}>
					<h1>
						appetizer
					</h1>
				</div>
				<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					flexDirection: 'row'
				}}>
				{this.renderItems('appetizer')}
				</div>
				<div
				style={{
					display: 'flex',
					justifyContent: 'center', 
					alignItems: 'center'
				}}>
					<h1>
						entre
					</h1>
				</div>
				<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					flexDirection: 'row'
				}}>
				{this.renderItems('entre')}
				</div>
			</div>
		);
	}
}
