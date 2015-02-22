var React = require('react');
var Button = require('react-bootstrap/lib/Button');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');

var AppSettings = React.createClass({
  render : function() {
    return (
      <div className="container-fluid">
        <h3>{"Character App Settings"}</h3>
        <ButtonGroup>
          <Button bsStyle="success" onClick={this.props.handleNewCharacter}>{"Create New Character"}</Button>
        </ButtonGroup>
      </div>
    );
  }
})

module.exports = AppSettings;