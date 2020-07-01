import React from "react"

class NavBar extends React.Component {

	render(){

		let buttons
		if(this.props.user_id != ""){
			buttons = (
				<span><button className={ this.props.pageType == "all" ? "btn btn-secondary page-type-btn page-type-selected" : "btn btn-secondary page-type-btn"} onClick={() => this.props.switchPageType("all")}>All</button><button className={ this.props.pageType == "my" ? "page-type-selected btn btn-secondary page-type-btn" : "btn btn-secondary page-type-btn"} onClick={() => this.props.switchPageType("my")}>My</button></span>
			);
		}else{
			buttons = ("");
		}

		return(
			<div className="text-center">
				<h4>Events</h4>
				{buttons}
			</div>
		);

	}
}

export default NavBar