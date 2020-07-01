import React from "react"
import NavBar from './NavBar.jsx'
import NewEvent from './NewEvent.jsx'
import AllEvents from './AllEvents.jsx'

class Body extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      events: [],
      pageType: "all",
    	eventPeriods: ["yearly", "weekly", "monthly", "daily"],
			eventStatuses: ["active", "upcoming", "past"],
    	errors: {}
    };

    this.prependEvent = this.prependEvent.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
    this.switchPageType = this.switchPageType.bind(this);
  }

	componentDidMount(){
		fetch(`api/v1/events.json?page_type=${this.state.pageType}`, {
			method: "GET"
		})
		.then(response => response.json())
		.then( (response) => {
			this.setState({ events: response });
		});
	}

	prependEvent(event){
		let events = this.state.events
		events.unshift(event)
  	this.setState({
  	  events: events
  	});
	}

	removeEvent(id){
  	let events = this.state.events.filter((event) => { return event.id != id });
  	this.setState({events: events });
	}

	switchPageType(pageType){
  	this.setState({pageType: pageType });

		fetch(`api/v1/events.json?page_type=${pageType}`, {
			method: "GET"
		})
		.then(response => response.json())
		.then((responseJson) => {
			if(!("errors" in responseJson)){
				this.setState({
					events: responseJson,
					errors: []					
				});
			}else{
				this.setState({
					errors: responseJson.errors
				});
			}
		})
		.catch((error) => {
  	})

	}

	render(){
		return(
			<div>
				<NewEvent prependEvent={this.prependEvent} eventPeriods={this.state.eventPeriods} eventStatuses={this.state.eventStatuses}/>
				<NavBar pageType={this.state.pageType} switchPageType={this.switchPageType}/>
				<AllEvents events={this.state.events} removeEvent={this.removeEvent} eventPeriods={this.state.eventPeriods} eventStatuses={this.state.eventStatuses}/>
			</div>
		);
	}
}

export default Body
