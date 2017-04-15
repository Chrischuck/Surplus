import { h, Component } from 'preact';
import { Router } from 'preact-router';
import mdl from 'material-design-lite/material';

import './bootstrap.css';
import Header from './header';
import Login from './login';
import Account from './account';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app" style={{backgroundColor: '#f7f7f7'}}>
				<Header />

				<Router onChange={this.handleRoute}>
					<Login path="/login" />
					<Account path="/account" />
				</Router>
			</div>
		);
	}
}
