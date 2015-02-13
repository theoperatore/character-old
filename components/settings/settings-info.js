var React = require('react');
var Settings = require('./settings-tear');

var Input = require('react-bootstrap/Input');
var ButtonToolbar = require('react-bootstrap/ButtonToolbar');
var Button = require('react-bootstrap/Button');

var SettingsInfo = React.createClass({
  getInitialState : function() {
    var state = {};

    state.cls = "";
    state.lvl = "";
    state.xp = "";
    state.bg  = "";
    state.race = "";
    state.align = "";

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
        <h3>{"Edit Character Info"}</h3>
        <p>{"Enter a new value for any Character Info. If a field is left blank and no new values are entered, nothing will be changed."}</p>
        <Input type="text" onChange={this.handleChange.bind(this, "cls")} label="Class" placeholder={this.props.character['charInfo']['class']} value={this.state.cls} />
        <Input type="text" onChange={this.handleChange.bind(this, "race")} label="Race" placeholder={this.props.character['charInfo']['race']} value={this.state.race} />
        <Input type="text" onChange={this.handleChange.bind(this, "lvl")} label="Level" placeholder={this.props.character['charInfo']['level']} value={this.state.lvl} />
        <Input type="text" onChange={this.handleChange.bind(this, "xp")} label="Xp" placeholder={this.props.character['charInfo']['xp']} value={this.state.xp} />
        <Input type="text" onChange={this.handleChange.bind(this, "bg")} label="Background" placeholder={this.props.character['charInfo']['background']} value={this.state.bg} />
        <Input type="text" onChange={this.handleChange.bind(this, "align")} label="Alignment" placeholder={this.props.character['charInfo']['alignment']} value={this.state.align} />
        <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success">Save</Button>
        </ButtonToolbar>
      </Settings>
    );
  }
})

module.exports = SettingsInfo;