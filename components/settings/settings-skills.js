var React = require('react');
var Settings = require('./settings-tear');

var Input = require('react-bootstrap/Input');
var ButtonToolbar = require('react-bootstrap/ButtonToolbar');
var Button = require('react-bootstrap/Button');

var SettingsAbilities = React.createClass({
  getInitialState : function() {
    var state = {};

    state.profs = [];
    state.bonus = "";
    state.bonuserror = false;
    state.idx = -1;

    // default proficient
    Object.keys(this.props.character['charSkills']).forEach(function(skill,i) {
      var sk = this.props.character['charSkills'][skill]['trained'];
      if (sk === true) {
        state.profs.push(skill);
      }
    }.bind(this));

    console.log(state.profs);

    return (state);
  },
  toggle : function() {
    this.refs.settings.toggle();
  },
  clearState : function() {
    var state = {};

    state.bonus = "";
    state.bonuserror = false;
    state.idx = -1;

    this.setState(state);
  },
  handleSelect : function(e) {
    this.setState({ idx : e.target.value });
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
    var path = "charSkills.edit.";

    // handle bonuses first
    if (this.state.idx === "passive") {
      if (this.state.bonuserror) return;
      
      // to handle me editing the data model after it's been pushed to Firebase (i'm an idiot)
      tmp['charPassivePerception']['bonus'] = 
        (tmp['charPassivePerception']['bonus'] !== undefined)
        ? tmp['charPassivePerception']['bonus']
        : 0;

      tmp['charPassivePerception']['bonus'] = 
        (this.state.bonus === "")
        ? tmp['charPassivePerception']['bonus']
        : this.state.bonus;
    }
    else if (this.state.idx !== -1) {
      if (this.state.bonuserror) return;

      // to handle me editing the data model after it's been pushed to Firebase (i'm an idiot)
      tmp['charSkills'][this.state.idx]['bonus'] = 
        (tmp['charSkills'][this.state.idx]['bonus'] !== undefined)
        ? tmp['charSkills'][this.state.idx]['bonus']
        : 0;

      tmp['charSkills'][this.state.idx]['bonus'] = 
        (this.state.bonus === "")
        ? tmp['charSkills'][this.state.idx]['bonus']
        : this.state.bonus;
    }

    // handle proficient -- for right now, calculate new scores
    //                   -- later, should only mark proficient and bonus
    //                   -- in order for renderer to create score
    Object.keys(tmp['charSkills']).forEach(function(skillName) {
      var skill = tmp['charSkills'][skillName];
      skill.trained = false;
      for (var i = 0; i < this.state.profs.length; i++) {
        if (this.state.profs[i] === skillName) {
          skill.trained = true;
        }
      }

      var abil = tmp['charAbilities'][skill.mod]['mod'];
      var prof = tmp['charProficiencyBonus']['score'];

      skill.score = abil + ((skill.trained) ? prof : 0) + skill.bonus;
    }.bind(this));

    // update passive perception
    tmp['charPassivePerception']['score'] = 10
      + tmp['charSkills']['Perception']['score']
      + tmp['charPassivePerception']['bonus'];

    this.props.edit({ path : path, character : tmp });
    this.clearState();
  },
  handleProfSelect : function(e) {
    var sel = [];
    for(var i = 0; i < e.target.options.length; i++) {
      if (e.target.options[i].selected) {
        sel.push(e.target.options[i].value);
      }
    }
    console.log(sel);
    this.setState({ profs : sel });
  },
  render : function() {

    var validbonus = (this.state.bonuserror) ? "error" : "success";

    // loop through skills to make options
    var skillOptions = [];
    var profs = [];
    Object.keys(this.props.character['charSkills']).forEach(function(skill, i) {
      skillOptions.push(
        <option key={i} value={skill}>{skill}</option>
      );

      if (this.props.character['charSkills'][skill].trained) {
        profs.push(skill);
      }
    }.bind(this))

    return (
      <Settings ref="settings">
        <h3>{"Edit Skills"}</h3>
        <p>{"Select which skills for which you are proficient."}</p>
        <Input type="select" multiple value={(this.state.profs.length === 0) ? profs : this.state.profs} onChange={this.handleProfSelect}>
          {skillOptions}
        </Input>
        <p>{"If you have any extra bonuses to add to any skill, or passive perception, select the relevant skill and type the bonus."}</p>
        <Input type="select" value={this.state.idx} onChange={this.handleSelect}>
          <option value={-1}>{"Select a skill"}</option>
          <option value={"passive"}>{"Passive Perception"}</option>
          {skillOptions}
        </Input>
        <Input disabled={this.state.idx === -1 ? true : false} bsStyle={this.state.bonus === "" ? null : validbonus} type="text" label={"Extra Bonus"} placeholder={"Extra Bonus"} value={this.state.bonus} onChange={this.handleChange.bind(this, "bonus")} />
        <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success" onClick={this.handleOk}>Save</Button>
        </ButtonToolbar>
      </Settings>
    );
  }
})

module.exports = SettingsAbilities;