var React = require('react');
var SettingsAbility = require('../settings/settings-abilities');
var SettingsSkills = require('../settings/settings-skills');

var HatchGroup = require('../hatch/HatchGroup');
var Hatch = require('../hatch/Hatch');

var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Accordion = require('react-bootstrap/lib/Accordion');
var Panel = require('react-bootstrap/lib/Panel');
var Input = require('react-bootstrap/lib/Input');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Popover = require('react-bootstrap/lib/Popover');
var Modal = require('react-bootstrap/lib/Modal');
var Button = require('react-bootstrap/lib/Button');

var Ability = React.createClass({
  displayName : "CharAbility",
  toggleSettings : function(idx) {
    this.refs.settings.toggle(idx);
  },
  render : function() {
    var prof = this.props.character.getIn(['charProficiencyBonus', 'score']);
    var abil = this.props.character.get('charAbilities');
    var passivePerception = 10;

    // loop through skills object -- the skill's score should pull mod from
    // relevent ability score and add in proficiency bonus if trained
    var skills = [];
    this.props.character.get('charSkills').forEach(function(skill, key) {
      var score = abil.get(skill.get('mod')).get('mod');
      
      score += skill.get('trained') ? prof : 0;
      score += skill.get('bonus');

      if (skill.get('name') === "Perception") {
        passivePerception += score;
        passivePerception += this.props.character.getIn(['charPassivePerception', 'bonus']);
      }

      skills.push(
        <Col key={key} xs={6}>
          <div className="card">
            <p>{skill.get('name') + " (" + skill.get('mod') + ")"}</p>
            <h3 className={(skill.get('trained') === true) ? "trained" : ""}>{score}</h3>
          </div>
        </Col>
      );
    }, this)

    return (
      <HatchGroup ref="settings">
        <div className="hatch-cover">
          <h3>{"Ability Scores"} <Button className="no-border" onClick={this.toggleSettings.bind(this, "abil0")}><Glyphicon glyph="cog"/></Button></h3>
        </div>
        <Hatch eventKey={"abil0"}>
          <SettingsAbility character={this.props.character} edit={this.props.edit} />
        </Hatch>
        <div className="hatch-cover">
          <Panel>
            <Grid fluid className="text-center">
              <Row>
                <Col xs={4}>
                  <div className="card">
                    <p>STR</p>
                    <h3 className="bg-success">{this.props.character.getIn(['charAbilities', 'str', 'mod'])}</h3>
                    <p>{this.props.character.getIn(['charAbilities', 'str','score'])}</p>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="card">
                    <p>DEX</p>
                    <h3 className="bg-success">{this.props.character.getIn(['charAbilities', 'dex','mod'])}</h3>
                    <p>{this.props.character.getIn(['charAbilities', 'dex','score'])}</p>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="card">
                    <p>CON</p>
                    <h3 className="bg-success">{this.props.character.getIn(['charAbilities', 'con','mod'])}</h3>
                    <p>{this.props.character.getIn(['charAbilities', 'con','score'])}</p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={4}>
                  <div className="card">
                    <p>INT</p>
                    <h3 className="bg-success">{this.props.character.getIn(['charAbilities', 'int','mod'])}</h3>
                    <p>{this.props.character.getIn(['charAbilities', 'int','score'])}</p>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="card">
                    <p>WIS</p>
                    <h3 className="bg-success">{this.props.character.getIn(['charAbilities', 'wis','mod'])}</h3>
                    <p>{this.props.character.getIn(['charAbilities', 'wis','score'])}</p>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="card">
                    <p>CHA</p>
                    <h3 className="bg-success">{this.props.character.getIn(['charAbilities', 'cha','mod'])}</h3>
                    <p>{this.props.character.getIn(['charAbilities', 'cha','score'])}</p>
                  </div>
                </Col>
              </Row>
            </Grid>
          </Panel>

          <Panel>
            <Grid fluid className="text-center">
              <Row> 
                <Col xs={6}>
                  <div className="card">
                    <p>Proficiency Bonus</p>
                    <h3 className="trained">{this.props.character.getIn(['charProficiencyBonus', 'score'])}</h3>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="card">
                    <p>Passive Perception</p>
                    <h3>{passivePerception}</h3>
                  </div>
                </Col>
              </Row>
            </Grid>
          </Panel>

          <h3>{"Skills"} <Button className="no-border" onClick={this.toggleSettings.bind(this, "abil1")}><Glyphicon glyph="cog"/></Button></h3>
        </div>
        <Hatch eventKey={"abil1"}>
          <SettingsSkills character={this.props.character} edit={this.props.edit} />
        </Hatch>
        <div className="hatch-cover">
          <Panel>
            <Grid fluid>
              <Row>
                {skills}
              </Row>
            </Grid>
          </Panel>
        </div>
      </HatchGroup>
    );
  }
})

module.exports = Ability;