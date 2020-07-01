import React from "react"
import ErrorMessages from './ErrorMessages.jsx'
import DatePicker from 'react-date-picker';

class NewEvent extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			name: "",
			date: "",
			period: "no repeat",
			status: "active",
			disabled: false,
			errors:{}
		};

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleDateChange = (date) => {
		this.setState({date: date})
	};

	handleChange(event){
		const name = event.target.name
		const value = event.target.type == 'checkbox' ? event.target.checked : event.target.value

		this.setState({
			[name]: value
		});
	}

	handleSubmit(event){
		event.preventDefault();
		this.setState({ disabled: true });
		const event_form = event.target

		fetch('api/v1/events/', {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
				event:{
					name: event_form.name.value,
					date: event_form.date.value,
					period: event_form.period.value,
					status: event_form.status.value
				}
			})
		})
		.then((response) => response.json())
		.then((responseJson) => {
			if(!("errors" in responseJson)){
			  this.props.prependEvent({
				  id: responseJson.id,
					name: this.state.name,
					date: responseJson.date,
					period: this.state.period,
					status: this.state.status
			  })
				this.setState({ errors: [] });
			}else{
				this.setState({
					errors: responseJson.errors
				});
			}
			this.setState({ disabled: false });
		})
		.catch((error) => {
  	})
	}

	render(){
		
		let period_options = this.props.eventPeriods
		period_options = period_options.map((option, index) => {
			return(
				<option key={index} value={option}>{option}</option>
			);
		});

		let status_options = this.props.eventStatuses
		status_options = status_options.map((option, index) => {
			return(
				<option key={index} value={option}>{option}</option>
			);
		});

		return(
			<div className="new-event-form">
				<form onSubmit={this.handleSubmit} className="row">
					<ErrorMessages errors={this.state.errors}/>

					<div className="form-event col-xs-12 col-sm-12 col-md-6 col-lg-6">
						<label>Name:</label>
						<input className="form-control" type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name" />
					</div>

					<div className="form-event col-xs-12 col-sm-12 col-md-6 col-lg-6">
						<label>Date:</label>
		        <DatePicker
		        	className="form-control"
		          onChange={this.handleDateChange}
		          value={this.state.date}
		        />
					</div>

					<div className="form-event col-xs-12 col-sm-12 col-md-6 col-lg-6">
						<label>Period:</label>
						<select className="form-control" name="period" value={this.state.period} onChange={this.handleChange}>
							{period_options}
						</select>
					</div>

					<div className="form-event col-xs-12 col-sm-12 col-md-6 col-lg-6">
						<label>Status:</label>
						<select className="form-control" name="status" value={this.state.status} onChange={this.handleChange}>
							{status_options}
						</select>
					</div>

					<div className="col-12 text-center mt-4">
						<button type="submit" disabled={this.state.disabled} className="btn btn-primary">Add</button>
					</div>
				</form>
			</div>			
		);
	}
}

export default NewEvent