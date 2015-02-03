var React = require('react');
var Glyphicon = require('react-bootstrap/Glyphicon');
var Accordion = require('react-bootstrap/Accordion');
var Panel = require('react-bootstrap/Panel');
var Input = require('react-bootstrap/Input');

var Attack = React.createClass({
  displayName : "Attack",
  getInitialState : function() {
    return ({
      prof : false,
      abil : "str"
    });
  },
  handleProficient : function(e) {
    this.setState({ prof : e.target.checked });
  },
  handleSelectAttack : function(e) {
    this.setState({ abil : e.target.value });
  },
  handleSelectSpell : function(e) {
    
  },
  render : function() {

    var bonus = this.props.character['charAbilities'][this.state.abil]['mod'];
    var prof = this.props.character['charProficiencyBonus']['score'];

    if (this.state.prof) {
      bonus += prof;
    }

    return (
      <div className="container-fluid">
        <h3>{"Attacks"}</h3>
        <Accordion defaultActiveKey="">
          <Panel header="AttackBonus" eventKey="1">
            <Input type="select" label='Ability Mod' defaultValue="str" onChange={this.handleSelectAttack}>
              <option value="str">str</option>
              <option value="dex">dex</option>
              <option value="con">con</option>
              <option value="int">int</option>
              <option value="wis">wis</option>
              <option value="cha">cha</option>
            </Input>
            <Input type="checkbox" label="Proficient" onChange={this.handleProficient} />
          </Panel>
          <Panel header="SpellDC" eventKey="2">
            <Input type="select" label='Ability Mod' defaultValue="str" onChange={this.handleSelectSpell}>
              <option value="str">str</option>
              <option value="dex">dex</option>
              <option value="con">con</option>
              <option value="int">int</option>
              <option value="wis">wis</option>
              <option value="cha">cha</option>
            </Input>
          </Panel>
        </Accordion>
        <Panel>
          <p className="text-center">{"Attack Damage Bonus"}</p>
          <h3 className="BOOM text-center">{bonus}</h3>
        </Panel>
        <Accordion defaultActiveKey="">
          <Panel header="Punching" eventKey='1'>
            <p>{"Punch a dude. Right in the mouth! Kapow!"}</p>
          </Panel>
          <Panel header="Kick-a-Pow" eventKey='2'>
            <p>{"Fly your foot into the dude's face. +2 damage to insult and +4 damage to injury."}</p>
          </Panel>
        </Accordion>
      </div>
    )
  }
})

module.exports = Attack;