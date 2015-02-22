var React = require('react');
var PageHeader = require('react-bootstrap/lib/PageHeader');

var Title = React.createClass({
  displayName : "Title",
  render : function() {
    return (
      <div className="container-fluid">
        <h2 onClick={this.props.toggleAppSettings}>{this.props.character['charName']}</h2>
      </div>
    );
  }
})

// return component
module.exports = Title;