import { h, Component } from 'preact';
import { Card, TextField, Button, Dialog } from 'preact-mdl';

export default class Restaurant extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false,
			newItem: '',
			newPrice: '',
			newInitialQuantity: '',
			menu: {
				burger: {
					name: 'burger',
					price: 3,
					quantity: 4
				},
					tacos: {
					name: 'tacos',
					price: 3,
					quantity: 5
				},
					bread: {
					name: 'bread',
					price: 3,
					quantity: 7
				}
			}
		};
	}
	componentWillMount() {
		google.charts.load('current', {'packages':['corechart', 'bar']});
	}
	drawChart = () => {
		// create pie chart data
		const pieData = new google.visualization.DataTable();
        pieData.addColumn('string', 'Topping');
        pieData.addColumn('number', 'Slices');
        pieData.addRows([
          ['Combination Pizza', 3],
          ['Thai', 1],
          ['Broccoli Stirfry', 1]
        ])
	    const pieOptions = {'title':'Top overproduced foods',
                       'width':'100%',
                       'height': 240};
		const pieChart = new google.visualization.PieChart(document.getElementById('analytics'));

		const pieData2 = new google.visualization.DataTable();
        pieData2.addColumn('string', 'Topping');
        pieData2.addColumn('number', 'Slices');
        pieData2.addRows([
          ['Berkeley Food & Housing Project', 2],
          ['Sacred Heart Community Service', 2],
          ['CityTeam Ministries San Jose', 1]
        ])
	    const pieOptions2 = {'title':'Distribution per Homeless Shelter',
                       'width':'100%',
                       'height': 240};
		const pieChart2 = new google.visualization.PieChart(document.getElementById('analytics4'));

		// create line chart
		const lineData = google.visualization.arrayToDataTable([
          ['Month', 'Appetizers', 'Entres'],
          ['Jan',  300,      100],
          ['Feb',  350,      130],
          ['Mar',  400,       80],
          ['Apr',  420,      100],
		  ['May',  375,      150],
		  ['June',  300,      200],
		  ['July',  290,      240],
		  ['Aug',  320,      180],
		  ['Sep',  330,      230],
		  ['Oct',  350,      350],
		  ['Nov',  400,      300],
		  ['Dec',  410,      260]
        ]);

        const lineOptions = {
          title: 'Servings sold this year',
          curveType: 'function',
		  width: '100%',
		  Height: 240,
          legend: { position: 'bottom' }
        };

        const lineChart = new google.visualization.LineChart(document.getElementById('analytics2'));

		// line 2 graph 
		const lineData2 = google.visualization.arrayToDataTable([
          ['Month', 'Dollars'],
          ['Jan',  50],
          ['Feb',  35],
          ['Mar',  40],
          ['Apr',  42],
		  ['May',  37],
		  ['June',  30],
		  ['July',  29],
		  ['Aug',  32],
		  ['Sep',  33],
		  ['Oct',  35],
		  ['Nov',  40],
		  ['Dec',  41]
        ]);

        const lineOptions2 = {
          title: 'Tax Deductions',
          curveType: 'function',
		  width: '100%',
		  Height: 240,
          legend: { position: 'bottom' }
        };

        const lineChart2 = new google.visualization.LineChart(document.getElementById('analytics5'));

		// create bar chart
	    const barData = google.visualization.arrayToDataTable([
			['Possible Lost vs. Gained Profit Comparison', 'Gained', 'Lost', { role: 'annotation' } ],
			['Jan', 500, 700, ''],
			['Feb', 350, 620, ''],
			['Mar', 250, 400, ''],
			['Apr', 500, 620, ''],
			['May', 320, 390, ''],
			['June', 400, 700, ''],
			['July', 300, 450, ''],
			['Aug', 370, 400, ''],
			['Sep', 100, 300, ''],
			['Oct', 450, 600, ''],
			['Nov', 200, 370, ''],
			['Dec', 270, 400, '']
		]);

		const barOptions = {
          	isStacked: 'percent',
         	height: 240,
			width: '100%',
          	legend: {position: 'left', maxLines: 3},
          	vAxis: {
            minValue: 0,
            ticks: [0, .3, .6, .9, 1]
          }
        }
		const barChart = new google.charts.Bar(document.getElementById('analytics3'));
		// draw charts
		
		barChart.draw(barData, barOptions);
    	pieChart.draw(pieData, pieOptions);
		pieChart2.draw(pieData2, pieOptions2);
		lineChart.draw(lineData, lineOptions);
		lineChart2.draw(lineData2, lineOptions2);
    }
	toggleModal = () => {
		if (this.state.isModalOpen === true) {
			this.setState({
				newItem: '',
				newPrice: '',
				newInitialQuantity: ''
			});
		}
		this.setState({ isModalOpen: !this.state.isModalOpen});
	}

	componentDidMount() {
    	google.charts.setOnLoadCallback(this.drawChart);
	}
	
	componentDidUpdate() {
		google.charts.setOnLoadCallback(this.drawChart);
	}

	setNewItem = () => {
		const { newItem, newPrice, newInitialQuantity } = this.state;
		if (!newItem) {
			return;
		}
		if (!newPrice) {
			return;
		}
		if (!newInitialQuantity) {
			return;
		}
		const newItemId = newItem.replace(/\s+/g, '-');
		this.setState({
			menu: {
				[newItemId]: {
					name: newItem,
					price: newPrice,
					quantity: newInitialQuantity
				},
				...this.state.menu
			},
			newItem: '',
			newPrice: '',
			newInitialQuantity: '',
			isModalOpen: false
		});
	}
	onInputChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	}

	addItem = id => {
		let newMenu = this.state.menu;
		newMenu[id].quantity = parseInt(newMenu[id].quantity, 10);
		newMenu[id].quantity += 1;
		this.setState({ menu: newMenu });
	}

	subtractItem = id => {
		let quantity = this.state.menu[id].quantity;
		if (quantity === 0)
			return;
		let newMenu = this.state.menu;
		newMenu[id].quantity -= 1;
		if (newMenu[id].quantity === 0)
			delete newMenu[id];
		this.setState({ menu: newMenu });
	}
	renderItems = () => {
		const { menu } = this.state;
		const keys = Object.keys(menu);

		return keys.map(i => {
			if (menu[i].quantity === 0)
				return null;
			return (
				<Card
				style={{
					boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
					margin: 10,
					position: 'relative',
					width: '100%',
					height: 150,
					minHeight:100,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					marginLeft: 0,
					marginRight: 0
				}}
				>

				<div
				style={{
					background: 'rgb(220, 220, 220)',
					padding:'13px',
					borderRadius: '50%',
					boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
					margin: 4,
					marginLeft: 'auto'
				}}
				>
				{ menu[i].quantity }
				</div>

				<div
				style={{
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: 'center',
					marginTop: 0,
				}}>
					<h2 style={{marginBottom:15, marginTop: 0}}>
						{menu[i].name}
					</h2>
				</div>

				<div
					style={{bottom: '4px'}}
				>
					<Button
					style={{boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)'}}
					name={i}
					onClick={() => this.addItem(i)}
					>+</Button>
					<Button
					style={{boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)'}}
					onClick={() => this.subtractItem(i)}
					>-</Button>
				</div>
				</Card>
			);
		});
	}
	
	render() {
		console.log(this.state);
		return (
			<div>
				{
					this.state.isModalOpen &&
					<Dialog
					modal={true}
					open={this.state.isModalOpen}
					style={{
						width: 500,
						height: 300,
						zIndex: 9999,
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'center'
					}}
					>
					<div
					style={{
						textAlign: 'center',
						width: 400,
						float: 'left'
					}}
					>
						<TextField
						onChange={this.onInputChange}
						name='newItem'
						value={this.state.newItem}
						>Item</TextField>
						<TextField
						onChange={this.onInputChange}
						name='newPrice'
						value={this.state.newPrice}
						>Price</TextField>
						<TextField
						onChange={this.onInputChange}
						name='newInitialQuantity'
						value={this.state.newInitialQuantity}
						>Initial Quantity</TextField>
					</div>

					<Button
					style={{boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)', margin: 5}}
					onClick={this.toggleModal}
					>Cancel</Button>
					<Button
					style={{boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)', margin: 5}}
					onClick={this.setNewItem}
					>Add Item</Button>
					</Dialog>
				}
				<div
					style={{
						display:'flex'
					}}
				>
					<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						flexDirection: 'column',
						width: 400,
						marginRight: 15
					}}>
					<Button
					disabled={this.state.isModalOpen}
					style={{boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)', height: '40.5px'}}
					onClick={this.toggleModal}
					>Add Item</Button>
					<div
					style={{
						maxHeight: '830',
						height: 830,
						overflow: 'scroll'
					}}
					>
						{this.renderItems()}
					</div>
					</div>


					<Card style={{
						float:'right',
						boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
						width: '100%',
						height: '100%'
					}}
						>
						<div
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							justifyContent: 'center'
						}}
						>	
							<div
							style={{
								display: 'flex',
								justifyContent: 'center'
							}}
							>	
								<div id='analytics'></div>
								<div id='analytics4'></div>
							</div>

							<div
							style={{
								width: '90%'
							}}
							id='analytics3'></div>
							<div
							style={{
								width: '100%'
							}}
							id='analytics2'></div>
							<div
							style={{
								width: '100%'
							}}
							id='analytics5'></div>
						</div>
						

					</Card>

				</div>
			</div>
		);
	}
}
