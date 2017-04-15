import { h, Component } from 'preact';
import style from './style';
import { Card, TextField, Button } from 'preact-mdl';
import Restaurant from './components/restaurant';
import Shelter from './components/shelter';

export default class Account extends Component {
	render() {
		const jwt = localStorage.getItem("jwt");
		return (
			<div class={style.home} >
                <div style={{ marginTop: '15px'}}>
                    { 
					jwt === 'r' ?
					<Restaurant /> :
					<Shelter/>
					}
                </div>
			</div>
		);
	}
}
