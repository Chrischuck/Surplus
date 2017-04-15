import { h, Component } from 'preact';
import { Card, TextField, Button, Switch } from 'preact-mdl';
import data from '../data/pastOrders';

export default class Shelter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false
		};
	}
	componentWillMount() {
		google.charts.load('current', {'packages':['corechart', 'bar']});
	}

	componentDidMount() {
    	google.charts.setOnLoadCallback(this.drawChart);
	}

	drawChart = () => {
		// create pie chart data
		const pieData = new google.visualization.DataTable();
        pieData.addColumn('string', 'Topping');
        pieData.addColumn('number', 'Slices');
        pieData.addRows([
          ['Pad Thai', 3],
          ['Yellow Curry', 1],
          ['Broccoli Stirfry', 1]
        ])
	    const pieOptions = {'title':'Top overproduced foods',
                       'width':'100%',
                       'height': 220};
		const pieChart = new google.visualization.PieChart(document.getElementById('analytics'));

		const pieData2 = new google.visualization.DataTable();
        pieData2.addColumn('string', 'Topping');
        pieData2.addColumn('number', 'Slices');
        pieData2.addRows([
          ['Shelter 1', 2],
          ['Shelter 2', 2],
          ['Shelter 3', 1]
        ])
	    const pieOptions2 = {'title':'Distribution per Homeless Shelter',
                       'width':'100%',
                       'height': 220};
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
		  Height: 250,
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
		  Height: 250,
          legend: { position: 'bottom' }
        };

        const lineChart2 = new google.visualization.LineChart(document.getElementById('analytics5'));

		
		// draw charts
		
    	pieChart.draw(pieData, pieOptions);
		pieChart2.draw(pieData2, pieOptions2);
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
					height: 100,
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
					<h1 style={{marginBottom:15}}>
						{i.name}
					</h1>
				</div>


				</Card>
		);
	}
	render() {
		return (
			<div>
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
					<h1
					>Past Deliveries</h1>
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
								<Button style={{boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)'}}>Pick Date</Button>
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
