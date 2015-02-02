var React = require('react');
var PageHeader = require('react-bootstrap/PageHeader');

var Title = React.createClass({
  displayName : "TitleBar",
  render : function() {
    return (
      <h1>{this.props.character['charName']}</h1>
    );
  }
})

// return component
module.exports = Title;