var React = require('react');
var Error = require('./error');

module.exports = React.createClass({
	getInitialState: function() {
	    return {
	      text: ''
	    }
	},
	render: function() {
		return <div className="input-group">
			<input 
				value={this.state.text}
				onChange={this.handleInputChange}
				onKeyDown={this.handleEnterKeyChange}
				type="text" 
				className="form-control"
				autoFocus="true" />
			<span className="input-group-btn">
				<button 
					onClick={this.handleClick}
					className="btn btn-default" 
					type="button">
					Add
				</button>
			</span>	
		</div>
	},
	handleEnterKeyChange: function(event) {
		if(event.keyCode === 13) {
			this.handleClick();
		}
	},
	handleClick: function(event) {
		if(this.state.text) {
			this.props.itemStore.push({
				text: this.state.text.trim(),
				done: false
			});

			this.setState({
				text: ''
			});
			
			this.props.textErrorMessage(false);
		} else {
			this.props.textErrorMessage(true);
		}
	},
	handleInputChange: function(event) {
		this.setState({text: event.target.value});
	}
});