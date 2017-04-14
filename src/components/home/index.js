import { h, Component } from 'preact';
import style from './style';
import { Card } from 'preact-mdl';
import './styles.css';

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<h1>Home</h1>
				<Card style={{
					boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)'
				}}></Card>
			</div>
		);
	}
}
