import { h, Component } from 'preact';
import { Link } from 'preact-router';
import { Dialog } from 'preact-mdl';
import logo from '../../assets/icons/logo192.png';
import style from './style';

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false
		};
	}

	componentDidMount () {
		document.getElementById('body').addEventListener('click', this.closeModal);
  	}

	componentWillUnmount () {
		document.getElementById('body').removeEventListener('click', this.closeModal);
	}

	toggleModal = event => {
		event.stopPropagation();
		this.setState({ isModalOpen: !this.state.isModalOpen });
	}

	closeModal = () => {
		this.setState({ isModalOpen: false });
	}

	logout = () => {
		localStorage.removeItem("jwt");
		window.location.href = 'login';
	}

	render() {
		return (
			<header class={style.header}>
				<h1>Surplus</h1>
				<nav>
					<div
					style={{
						height: '50px',
						width: '50px',
						verticalAlign: 'center',
						marginTop: 2
					}}
					onClick={this.toggleModal}
					>
						<img style={{
							backgroundColor: 'white',
							maxHeight: '100%',
							maxWidth:'100%',
							borderRadius: '50%',
							boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)'
							}}src={logo} />
					</div>
					{
						this.state.isModalOpen &&
						<Dialog open={true}
						style={{
							marginRight: 0,
							padding: 7,
							width: '150px',
							textAlign: 'center',
							cursor: 'pointer'
						}}
						onClick={this.logout}
						>
						<h6 style={{margin:0, padding:0}}>Logout</h6>
						</Dialog>
					}
				</nav>
			</header>
		);
	}
}
