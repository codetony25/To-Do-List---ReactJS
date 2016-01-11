var React = require('react');

module.exports = React.createClass({
	render: function() {
		return <div className="alert alert-danger text-center" role="alert">
					  <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
					  <p>Field can not be left empty.</p>
					</div>
	}
});