import React from "react"
import Body from './Body.jsx'

class EventsMain extends React.Component {
	render(){
		return(
			<div>
				<Body user_id={this.props.user_id}/>
			</div>
		);
	}
}

export default EventsMain
