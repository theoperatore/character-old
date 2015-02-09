var React = require('react');

var ModalAttack = require('./modals/modal-attack');
var AttackConfig = require('./popovers/attack-bonus');
var HelpTooltip = require('./tooltips/help');

var Glyphicon = require('react-bootstrap/Glyphicon');
var Accordion = require('react-bootstrap/Accordion');
var Panel = require('react-bootstrap/Panel');
var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var OverlayTrigger = require('react-bootstrap/OverlayTrigger');
var OverlayMixin = require('react-bootstrap/OverlayMixin');
var Tooltip = require('react-bootstrap/Tooltip');
var Popover = require('react-bootstrap/Popover');
var Button = require('react-bootstrap/Button');

var Attack = React.createClass({
  displayName : "CharAttack",
  mixins : [OverlayMixin],
  
  getInitialState : function() {
    return ({ toggle : false });
  },

  handleToggle : function() {
    this.setState({ toggle : !this.state.toggle });
  },

  handleConfigToggle : function(ref) {
    this.refs[ref].toggle();
  },

  handleHelpToggle : function() {
    this.refs['help'].toggle();
  },

  renderOverlay : function() {
    if (!this.state.toggle) return <span/>; 

    // show modal
    return (
      <ModalAttack close={this.handleToggle} character={this.props.character} edit={this.props.edit}/>
    );

  },
  render : function() {

    var charAttacks = this.props.character['charAttacks'];
    var prof = this.props.character['charProficiencyBonus']['score'];
    var attacks = [];
    var charges = [];
    var bubbles = [];

    // compile list of attacks
    charAttacks.forEach(function(attack, i) {
      attacks.push(
        <Panel className="no-padding" bsStyle="warning" key={i} header={attack.name} eventKey={i}>
            <p>{attack.desc}</p>
        </Panel>
      );
    }.bind(this));

    // render class charges
    this.props.character['charClassCharges'].forEach(function(resource, i) {
      var slots = [];

      for (var j = 0; j < resource['charges']; j++) {
        slots.push(
          <Col key={j} xs={1}><input type="checkbox" /></Col>
        );
      }

      charges.push(
        <Panel key={i}>
          <div className="slots">
            <p>{resource.name}</p>
            <Grid fluid>
              <Row>
                {slots}
              </Row>
            </Grid>
          </div>
        </Panel>
      );
    });


    // render attack bonus bubbles -- might have to think of something
    // different than using popovers
    this.props.preferences.atkBubbles.forEach(function(bubble, i) {
      var bonus = this.props.character['charAbilities'][bubble.abil]['mod'];
      bonus += (bubble.prof === true) ? prof : 0;

      bubbles.push(
        <Row key={i}>
          <Col xs={12}>
            <div className="container-fluid">
              <OverlayTrigger ref={"trigger" + i} placement="bottom" trigger="manual" overlay={
                <Popover title="Atk Bonus Config">
                  <AttackConfig pane="CharAttack" configName="atkBubbles" close={this.handleConfigToggle.bind(this, "trigger" + i)} idx={i} bubble={bubble} edit={this.props.editPreferences} preferences={this.props.preferences}/>
                </Popover>
              }>
                <div className="bonus-container">
                  <h3 onClick={this.handleConfigToggle.bind(this, "trigger" + i)} className={"bonus text-center" + ((bubble.prof === true) ? " trained" : "")}>{bonus}</h3>
                  <p className="bonus-desc">{bubble.desc}</p>
                  <p>{bubble.abil + ((bubble.prof === true) ? " + prof" : "")}</p>
                </div>
              </OverlayTrigger>
            </div>
          </Col>
        </Row>
      );

    }.bind(this));

    // render the component
    return (
      <div className="container-fluid">
        <h3>
          {"Attacks"} 
          <Button className="no-border" onClick={this.handleToggle}><Glyphicon glyph="cog"/></Button>
          <OverlayTrigger ref="help" placement="bottom" trigger="manual" overlay={
            <Tooltip>
              <HelpTooltip close={this.handleHelpToggle}>
                <p>{"Class points like 'Ki', 'Rage', or 'Sorcery' can be modified in 'Features' ("} <Glyphicon glyph="flash" /> {")"}</p>
                <p>{"Tap 'Attack Bonus' to configure the ability score it uses and if you have proficiency"}</p>
              </HelpTooltip>
            </Tooltip>
          }>
            <Button className="no-border" onClick={this.handleHelpToggle}>
              <Glyphicon glyph="question-sign"/>
            </Button>
          </OverlayTrigger>
        </h3>

        <Panel>
          <Grid fluid>
            <Row>
              {bubbles}
            </Row>
          </Grid>
        </Panel>

        {charges}

        <Accordion defaultActiveKey="">
          {attacks}
        </Accordion>
      </div>
    )
  }
})

module.exports = Attack;