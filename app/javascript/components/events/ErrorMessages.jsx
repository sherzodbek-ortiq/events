import React from "react"

class ErrorMessages extends React.Component {

	render(){
		const errors = this.props.errors
		var errorList = []

		for(var key in errors){
			errors[key].forEach( (value, index, array) => {
				errorList.push(key + " " + value)
			})
		}

		errorList = errorList.map( (value, index, array) => {
			return(
				<div key={index} className="error-event-item">
					{value}
				</div>
			);
		})

		return(
			<div className="error-event col-12">
				{errorList}
			</div>
		);
	}

};

export default ErrorMessages