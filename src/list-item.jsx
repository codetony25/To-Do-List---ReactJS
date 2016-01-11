var React = require('react');
var rootUrl = 'https://glaring-inferno-8076.firebaseio.com/';
var Firebase = require('firebase');


module.exports = React.createClass({
	getInitialState: function() {
	    return {
	    	text: this.props.item.text,
	    	done: this.props.item.done,
	    	textChanged: false
	    }
	},
	componentWillMount: function() {
		this.fb = new Firebase(rootUrl + "items/" + this.props.item.key);
	},
	render: function() {
		return <div className="input-group">
			<span className="input-group-addon">
				<input 
					type="checkbox"
					checked={this.state.done}
					onChange={this.handleDoneChange}
					/>
			</span>
			<input 
				type="text"
				className="form-control"
				value={this.state.text}
				onChange={this.handleTextChange}
				disabled={this.state.done}
				/>
			<span className="input-group-btn">
				{this.changesButtons()}
				<button 
					className="btn btn-danger"
					onClick={this.handleDeleteClick}>
					Delete
				</button>
			</span>
		</div>
	},
	changesButtons: function() {
		if(this.state.textChanged) {
			return [
				<button 
					className="btn btn-info" 
					onClick={this.handleEditChange}>
					Save
				</button>,
				<button 
					className="btn btn-success"
					onClick={this.handleUndoText}>
					Undo
				</button>
			]
		} else {
			return null;
		}
	},
	handleTextChange: function(event) {
		this.setState({
			text: event.target.value,
			textChanged: true
		})
	},
	handleUndoText: function(event) {
		this.setState({
			text: this.props.item.text,
			textChanged: !this.state.textChanged
		})
	},
	handleEditChange: function(event) {
		this.fb.update({text: this.state.text});
		this.setState({textChanged: !this.state.textChanged})
	},
	handleDoneChange: function(event) {
		var update = {done: event.target.checked};
		this.setState(update);
		this.fb.update(update);
	},
	handleDeleteClick: function(event) {
		if (confirm("Are you sure you want to delete?")) {
			this.fb.remove();
		} else {
			return;
		} 
	}
});