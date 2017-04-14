import { h, Component } from 'preact';
import style from './style';
import { Card, TextField, Button } from 'preact-mdl';
import './styles.css';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
	}
	onInputChange = event => {
		this.setState({ [event.target.name]: event.target.value});
	}

	onSubmit = () => {
		const { username, password } = this.state;
		if (!username) {
			console.log('no username')
		}
		if (!password) {
			console.log('no password')
		}

		// send to db
	}
	
	render() {
		const { username, password } = this.state;
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
						style={{width: '50%'}}
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
