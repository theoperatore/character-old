var React = require('react');

var AttackConfig = require('../popovers/attack-bonus');
var HelpTooltip = require('../tooltips/help');
var SettingsSpells = require('../settings/settings-spells');
var HatchGroup = require('../hatch/HatchGroup');
var Hatch = require('../hatch/Hatch');
var Panel3d = require('../hatch/Panel3d');

var Glyphicon = require('react-bootstrap/Glyphicon');
var Accordion = require('react-bootstrap/Accordion');
var Panel = require('react-bootstrap/Panel');
var Input = require('react-bootstrap/Input');
var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var OverlayTrigger = require('react-bootstrap/OverlayTrigger');
var Popover = require('react-bootstrap/Popover');
var Modal = require('react-bootstrap/Modal');
var Button = require('react-bootstrap/Button');
var Tooltip = require('react-bootstrap/Tooltip');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');

var Spells = React.createClass({
  displayName : "CharSpell",
  getInitialState : function() {
    var state = {};

    state.settings = 0;

    return (state);
  },
  handleConfigToggle : function(cmp) {
    this.refs[cmp].toggle();
  },
  handleDCConfigToggle : function() {
    this.refs.dc.toggle();
  },
  handleHelpToggle : function() {
    this.refs.help.toggle();
  },
  handleToggle : function(idx) {
    this.refs.settings.toggle(idx);
  },
  render : function() {
    var prof = this.props.character['charProficiencyBonus']['score'];

    // build list of spells
    var spells = [];
    this.props.character['charSpells'].forEach(function(level, i) {
      if (level.spells.length !== 0 || level.slots !== 0) {
        
        // get spell slots
        var slots = [];
        for (var k = 0; k < level.slots; k++) {
          slots.push(
            <Col key={k} xs={1}><input type="checkbox" /></Col>
          );
        }

        // if there are spell slots, draw them
        var slotsArea;
        if (slots.length !== 0) {
          slotsArea = (<div className="slots">
            <p>{"Spell Slots"}</p>
            <Grid fluid>
              <Row>
                {slots}
              </Row>
            </Grid>
          </div>);
        } 

        // get each spell
        var sps = [];
        level.spells.forEach(function(spell, j) {
          sps.push(
            <Panel3d key={j} className="list-header" title={spell['name']}>
              <p><strong>{"CT:"}</strong>  {spell['cast']}</p>
              <p><strong>{"R:"}</strong>   {spell['range']}</p>
              <p><strong>{"CMP:"}</strong> {spell['cmp']}</p>
              <p><strong>{"DUR:"}</strong> {spell['dur']}</p>
              <p>{spell['desc']}</p>
            </Panel3d>
          );
        });

        // put it all together
        spells.push(
          <Panel3d key={i} title={level['name'] + ((i !== 0) ?  " Level" : "")}>
            {slotsArea}
            {sps}
          </Panel3d>
        );
      }
    });

    // add in spell attack bonus bubbles
    var bubbles = [];
    this.props.preferences['spellBubbles'].forEach(function(bubble, i) {
      var bonus = this.props.character['charAbilities'][bubble.abil]['mod'];
      bonus += (bubble.prof === true) ? prof : 0;

      bubbles.push(
        <OverlayTrigger key={i} ref={"trigger" + i} trigger="manual" placement="bottom" overlay={
          <Popover title="Spell Attack Bonus Config">
            <AttackConfig pane="CharSpells" configName="spellBubbles" close={this.handleConfigToggle.bind(this, "trigger" + i)} idx={i} bubble={bubble} edit={this.props.editPreferences} preferences={this.props.preferences}/>
          </Popover>
        }>
          <Row>
            <Col className="no-padding" xs={5}>
              <div className="bonus-container">
                <h3 onClick={this.handleConfigToggle.bind(this, "trigger" + i)} className={"bonus text-center" + ((bubble.prof === true) ? " trained" : "")}>{bonus}</h3>
              </div>
            </Col>
            <Col className="no-padding" xs={7}>
              <p className="bonus-desc">{bubble.desc}</p>
              <p>{bubble.abil + ((bubble.prof === true) ? " + prof" : "")}</p>
            </Col>
          </Row>
        </OverlayTrigger>
      );
    }.bind(this));
  
  
    //
    // TODO: clean this whole function up
    //
    var bonus = this.props.character['charAbilities'][this.props.preferences.spellDC[0].abil]['mod'];
    bonus += (this.props.preferences.spellDC[0].prof === true) ? prof : 0;
    var spelldc = (
      <OverlayTrigger ref={"dc"} trigger="manual" placement="bottom" overlay={
        <Popover title="Spell Save DC Config">
          <AttackConfig hidecontrols pane="CharSpells" configName="spellDC" close={this.handleDCConfigToggle} idx={0} bubble={this.props.preferences.spellDC[0]} edit={this.props.editPreferences} preferences={this.props.preferences}/>
        </Popover>
      }>
        <Row>
          <Col className="no-padding" xs={5}>
            <div className="bonus-container">
              <h3 onClick={this.handleDCConfigToggle} className={"bonus text-center" + ((this.props.preferences.spellDC[0].prof === true) ? " trained" : "")}>{bonus + 8}</h3>
            </div>
          </Col>
          <Col className="no-padding" xs={7}>
            <p className="bonus-desc">{this.props.preferences.spellDC[0].desc}</p>
            <p>{this.props.preferences.spellDC[0].abil + ((this.props.preferences.spellDC[0].prof === true) ? " + prof" : "")}</p>
          </Col>
        </Row>
      </OverlayTrigger>
    );


    return (
      <HatchGroup ref="settings">
        <div className="hatch-cover">
          <h3>{"Spells"} 
            <Button className="no-border" onClick={this.handleToggle.bind(this, "spell0")}><Glyphicon glyph="cog"/></Button>
            <OverlayTrigger ref="help" placement="bottom" trigger="manual" overlay={
              <Tooltip>
                <HelpTooltip close={this.handleHelpToggle}>
                  <p>{"Tap the number to configure the ability score, if you have proficiency, and the name of the attack bonus and spell save dc"}</p>
                  <p>{"To edit spells and number of spell slots, tap the settings cog ("}<Glyphicon glyph="cog"/> {") next to 'Spells'"}</p>
                </HelpTooltip>
              </Tooltip>
            }>
              <Button className="no-border" onClick={this.handleHelpToggle}>
                <Glyphicon glyph="question-sign"/>
              </Button>
            </OverlayTrigger>
          </h3>
        </div>
        <Hatch eventKey={"spell0"}>
          <SettingsSpells character={this.props.character} edit={this.props.edit}/>
        </Hatch>
        <div className="hatch-cover">
          <Panel>
            {spelldc}
            {bubbles}
          </Panel>
          {spells}
        </div>
      </HatchGroup>
    );
  }
})

module.exports = Spells;