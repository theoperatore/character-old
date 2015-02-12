var React = require('react');
var Modal = require('react-bootstrap/Modal');
var Input = require('react-bootstrap/Input');
var Button = require('react-bootstrap/Button');
var Alert = require('react-bootstrap/Alert');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var Panel = require('react-bootstrap/Panel');
var Accordion = require('react-bootstrap/Accordion');

var Settings = React.createClass({
  getInitialState : function() {
    return ({ active : 0 });
  },

  toggle : function() {
    this.setState({ active : (this.state.active === 0) ? 1 : 0 });
  },

  render : function() {
    return (
      <Accordion activeKey={this.state.active}>
        <Panel eventKey={1} className="settings-tear">
          {this.props.children}
        </Panel>
      </Accordion>
    );
  }
})

module.exports = Settings;