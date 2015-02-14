var React = require('react');
var Button = require('react-bootstrap/Button');
var ButtonGroup = require('react-bootstrap/ButtonGroup');

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