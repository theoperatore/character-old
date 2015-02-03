var React = require('react');
var Glyphicon = require('react-bootstrap/Glyphicon');
var Accordion = require('react-bootstrap/Accordion');
var Panel = require('react-bootstrap/Panel');
var Input = require('react-bootstrap/Input');
var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var OverlayTrigger = require('react-bootstrap/OverlayTrigger');
var Popover = require('react-bootstrap/Popover');

var Attack = React.createClass({
  displayName : "Attack",
  getInitialState : function() {
    return ({
      prof : false,
      abil : "str",
      spell: "wis"
    });
  },
  handleProficient : function(e) {
    this.setState({ prof : e.target.checked });
  },
  handleSelectAttack : function(e) {
    this.setState({ abil : e.target.value });
  },
  handleSelectSpell : function(e) {
    this.setState({ spell : e.target.value });
  },
  render : function() {

    var bonus = this.props.character['charAbilities'][this.state.abil]['mod'];
    var prof = this.props.character['charProficiencyBonus']['score'];
    var spell = this.props.character['charAbilities'][this.state.spell]['mod'];

    if (this.state.prof) {
      bonus += prof;
    }

    return (
      <div className="container-fluid">
        <h3>{"Attacks"}</h3>
        <Panel>
          <Grid fluid>
            <Row>
              <Col xs={6}>
                <p className="text-center">{"Attack Bonus"}</p>
                <OverlayTrigger trigger="click" placement="bottom" overlay={
                  <Popover title="Attack Bonus Config">
                    <Panel>
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
                  </Popover>
                }>
                  <h3 className="BOOM text-center">{bonus}</h3>
                </OverlayTrigger>
              </Col>
              <Col xs={6}>
                <p className="text-center">{"Spell DC"}</p>
                <OverlayTrigger trigger="click" placement="bottom" overlay={
                  <Popover title="Spell Save DC Config">
                    <Panel>
                      <Input type="select" label='Ability Mod' defaultValue="str" onChange={this.handleSelectSpell}>
                        <option value="str">str</option>
                        <option value="dex">dex</option>
                        <option value="con">con</option>
                        <option value="int">int</option>
                        <option value="wis">wis</option>
                        <option value="cha">cha</option>
                      </Input>
                    </Panel>
                  </Popover>
                }>
                  <h3 className="BOOM text-center">{8 + spell}</h3>  
                </OverlayTrigger>
              </Col>
            </Row>
          </Grid>
          
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