var React = require('react');

var Input = require('react-bootstrap/lib/Input');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Button = require('react-bootstrap/lib/Button');

var SettingsTraits = React.createClass({
  getInitialState : function () {
    var state = {};

    state.traits = "";
    state.ideals = "";
    state.bonds = "";
    state.flaws = "";

    return (state);
  },
  toggle : function() {
    this.props.hatchToggle();
  },
  handleChange : function(cmp, e) {
    var node = {};
    node[cmp] = e.target.value;
    this.setState(node);
  },
  handleOk : function() {
    var tmp = this.props.character;
    var path = "charTraits";

    if (this.state.traits !== "") {
      tmp = tmp.setIn(['charTraits', 'personalityTraits'], this.state.traits);
      path += ".personalityTraits." + this.state.traits;
    } 

    if (this.state.ideals !== "") {
      tmp = tmp.setIn(['charTraits', 'ideals'], this.state.ideals);
      path += ".ideals." + this.state.ideals;
    }

    if (this.state.bonds !== "") {
      tmp = tmp.setIn(['charTraits', 'bonds'], this.state.bonds);
      path += ".bonds." + this.state.bonds;
    }

    if (this.state.flaws !== "") {
      tmp = tmp.setIn(['charTraits', 'flaws'], this.state.flaws);
      path += ".flaws." + this.state.flaws;
    }

    this.props.edit({ path : path, character : tmp});
    this.toggle();
  },
  render : function() {
    return (
      <div className="settings-tear" ref="settings" activeOpen={true}>
        <h3>{"Edit Character Traits"}</h3>
        <p>{"Enter new info for any Character Traits. If a field is left blank and no new values are entered, nothing will be changed"}</p>
        <Input type="textarea" onChange={this.handleChange.bind(this, "traits")} label="Personality Traits" placeholder={this.props.character.get('charTraits').get('personalityTraits')} value={this.state.traits} />
        <Input type="textarea" onChange={this.handleChange.bind(this, "ideals")} label="Ideals" placeholder={this.props.character.get('charTraits').get('ideals')} value={this.state.ideals} />
        <Input type="textarea" onChange={this.handleChange.bind(this, "bonds")} label="Bonds" placeholder={this.props.character.get('charTraits').get('bonds')} value={this.state.bonds} />
        <Input type="textarea" onChange={this.handleChange.bind(this, "flaws")} label="Flaws" placeholder={this.props.character.get('charTraits').get('flaws')} value={this.state.flaws} />
        <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success" onClick={this.handleOk}>Save</Button>
        </ButtonToolbar>
      </div>
    );
  }
})

module.exports = SettingsTraits;