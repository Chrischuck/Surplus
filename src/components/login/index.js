import { h, Component } from 'preact';
import style from './style';
import { Card, TextField, Button } from 'preact-mdl';
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
		}
		if (!password) {
			this.setState({ error: 'We need your password!'});
		}
		localStorage.setItem("jwt", "Allowed");
		window.location.href = 'account';
	}
	
	render() {
		const { username, password, error } = this.state;
		console.log(error)
		return (
			<div class={style.home}>
				<div style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
					<Card style={{
						boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
						width:'500px',
						height:'300px',
						marginTop: 200,
						textAlign: 'center'
					}}>
					<h1
					style={{
						fontFamily: 'Snell Roundhand, cursive'
					}}>Leftovers</h1>

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
						errorMessage={error}
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
					<div>
						<Button
						style={{
							width: '50%',
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
