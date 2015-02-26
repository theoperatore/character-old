var React = require('react');

var SettingsAttack = require('../settings/settings-attacks');
var AttackConfig = require('../popovers/attack-bonus');
var HelpTooltip = require('../tooltips/help');
var HatchGroup = require('../hatch/HatchGroup');
var Hatch = require('../hatch/Hatch');
var Panel3d = require('../hatch/Panel3d');

var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Accordion = require('react-bootstrap/lib/Accordion');
var Panel = require('react-bootstrap/lib/Panel');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
var Tooltip = require('react-bootstrap/lib/Tooltip');
var Popover = require('react-bootstrap/lib/Popover');
var Button = require('react-bootstrap/lib/Button');

var Attack = React.createClass({
  displayName : "CharAttack",
  handleToggle : function(idx) {
    this.refs.settings.toggle(idx);
  },

  handleConfigToggle : function(ref) {
    this.refs[ref].toggle();
  },

  handleHelpToggle : function() {
    this.refs['help'].toggle();
  },

  handleCharge : function(chargeIdx, e) {
    var tmp = this.props.character;
    var path = "charClassCharges.used.total.";
    var curr = tmp.getIn(['charClassCharges', chargeIdx, 'used']);

    if (e.target.checked) {
      //tmp = tmp['charClassCharges'][chargeIdx]['used'] += 1;
      tmp = tmp.setIn(['charClassCharges', chargeIdx, 'used'], (curr + 1));
      path += curr + 1;
    }
    else {
      //tmp['charClassCharges'][chargeIdx]['used'] -= 1;
      tmp = tmp.setIn(['charClassCharges', chargeIdx, 'used'], (curr - 1));
      path += curr - 1;
    }
    
    this.props.edit({ path : path, character : tmp });
  },

  render : function() {
    var charAttacks = this.props.character.get('charAttacks');
    var prof = this.props.character.getIn(['charProficiencyBonus', 'score']);
    var attacks = [];
    var charges = [];
    var bubbles = [];

    // compile list of attacks
    charAttacks.forEach(function(attack, i) {
      attacks.push(
        <Panel3d className="list-header" key={i} title={attack.get('name')}>
            <p>{attack.get('desc')}</p>
        </Panel3d>
      );
    });

    // render class charges
    this.props.character.get('charClassCharges').forEach(function(resource, i) {
      var slots = [];

      for (var j = 0; j < resource.get('charges'); j++) {
        var checked = j < resource.get('used');

        slots.push(
          <Col key={j} xs={1}><input checked={checked} onChange={this.handleCharge.bind(this, i)} className="chkbox-lg" type="checkbox" /></Col>
        );
      }

      charges.push(
        <Panel key={i}>
          <div className="slots">
            <p>{resource.get('display')}</p>
            <Grid fluid>
              <Row>
                {slots}
              </Row>
            </Grid>
          </div>
        </Panel>
      );
    }.bind(this));


    // render attack bonus bubbles -- might have to think of something
    // different than using popovers
    this.props.preferences.get('atkBubbles').forEach(function(bubble, i) {
      var bonus = this.props.character.getIn(['charAbilities', bubble.get('abil'), 'mod']);
      bonus += (bubble.get('prof') === true) ? prof : 0;

      bubbles.push(
        <OverlayTrigger key={i} ref={"trigger" + i} placement="bottom" trigger="manual" overlay={
          <Popover title="Atk Bonus Config">
            <AttackConfig pane="CharAttack" configName="atkBubbles" close={this.handleConfigToggle.bind(this, "trigger" + i)} idx={i} bubble={bubble} edit={this.props.editPreferences} preferences={this.props.preferences}/>
          </Popover>
        }>
          <Row>
            <Col className="no-padding" xs={5}>
              <div className="bonus-container">
                <h3 onClick={this.handleConfigToggle.bind(this, "trigger" + i)} className={"bonus text-center" + ((bubble.get('prof') === true) ? " trained" : "")}>{bonus}</h3>
              </div>
            </Col>
            <Col className="no-padding" xs={7}>
              <p className="bonus-desc">{bubble.get('desc')}</p>
              <p>{bubble.get('abil') + ((bubble.get('prof') === true) ? " + prof" : "")}</p>
            </Col>
          </Row>
        </OverlayTrigger>
      );

    }, this);

    // render the component
    return (
      <HatchGroup ref="settings">
        <div className="hatch-cover">
          <h3>
            {"Attacks"} 
            <Button className="no-border" onClick={this.handleToggle.bind(this, "atk0")}><Glyphicon glyph="cog"/></Button>
            <OverlayTrigger ref="help" placement="bottom" trigger="manual" overlay={
              <Tooltip>
                <HelpTooltip close={this.handleHelpToggle}>
                  <p>{"Class charges like 'Ki', 'Rage', or 'Sorcery' can be modified in 'Features' ("} <Glyphicon glyph="flash" /> {")"}</p>
                  <p>{"Tap 'Attack Bonus' to configure the ability score it uses and if you have proficiency"}</p>
                </HelpTooltip>
              </Tooltip>
            }>
              <Button className="no-border" onClick={this.handleHelpToggle}>
                <Glyphicon glyph="question-sign"/>
              </Button>
            </OverlayTrigger>
          </h3>
        </div>
        <Hatch eventKey={"atk0"}>
          <SettingsAttack character={this.props.character} edit={this.props.edit}/>
        </Hatch>
        <div className="hatch-cover">
          <Panel>
            <Grid fluid>
              <Row>
                {bubbles}
              </Row>
            </Grid>
          </Panel>
          {charges}
          {attacks}
        </div>
      </HatchGroup>
    )
  }
})

module.exports = Attack;