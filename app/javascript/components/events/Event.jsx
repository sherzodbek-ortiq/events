import React from "react"
import { Link } from 'react-router-dom';
import ErrorMessages from './ErrorMessages.jsx'
import DatePicker from 'react-date-picker';

class Event extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			name: "",
			date: "",
			period: "",
			status: "",
			previousValues: {
				name: "",
				date: "",
				period: "",
				status: "",
			},
			errors:{},
			editable: false,
			disabled: false,
		};

		this.handleEdit = this.handleEdit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	componentDidMount(){
		this.setState({
			name: this.props.event.name,
			date: new Date(this.props.event.date),
			period: this.props.event.period,
			status: this.props.event.status,
			previousValues:{
				name: this.props.event.name,
				date: new Date(this.props.event.date),
				period: this.props.event.period,
				status: this.props.event.status
			}
		});
	}

	handleDateChange = (date) => {
		this.setState({date: date})
	};

	handleChange(event){
		const name = event.target.name;
		const value = event.target.type == 'checkbox' ? event.target.checked : event.target.value;

		this.setState({
			[name]: value
		});
	}

	handleEdit(){
		if(this.state.editable){
			this.setState({ disabled: true });
			const name = this.state.name;
			const date = this.state.date;
			const period = this.state.period;
			const status = this.state.status;
			const event = {name: name, date: date, period: period, status: status};

			fetch('api/v1/events/' + this.props.event.id, {
			  method: 'PATCH',
			  headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({
			  	event: event
			  })
			})
			.then((response) => response.json())
			.then((responseJson) => {
				if(!("errors" in responseJson)){
					this.setState({
						name: name,
						date: date,
						period: period,
						status: status,
						previousValues:{
							name: this.state.name,
							date: this.state.date,
							period: this.state.period,
							status: this.state.satatus
						},
						errors: {},
					});
					this.setState({editable: !this.state.editable})
				}else{
					this.setState({
						errors: responseJson.errors,
					});
				}
  			this.setState({ disabled: false });
			})
			.catch((error) => {
  		})
		} else {
			this.setState({editable: !this.state.editable})
		}
	}

	handleDelete(){
		fetch('api/v1/events/' + this.props.event.id, {
		  method: 'DELETE',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  }
		})
		.then((response) => response.json())
		.then((responseJson) => {
			if(!("errors" in responseJson)){
				this.props.removeEvent(this.props.event.id)
				this.state.errors = {}
			}else{
				this.state.errors = responseJson.errors
			}
		})
		.catch((error) => {
  	})
  }

	handleCancel(){
		this.setState({
			name: this.state.previousValues.name,
			date: this.state.previousValues.date,
			period: this.state.previousValues.period,
			status: this.state.previousValues.status,
			errors:{},
			editable: false
		});
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

		let event_data
		if(this.state.editable == true){
			event_data = (
				<div className="event-data">
					<b>Name:</b> <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name" />												
					<b>Date:</b>
		      <DatePicker
		        onChange={this.handleDateChange}
		        value={this.state.date}
		      />
					<b>Period:</b>
						<select name="period" value={this.state.period} onChange={this.handleChange}>
							{period_options}
						</select>
					<b>Status:</b>
						<select name="status" value={this.state.status} onChange={this.handleChange}>
							{status_options}
						</select>
				</div>
			);
		}else{
			event_data = (

			<div className="card text-white bg-danger mb-3 event-card">
			  <div className="card-header">{this.state.name}</div>
			  <div className="card-body row">
			    <h6 className="card-title col-4">Date: {new Date(this.state.date).toDateString()}</h6>
			    <h6 className="card-title col-4">Repeat: {this.state.period}</h6>
			    <h6 className="card-title col-4">Status: {this.state.status}</h6>
			  </div>
			</div>

			);
		}

		return(
			<div className="event">
				<ErrorMessages errors={this.state.errors}/>
				{event_data}
				<button onClick={this.handleEdit} disabled={this.state.disabled} className="btn btn-primary">
					{this.state.editable ? "Update" : "Edit"}
				</button>				
				{this.state.editable ? <button onClick={this.handleCancel} className="btn btn-primary">Cancel</button> : ""}
				<button onClick={this.handleDelete} className="btn btn-primary">Delete</button>
			</div>
		);
	}

};

export default Event