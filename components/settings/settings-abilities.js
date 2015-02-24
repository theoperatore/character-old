var React = require('react');

var Input = require('react-bootstrap/lib/Input');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Button = require('react-bootstrap/lib/Button');

var SettingsAbilities = React.createClass({
  getInitialState : function() {
    var state = {};

    state['str'] = "";
    state['dex'] = "";
    state['con'] = "";
    state['int'] = "";
    state['wis'] = "";
    state['cha'] = "";
    state.prof = "";

    state.strerror = false;
    state.dexerror = false;
    state.conerror = false;
    state.interror = false;
    state.wiserror = false;
    state.chaerror = false;
    state.proferror = false;

    return (state);
  },
  toggle : function() {
    this.props.hatchToggle();
  },
  clearState : function() {
    var state = {};

    state['str'] = "";
    state['dex'] = "";
    state['con'] = "";
    state['int'] = "";
    state['wis'] = "";
    state['cha'] = "";
    state.prof = "";

    state.strerror = false;
    state.dexerror = false;
    state.conerror = false;
    state.interror = false;
    state.wiserror = false;
    state.chaerror = false;
    state.proferror = false;

    this.setState(state);
  },
  handleChange : function(cmp, e) {
    var node = {};
    var err;
    var val;

    val = parseInt(e.target.value, 10);

    if (isNaN(val)) {
      err = {};
      err[cmp+"error"] = true;
      this.setState(err);
    }
    else {
      err = {};
      err[cmp+"error"] = false;
      this.setState(err);
    }

    node[cmp] = isNaN(val) ? e.target.value : val;
    this.setState(node);
  },
  handleOk : function() {
    var tmp = this.props.character;
    var path = "charAbilityScores.edit.";

    if (
      this.state.strerror ||
      this.state.dexerror ||
      this.state.conerror ||
      this.state.interror ||
      this.state.wiserror ||
      this.state.chaerror ||
      this.state.proferror )
    {
      return;
    }

    if (this.state['str'] !== "") {
      tmp['charAbilities']['str']['score'] = this.state['str'];
      tmp['charAbilities']['str']['mod'] = Math.floor((this.state['str'] - 10) / 2);
      path += 'str.' + this.state['str'];
    }
    if (this.state['dex'] !== "") {
      tmp['charAbilities']['dex']['score'] = this.state['dex'];
      tmp['charAbilities']['dex']['mod'] = Math.floor((this.state['dex'] - 10) / 2);
      path += 'dex.' + this.state['dex'];
    }
    if (this.state['con'] !== "") {
      tmp['charAbilities']['con']['score'] = this.state['con'];
      tmp['charAbilities']['con']['mod'] = Math.floor((this.state['con'] - 10) / 2);
      path += 'con.' + this.state['con'];
    }
    if (this.state['int'] !== "") {
      tmp['charAbilities']['int']['score'] = this.state['int'];
      tmp['charAbilities']['int']['mod'] = Math.floor((this.state['int'] - 10) / 2);
      path += 'int.' + this.state['int'];
    }
    if (this.state['wis'] !== "") {
      tmp['charAbilities']['wis']['score'] = this.state['wis'];
      tmp['charAbilities']['wis']['mod'] = Math.floor((this.state['wis'] - 10) / 2);
      path += 'wis.' + this.state['wis'];
    }
    if (this.state['cha'] !== "") {
      tmp['charAbilities']['cha']['score'] = this.state['cha'];
      tmp['charAbilities']['cha']['mod'] = Math.floor((this.state['cha'] - 10) / 2);
      path += 'cha.' + this.state['cha'];
    }
    if (this.state.prof !== "") {
      tmp['charProficiencyBonus']['score'] = this.state.prof;
      path += 'proficiency.' + this.state.prof;
    }


    this.props.edit({ path : path, character : tmp });
    this.clearState();
    this.toggle();
  },
  render : function() {
    var validstr = (this.state.strerror) ? "error" : "success";
    var validdex = (this.state.dexerror) ? "error" : "success";
    var validcon = (this.state.conerror) ? "error" : "success";
    var validint = (this.state.interror) ? "error" : "success";
    var validwis = (this.state.wiserror) ? "error" : "success";
    var validcha = (this.state.chaerror) ? "error" : "success";
    var validprof = (this.state.proferror) ? "error" : "success";

    return (
      <div className="settings-tear">
        <h3>{"Edit Ability Scores"}</h3>
        <p>{"Enter the values of each ability score. The relevant modifiers are calculated automatically."}</p>
        <Input bsStyle={this.state['str'] === "" ? null : validstr} type="text" label="Strength" value={this.state['str']} onChange={this.handleChange.bind(this, "str")} placeholder={this.props.character['charAbilities']['str']['score']}/>
        <Input bsStyle={this.state['dex'] === "" ? null : validdex} type="text" label="Dexterity" value={this.state['dex']} onChange={this.handleChange.bind(this, "dex")} placeholder={this.props.character['charAbilities']['dex']['score']}/>
        <Input bsStyle={this.state['con'] === "" ? null : validcon} type="text" label="Constitution" value={this.state['con']} onChange={this.handleChange.bind(this, "con")} placeholder={this.props.character['charAbilities']['con']['score']}/>
        <Input bsStyle={this.state['int'] === "" ? null : validint} type="text" label="Intelligence" value={this.state['int']} onChange={this.handleChange.bind(this, "int")} placeholder={this.props.character['charAbilities']['int']['score']}/>
        <Input bsStyle={this.state['wis'] === "" ? null : validwis} type="text" label="Wisdom" value={this.state['wis']} onChange={this.handleChange.bind(this, "wis")} placeholder={this.props.character['charAbilities']['wis']['score']}/>
        <Input bsStyle={this.state['cha'] === "" ? null : validcha} type="text" label="Charisma" value={this.state['cha']} onChange={this.handleChange.bind(this, "cha")} placeholder={this.props.character['charAbilities']['cha']['score']}/>
        <Input bsStyle={this.state.prof === "" ? null : validprof} type="text" label="Proficiency Bonus" value={this.state.prof} onChange={this.handleChange.bind(this, "prof")} placeholder={this.props.character['charProficiencyBonus']['score']}/>
        <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success" onClick={this.handleOk}>Save</Button>
        </ButtonToolbar>
      </div>
    );
  }
})

module.exports = SettingsAbilities;