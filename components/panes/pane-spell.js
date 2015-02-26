var React = require('react');

var AttackConfig = require('../popovers/attack-bonus');
var HelpTooltip = require('../tooltips/help');
var SettingsSpells = require('../settings/settings-spells');
var HatchGroup = require('../hatch/HatchGroup');
var Hatch = require('../hatch/Hatch');
var Panel3d = require('../hatch/Panel3d');

var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Accordion = require('react-bootstrap/lib/Accordion');
var Panel = require('react-bootstrap/lib/Panel');
var Input = require('react-bootstrap/lib/Input');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
var Popover = require('react-bootstrap/lib/Popover');
var Modal = require('react-bootstrap/lib/Modal');
var Button = require('react-bootstrap/lib/Button');
var Tooltip = require('react-bootstrap/lib/Tooltip');
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');

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
  handlePrepareSpell : function(level, idx, e) {
    var tmp = this.props.character;
    var path = "charSpells.prepare.";

    tmp = tmp.updateIn(['charSpells', level, 'spells', idx], function(spell) {
      path += spell.get('name') + "." + e.target.checked;
      return spell.set('prepared', e.target.checked);
    });

    this.props.edit({ path : path, character : tmp });

    //e.preventDefault();
    //e.stopPropagation();
  },
  handleToggle : function(idx) {
    this.refs.settings.toggle(idx);
  },
  handleCharge : function(level, e) {
    var tmp = this.props.character;
    var path = "charSpells.slots.used.total.";
    var curr = tmp.getIn(['charSpells', level, 'used']);

    if (e.target.checked) {
      //tmp['charSpells'][level]['used'] += 1;
      tmp = tmp.setIn(['charSpells', level, 'used'], (curr + 1));
      path += curr + 1;
    }
    else {
      //tmp['charSpells'][level]['used'] -= 1;
      tmp = tmp.setIn(['charSpells', level, 'used'], (curr - 1));
      path += curr - 1;
    }
    
    this.props.edit({ path : path, character : tmp });
  },
  render : function() {
    var prof = this.props.character.getIn(['charProficiencyBonus', 'score']);

    // build spell slots
    var spellSlots = [];
    this.props.character.get('charSpells').forEach(function(level, i) {
      
      // only show spell levels with slots...
      if (level.get('slots') !== 0) {
        var slots = [];
        for (var j = 0; j < level.get('slots'); j++) {
          var checked = j < level.get('used');
          slots.push(
            <Col key={j} xs={1}><input className="chkbox-lg" checked={checked} onChange={this.handleCharge.bind(this, i)} type="checkbox" /></Col>
          ); 
        }

        spellSlots.push(
          <Panel key={i}>
            <div className="slots">
              <p>{level.get('name') + " Level Spell Slots"}</p>
              <Grid fluid>
                <Row>
                  {slots}
                </Row>
              </Grid>
            </div>
          </Panel>
        );
      }
    }, this)

    // build list of spells
    var spells = [];
    this.props.character.get('charSpells').forEach(function(level, i) {
      if (level.get('spells').size !== 0) {

        // get each spell
        var sps = [];
        level.get('spells').forEach(function(spell, j) {
          var checked = spell.get('prepared');
          var title = (
            <div>
              <input type="checkbox" checked={checked} onChange={this.handlePrepareSpell.bind(this, i, j)} className={"prepared-checkbox" + (i === 0 ? " hide" : "") } />
              <span>{spell.get('name')}</span>
            </div>
          );

          sps.push(
            <Panel3d key={j} className={"list-header" + (checked ? " prepared" : "")} title={title}>
              <p><strong>{"CT:"}</strong>{"  " +  spell.get('cast')}</p>
              <p><strong>{"R:"}</strong>{"    " + spell.get('range')}</p>
              <p><strong>{"CMP:"}</strong>{" " +  spell.get('cmp')}</p>
              <p><strong>{"DUR:"}</strong>{" " +  spell.get('dur')}</p>
              <p>{spell.get('desc')}</p>
            </Panel3d>
          );
        }, this);

        // put it all together
        spells.push(
          <Panel3d key={i} title={level.get('name') + ((i !== 0) ?  " Level" : "")}>
            {sps}
          </Panel3d>
        );
      }
    }, this);

    // add in spell attack bonus bubbles
    var bubbles = [];
    this.props.preferences.get('spellBubbles').forEach(function(bubble, i) {
      var bonus = this.props.character.getIn(['charAbilities', bubble.get('abil'), 'mod']);
      bonus += (bubble.get('prof') === true) ? prof : 0;

      bubbles.push(
        <OverlayTrigger key={i} ref={"trigger" + i} trigger="manual" placement="bottom" overlay={
          <Popover title="Spell Attack Bonus Config">
            <AttackConfig pane="CharSpells" configName="spellBubbles" close={this.handleConfigToggle.bind(this, "trigger" + i)} idx={i} bubble={bubble} edit={this.props.editPreferences} preferences={this.props.preferences}/>
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
    }.bind(this));
  
  
    //
    // TODO: clean this whole function up
    //
    var bonus = this.props.character.getIn(['charAbilities', this.props.preferences.getIn(['spellDC', 0, 'abil']), 'mod']);
    bonus += (this.props.preferences.getIn(['spellDC', 0, 'prof']) === true) ? prof : 0;
    bonus += 8;
    var spelldc = (
      <OverlayTrigger ref={"dc"} trigger="manual" placement="bottom" overlay={
        <Popover title="Spell Save DC Config">
          <AttackConfig hidecontrols pane="CharSpells" configName="spellDC" close={this.handleDCConfigToggle} idx={0} bubble={this.props.preferences.getIn(['spellDC', 0])} edit={this.props.editPreferences} preferences={this.props.preferences}/>
        </Popover>
      }>
        <Row>
          <Col className="no-padding" xs={5}>
            <div className="bonus-container">
              <h3 onClick={this.handleDCConfigToggle} className={"bonus text-center" + ((this.props.preferences.getIn(['spellDC', 0, 'prof']) === true) ? " trained" : "")}>{bonus}</h3>
            </div>
          </Col>
          <Col className="no-padding" xs={7}>
            <p className="bonus-desc">{this.props.preferences.getIn(['spellDC', 0, 'desc'])}</p>
            <p>{this.props.preferences.getIn(['spellDC', 0, 'abil']) + ((this.props.preferences.getIn(['spellDC', 0, 'prof']) === true) ? " + prof" : "")}</p>
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
          {spellSlots}
          {spells}
        </div>
      </HatchGroup>
    );
  }
})

module.exports = Spells;