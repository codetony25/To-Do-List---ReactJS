var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Header = require('./header');
var List = require('./list');
var Error = require('./error');
var Firebase = require('firebase');
var rootUrl = 'https://glaring-inferno-8076.firebaseio.com/';

var Hello = React.createClass({
	mixins: [ ReactFire ],
	getInitialState: function() {
	    return {
	      items: {},
	      loaded: false,
	      errorMsg: false
	    }
	},
	componentWillMount: function() {
		this.fb = new Firebase(rootUrl + 'items/');
		this.bindAsObject(this.fb, 'items');
		this.fb.on('value', this.handleDataLoaded);    
	},
  render: function() {
    return <div className="row panel panel-default">
    	<div className="col-md-8 col-md-offset-2">
    		<h2 className="text-center">
    			Welcome to your awesome To-Do List
    		</h2>
    		{this.state.errorMsg ? <Error /> : null}
    		<Header itemStore={this.firebaseRefs.items} textErrorMessage={this.errorMessage}/>
    		<hr />
    		<table className="table table-bordered">
	    		<tr>
	    			<th className="text-center">Completed</th>
	    			<th className="text-center">To-Do Description</th>
	    			<th className="text-center">Action</th>
	    		</tr>
    		</table>
    		<div className={"content " + (this.state.loaded ? 'loaded' : '')}>
    			<List items={this.state.items} />
    		</div>
    	</div>
    	{this.deleteButton()}
    </div>
  },
  errorMessage: function(err) {
  	this.setState({
  		errorMsg: err
  	});
  },
  deleteButton: function() {
  	if(!this.state.loaded) {
  		return;
  	} else {
  		return <div className="text-center clear-complete">
  			<hr />
  			<button 
					className="btn btn-warning"
					onClick={this.onClickDeleteTask}
					>
					Clear All Completed Tasks
				</button>
  		</div>
  	}
  },
  onClickDeleteTask: function() {
  	for(var key in this.state.items) {
  		if(this.state.items[key].done === true) {
  			this.fb.child(key).remove();
  		}
  	}
  },
  handleDataLoaded: function() {
  	this.setState({loaded: true});
  }
});

var element = React.createElement(Hello, {});
ReactDOM.render(element, document.querySelector('.container'));
