import React from "react"
import Event from './Event.jsx'

class AllEvents extends React.Component {

	render(){

		var events = this.props.events

		events = events.sort((a,b) => {
		    return new Date(a.date).getTime() - new Date(b.date).getTime()
		});

		events = events.map((event) =>{
			return(
				<Event key={event.id} user_id={this.props.user_id} event={event} removeEvent={this.props.removeEvent} eventPeriods={this.props.eventPeriods} eventStatuses={this.props.eventStatuses}/>
			)
		});

		return(
			<div>
				{events}
			</div>
		);
	}
}

export default AllEvents
