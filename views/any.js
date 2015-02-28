var React = require('react');
var Page = require('page');


var Any = React.createClass({
  displayName: 'Any',
  render: function () {
    return (
      <div className="container text-center">
        <h1 className="text-danger">{"Critical Failure!"}</h1>
        <p className="lead">{"Rolled a 1 on your URL skill?"}</p>
        <a href="/">{"home"}</a>
      </div>
    );
  }
});

module.exports = Any;