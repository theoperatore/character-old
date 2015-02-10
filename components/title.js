var React = require('react');
var PageHeader = require('react-bootstrap/PageHeader');

var Title = React.createClass({
  displayName : "Title",
  render : function() {
    return (
      <div className="container-fluid">
        <h2>{this.props.character['charName']}</h2>
      </div>
    );
  }
})

// return component
module.exports = Title;