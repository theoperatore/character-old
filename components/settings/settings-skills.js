var React = require('react');

var Input = require('react-bootstrap/lib/Input');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Button = require('react-bootstrap/lib/Button');

var SettingsAbilities = React.createClass({
  getInitialState : function() {
    var state = {};

    state.bonus = "";
    state.bonuserror = false;
    state.idx = -1;

    return (state);
  },
  toggle : function() {
    this.props.hatchToggle();
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
    var path = "charSkills.bonuses.";

    if (this.state.idx === -1) return;

    // only handle bonuses
    if (this.state.idx === "passive") {
      if (this.state.bonuserror) return;
      
      tmp = tmp.setIn(['charPassivePerception', 'bonus'], this.state.bonus);
      path += "passivePerceptionBonus." + this.state.bonus;
    }
    else if (this.state.idx !== -1) {
      if (this.state.bonuserror) return;

      tmp = tmp.updateIn('charSkills', function(skills) {
        return skills.update(this.state.idx, function(skill) {
          return skill.set('bonus', this.state.bonus);

        }, this)
      }, this)
    }

    this.props.edit({ path : path, character : tmp });
    this.clearState();
  },
  handleProfSelect : function(idx, e) {
    var tmp = this.props.character;
    var path = "charSkills.proficient.";
    
    tmp = tmp.update('charSkills', function(skills) {
      return skills.update(idx, function(skill) {
        path += skill.get('name');
        return skill.set('trained', e.target.checked);
      })
    })

    this.props.edit({ path : path, character : tmp });
  },
  render : function() {

    var validbonus = (this.state.bonuserror) ? "error" : "success";

    // loop through skills to make options
    var skillSelect = [];
    this.props.character.get('charSkills').forEach(function(skill, i) {
      var checked = skill.get('trained');

      skillSelect.push(
        <Input key={i} type="checkbox" checked={checked} label={skill.get('name')} onChange={this.handleProfSelect.bind(this, i)} />
      );
    }, this);

    var skillOptions = [];
    this.props.character.get('charSkills').forEach(function(skill, i) {
      skillOptions.push(
        <option key={i} value={i}>{skill.get('name')}</option>
      );
    });

    return (
      <div className="settings-tear">
        <h3>{"Edit Skills"}</h3>
        <p>{"Select which skills for which you are proficient."}</p>
        <div className="multiselect-checkboxes">
          {skillSelect}
        </div>
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
      </div>
    );
  }
})

module.exports = SettingsAbilities;