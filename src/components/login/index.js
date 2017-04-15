import { h, Component } from 'preact';
import style from './style';
import { Card, TextField, Button } from 'preact-mdl';
import data from './data/users';
import './styles.css';

export default class Login extends Component {
	constructor(props) {
		super(props);
		const jwt = localStorage.getItem("jwt");
		if (jwt)
			window.location.href = 'account';
		this.state = {
			username: '',
			password: '',
			error: ''
		};
	}
	onInputChange = event => {
		this.setState({ [event.target.name]: event.target.value});
	}

	onSubmit = () => {
		const { username, password } = this.state;
		if (!username) {
			this.setState({ error: 'We need your username!'});
			return;
		}
		if (!password) {
			this.setState({ error: 'We need your password!'});
			return;
		}
		if (!data[username]) {
			this.setState({ error: 'We don\'t seem to have that username'});
			return;
		}
		if (data[username].password !== password) {
			this.setState({ error: 'Username and password do not match'});
			return;
		}

		localStorage.setItem("jwt", data[username].type);
		window.location.href = 'account';
	}
	
	render() {
		const { username, password, error } = this.state;
		return (
			<div class={style.home}>
				<div style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
					<Card style={{
						boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
						width:'550px',
						height:'320px',
						marginTop: 200,
						textAlign: 'center',
						justifyContent: 'center',
						alignItems: 'center'
					}}>
					<h1
					style={{
						fontFamily: 'Snell Roundhand, cursive'
					}}>Surplus</h1>
					{
						error &&
						<div
						style={{
							textAlign: 'center',
							width: '300px',
							background: 'rgb(220, 220, 220)',
							padding:'13px',
							borderRadius: 20,
							boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
							margin: 4,
						}}
						>
						{ error }
						</div>
					}
					<div
					style={{textAlign: 'center'}}
					>
						<TextField
						style={{textAlign: 'center'}}
						floating-label={true}
						placeholder='Username'
						width='100%'
						expandable='true'
						align='middle'
						name='username'
						value={username}
						onChange={this.onInputChange}
						/>
						
						<TextField
						style={{textAlign: 'center'}}
						floating-label={true}
						placeholder='Password'
						type='password'
						width='100%'
						expandable='true'
						align='middle'
						name='password'
						value={password}
						onChange={this.onInputChange}
						/>

					</div>
					<div
					style={{
						display:'flex',
						flexDirection: 'row'

					}}>
						<Button
						style={{
							width: '100%',
							marginRight:2,
							boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
						}}
						>
							Donate
						</Button>
						<Button
						style={{
							width: '100%',
							marginLeft:2,
							boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
						}}
						onClick={this.onSubmit}
						>
							Login
						</Button>
					</div>

				</Card>
				</div>
			</div>
		);
	}
}
