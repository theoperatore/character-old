var React = require('react');

var AttackConfig = require('./popovers/attack-bonus');
var HelpTooltip = require('./tooltips/help');
var ModalSpell = require('./modals/modal-spell');

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
var Well = require('react-bootstrap/Well');

var Spells = React.createClass({
  displayName : "CharSpell",
  getInitialState : function() {
    var state = {};

    state.toggle = 0;

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
  handleToggle : function() {
    this.setState({ toggle : (this.state.toggle === 0) ? 1 : 0 });
  },
  render : function() {
    var prof = this.props.character['charProficiencyBonus']['score'];

    // build list of spells
    var spells = [];
    this.props.character['charSpells'].forEach(function(level, i) {
      if (level.spells.length !== 0) {
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
            <Panel key={j} eventKey={j} header={spell['name']}>
              <p><strong>{"CT:"}</strong>  {spell['cast']}</p>
              <p><strong>{"R:"}</strong>   {spell['range']}</p>
              <p><strong>{"CMP:"}</strong> {spell['cmp']}</p>
              <p><strong>{"DUR:"}</strong> {spell['dur']}</p>
              <p>{spell['desc']}</p>
            </Panel>
          );
        });

        // put it all together
        spells.push(
          <Panel bsStyle="warning" className="no-padding" key={i} eventKey={i} header={level['name'] + ((i !== 0) ?  " Level" : "")}>
            {slotsArea}
            <Accordion defaultActiveKey="">
              {sps}
            </Accordion>
          </Panel>
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
      <div className="container-fluid">
        <h3>{"Spells"} 
          <Button className="no-border" onClick={this.handleToggle}><Glyphicon glyph="cog"/></Button>
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

        <Accordion activeKey={this.state.toggle}>
          <Panel className="no-padding" eventKey={1}>
            <Well>
            <TabbedArea activeKey={0}>
            
              <TabPane eventKey={0} tab="new">
                <div className="container-fluid">
                  <h4>{"Add new spell"}</h4>
                  <Input type="text" label={"Name"}/>
                  <Input type="select" label={"Spell Level"} defaultSelected={-1}>
                    <option value={-1}>{"Spell Level"}</option>
                    <option value={0}>{"Cantrip"}</option>
                    <option value={1}>{"1st Level"}</option>
                    <option value={2}>{"2nd Level"}</option>
                    <option value={3}>{"3rd Level"}</option>
                    <option value={4}>{"4th Level"}</option>
                    <option value={5}>{"5th Level"}</option>
                    <option value={6}>{"6th Level"}</option>
                    <option value={7}>{"7th Level"}</option>
                    <option value={8}>{"8th Level"}</option>
                    <option value={9}>{"9th Level"}</option>
                  </Input>
                  <Input type="textarea" label={"Description"}/>
                  <Input type="text" label={"Components"}/>
                  <Input type="text" label={"Casting TIme"}/>
                  <Input type="text" label={"Duration"}/>
                </div>
              </TabPane>

              <TabPane eventKey={1} tab="edit">
                <div className="container-fluid">
                  <h4>{"Edit attack"}</h4>
                  <Input>
                    <Row>
                      <Col xs={8}>
                        <Input type="select" defaultSelected={-1}>
                          <option value={-1}>{"Select a Spell"}</option>
                        </Input>
                      </Col>
                      <Col xs={4}>
                        <Button disabled={true} bsStyle="danger">Delete</Button>
                      </Col>
                    </Row>
                  </Input>
                    

                </div>
              </TabPane>

              <TabPane eventKey={2} tab="slots">
                <div className="container-fluid">
                  <h4>{"Edit spell slots"}</h4>
                </div>
              </TabPane>

            </TabbedArea>
            <Button bsStyle="danger" onClick={this.handleToggle}>Close</Button>
            <Button bsStyle="success">Save</Button>
            </Well>
          </Panel>
        </Accordion>

        <Panel>
          {spelldc}
          {bubbles}
        </Panel>

        <Accordion defaultActiveKey="">
          {spells}
        </Accordion>
      </div>
    );
  }
})

module.exports = Spells;