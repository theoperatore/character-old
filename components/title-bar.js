var React = require('react');
var PageHeader = require('react-bootstrap/PageHeader');

var Title = React.createClass({
  displayName : "TitleBar",
  render : function() {
    return (
      <div className="container-fluid">
        <h1>{this.props.character['charName']}</h1>
      </div>
    );
  }
})

// return component
module.exports = Title;