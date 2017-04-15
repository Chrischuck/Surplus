import { h, Component } from 'preact';
import style from './style';
import { Card, TextField, Button } from 'preact-mdl';
import Restaurant from './components/restaurant';
import Shelter from './components/shelter';

export default class Account extends Component {
	render() {
		return (
			<div class={style.home} style={{ marginTop: '15px'}}>
                <Restaurant />
			</div>
		);
	}
}
