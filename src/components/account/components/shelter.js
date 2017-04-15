import { h, Component } from 'preact';
import { Card, TextField, Button, Switch, Dialog } from 'preact-mdl';
import data from '../data/pastOrders';

export default class Shelter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false,
			didCompleteBudget: false
		};
	}

	componentWillMount() {
		google.charts.load('current', {'packages':['corechart', 'bar']});
	}

	componentDidMount() {
    	google.charts.setOnLoadCallback(this.drawChart);
	}

	componentDidUpdate() {
		google.charts.setOnLoadCallback(this.drawChart);
	}
	finishBudget = () => {
		this.setState({ didCompleteBudget: true });
	}
	toggleModal = () => {
		this.setState({ isModalOpen: !this.state.isModalOpen });
	}

	drawChart = () => {
		// create pie chart data
		const pieData = new google.visualization.DataTable();
        pieData.addColumn('string', 'Topping');
        pieData.addColumn('number', 'Slices');
        pieData.addRows([
          ['Mountain Mike\'s Pizza', 4],
          ['Panda Express', 2],
          ['Yummy Buffet', 1]
        ])
	    const pieOptions = {'title':'Food Most Bought From',
                       'width':'100%',
                       'height': 220};
		const pieChart = new google.visualization.PieChart(document.getElementById('analytics'));

		// create line chart
		const lineData = google.visualization.arrayToDataTable([
          ['Month', 'Dollars'],
          ['Jan',  600],
          ['Feb',  450],
          ['Mar',  500],
          ['Apr',  420],
		  ['May',  675],
		  ['June',  700],
		  ['July',  490],
		  ['Aug',  520],
		  ['Sep',  400],
		  ['Oct',  640],
		  ['Nov',  400],
		  ['Dec',  210]
        ]);

        const lineOptions = {
          title: 'Monthy Budget',
          curveType: 'function',
		  width: '100%',
		  Height: 250,
          legend: { position: 'bottom' }
        };

        const lineChart = new google.visualization.LineChart(document.getElementById('analytics2'));

		// line 2 graph 
		const lineData2 = google.visualization.arrayToDataTable([
          ['Month', 'People'],
          ['Jan',  200],
          ['Feb',  220],
          ['Mar',  300],
          ['Apr',  190],
		  ['May',  150],
		  ['June',  160],
		  ['July',  210],
		  ['Aug',  230],
		  ['Sep',  190],
		  ['Oct',  250],
		  ['Nov',  300],
		  ['Dec',  400]
        ]);

        const lineOptions2 = {
          title: 'People Fed',
          curveType: 'function',
		  width: '100%',
		  Height: 250,
          legend: { position: 'bottom' }
        };

        const lineChart2 = new google.visualization.LineChart(document.getElementById('analytics5'));

		// draw charts
    	pieChart.draw(pieData, pieOptions);
		lineChart.draw(lineData, lineOptions);
		lineChart2.draw(lineData2, lineOptions2);
    }

	renderItems = () => {
		return data.map(i =>
				<Card
				style={{
					boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
					margin: 10,
					position: 'relative',
					width: '100%',
					height: 150,
					maxheight: 150,
					minHeight: 0,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					marginLeft: 0,
					marginRight: 0
				}}
				>

				<div
				style={{
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: 'center'
				}}>
					<h2 style={{marginBottom:15}}>
						{i.name}
					</h2>
				</div>
					<div
					style={{
						display: 'flex',
						justifyContent: 'flex-start',
						alignItems: 'center'
					}}>
					<h4 style={{paddingRight: 20}}>
						date: {i.date}
					</h4>
					<h4>
						servings: {i.servings}
					</h4>
					</div>
				</Card>
		);
	}
	render() {
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
						name='newItem'
						>Month</TextField>
						<TextField
						name='newItem'
						>Day</TextField>
						<TextField
						name='newItem'
						>Year</TextField>
					</div>

					<Button
					style={{boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)', margin: 5}}
					onClick={this.toggleModal}
					>Cancel</Button>
					<Button
					style={{boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)', margin: 5}}
					onClick={this.toggleModal}
					>Set Date</Button>
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
						marginRight: 15,
						textAlign: 'center'
					}}>
					<h2
					>Past Deliveries</h2>
					<div
					style={{
						maxHeight: '830',
						height: 780,
						width: 260,
						overflow: 'scroll'
					}}
					>
						{this.renderItems()}
					</div>
					</div>

					<div
					style={{
						display: 'flex',
						flexWrap: 'wrap'
					}}
					>
						<div
						style={{
							display: 'flex',
							flexWrap: 'no-wrap',
							flexDirection: 'row',
							maxHeight: '100px',
							marginBottom: 3,
							width: '100%'
						}}
						>
							<Card
							style={{
								margin: 3,
								boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
								height: '100px',
								minHeight: '100px',
								flexGrow: 1,
								display: 'flex',
								alignContent: 'center',
								textAlign:'center'
							}}
							>
							<h3>Deliver Food Today</h3>
							<div style={{marginLeft:'47%'}}><div style={{width: '50%'}}><Switch/></div></div>
							</Card>
							<Card
							style={{
								margin: 3,
								boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
								height: '100px',
								minHeight: '100px',
								flexGrow: 1,
								alignContent: 'center',
								textAlign:'center'
							}}
							>
							<h3>Pick a Delivery Date</h3>
							<div>
								<Button style={{boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)'}} onClick={this.toggleModal}>Pick Date</Button>
							</div>
							</Card>
							<Card
							style={{
								margin: 3,
								flexGrow: 1,
								boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
								height: '100px',
								minHeight: '100px',
								alignContent: 'center',
								textAlign:'center'
							}}
							>
								<div style={{minHeight: 0, maxHeight: 150}}>
									<TextField disabled={this.state.didCompleteBudget} style={{minHeight: 0, maxHeight: 150}}>{ this.state.didCompleteBudget ? 'Complete!' : 'Budget'}</TextField>
								</div>
								<div>
									<Button  disabled={this.state.didCompleteBudget} onClick={this.finishBudget} style={{boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)', margin: 8}}>Confirm Budget</Button>
								</div>
							
							</Card>

							<Card
							style={{
								margin: 3,
								flexGrow: 1,
								boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
								height: '100px',
								minHeight: '100px',
								alignContent: 'center',
								textAlign:'center'
							}}
							><h3>$600 Donated This Month</h3></Card>
							
						</div>


						<Card style={{
							float:'right',
							boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
							width: '100%',
							height: '86%',
							overflow: 'hide'
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
			</div>
		);
	}
}
