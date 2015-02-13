var React = require('react');
var Settings = require('./settings-tear');

var Input = require('react-bootstrap/Input');
var ButtonToolbar = require('react-bootstrap/ButtonToolbar');
var Button = require('react-bootstrap/Button');

var SettingsDefenses = React.createClass({
  getInitialState : function() {
    var state = {};

    state.hp = "";
    state.ac = "";
    state.init = "";
    state.speed  = "";
    state.hitdice = "";

    return (state);
  },
  toggle : function() {
    this.refs.settings.toggle();
  },
  handleChange : function(cmp, e) {
    var node = {};
    node[cmp] = e.target.value;
    this.setState(node);
  },
  handleOk : function() {

  },
  render : function() {
    return (
      <Settings ref="settings">
        <h3>{"Edit Defenses"}</h3>
        <p>{"Edit the values for your character's maximum hit points, hit dice, initiative, speed, and armor class."}</p>
        <Input type="text" onChange={this.handleChange.bind(this, "hp")} label="Maximum Hit Points" placeholder={this.props.character['charHitPoints']['maximum']} value={this.state.hp} />
        <Input type="text" onChange={this.handleChange.bind(this, "ac")} label="Armor Class" placeholder={this.props.character['charArmorClass']['score']} value={this.state.ac} />
        <Input type="text" onChange={this.handleChange.bind(this, "init")} label="initiative" placeholder={this.props.character['charInitiative']['score']} value={this.state.init} />
        <Input type="text" onChange={this.handleChange.bind(this, "speed")} label="Speed (ft)" placeholder={this.props.character['charSpeed']['score']} value={this.state.speed} />
        <Input type="text" onChange={this.handleChange.bind(this, "hitdice")} label="Total Hit Dice" placeholder={this.props.character['charHitPoints']['hitDiceTotal']} value={this.state.hitdice} />
        <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success">Save</Button>
        </ButtonToolbar>
      </Settings>
    );
  }
})

module.exports = SettingsDefenses;