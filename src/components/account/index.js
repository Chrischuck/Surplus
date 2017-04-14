import { h, Component } from 'preact';
import style from './style';
import { Card, TextField, Button } from 'preact-mdl';
import { Restaurant, Shelter } from './components';

export default class Account extends Component {
	render() {
		return (
			<div class={style.home}>
                <Restaurant />
			</div>
		);
	}
}
