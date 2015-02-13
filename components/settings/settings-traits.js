var React = require('react');
var Settings = require('./settings-tear');

var Input = require('react-bootstrap/Input');
var ButtonToolbar = require('react-bootstrap/ButtonToolbar');
var Button = require('react-bootstrap/Button');

var SettingsTraits = React.createClass({
  getInitialState : function () {
    var state = {};
    var copyPers = this.props.character['charTraits']['personalityTraits'];
    var copyIdeals = this.props.character['charTraits']['ideals'];
    var copyBonds = this.props.character['charTraits']['bonds'];
    var copyFlaws = this.props.character['charTraits']['flaws'];

    state.traits = copyPers;
    state.ideals = copyIdeals;
    state.bonds = copyBonds;
    state.flaws = copyFlaws;

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
        <h3>{"Edit Character Traits"}</h3>
        <p>{"Enter new info for any Character Traits. If a field is left blank and no new values are entered, nothing will be changed"}</p>
        <Input type="textarea" onChange={this.handleChange.bind(this, "traits")} label="Personality Traits" placeholder={this.props.character['charTraits']['personalityTraits']} value={this.state.traits} />
        <Input type="textarea" onChange={this.handleChange.bind(this, "ideals")} label="Ideals" placeholder={this.props.character['charTraits']['ideals']} value={this.state.ideals} />
        <Input type="textarea" onChange={this.handleChange.bind(this, "bonds")} label="Bonds" placeholder={this.props.character['charTraits']['bonds']} value={this.state.bonds} />
        <Input type="textarea" onChange={this.handleChange.bind(this, "flaws")} label="Flaws" placeholder={this.props.character['charTraits']['flaws']} value={this.state.flaws} />
        <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success">Save</Button>
        </ButtonToolbar>
      </Settings>
    );
  }
})

module.exports = SettingsTraits;