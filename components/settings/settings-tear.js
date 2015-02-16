var React = require('react');
var Panel = require('react-bootstrap/Panel');
var Accordion = require('react-bootstrap/Accordion');

var Settings = React.createClass({
  getInitialState : function() {
    return ({ active : 0 });
  },
  componentWillMount: function () {
    if (this.props.activeOpen) {
      this.setState({ active : 1 });  
    }
  },
  toggle : function() {
    this.setState({ active : (this.state.active === 0) ? 1 : 0 });
  },

  render : function() {
    return (
      <Accordion activeKey={this.state.active}>
        <Panel eventKey={1} className="settings-tear">
          <div className="settings-body">
            {this.props.children}
          </div>
        </Panel>
      </Accordion>
    );
  }
})

module.exports = Settings;