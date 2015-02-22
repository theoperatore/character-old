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

    var skills = [];
    var skillNames = Object.keys(this.props.character['charSkills']);
    for (var i = 0, j = 1; j < skillNames.length; j+=2, i+=2) {
      var sk1 = skillNames[i];
      var sk2 = skillNames[j];
      var skill1 = this.props.character['charSkills'][sk1];
      var skill2 = this.props.character['charSkills'][sk2];

      skills.push(
        <Row key={i}>
          <Col xs={6}>
            <div className="card">
              <p>{sk1}</p>
              <h3 className={(skill1.trained === true) ? "trained" : ""}>{skill1.score}</h3>
            </div>
          </Col>
          <Col xs={6}>
            <div className="card">
              <p>{sk2}</p>
              <h3 className={(skill2.trained === true) ? "trained" : ""}>{skill2.score}</h3>
            </div>
          </Col>
        </Row>
      )
    }

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
                    <h3 className="bg-success">{this.props.character['charAbilities']['str']['mod']}</h3>
                    <p>{this.props.character['charAbilities']['str']['score']}</p>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="card">
                    <p>DEX</p>
                    <h3 className="bg-success">{this.props.character['charAbilities']['dex']['mod']}</h3>
                    <p>{this.props.character['charAbilities']['dex']['score']}</p>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="card">
                    <p>CON</p>
                    <h3 className="bg-success">{this.props.character['charAbilities']['con']['mod']}</h3>
                    <p>{this.props.character['charAbilities']['con']['score']}</p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={4}>
                  <div className="card">
                    <p>INT</p>
                    <h3 className="bg-success">{this.props.character['charAbilities']['int']['mod']}</h3>
                    <p>{this.props.character['charAbilities']['int']['score']}</p>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="card">
                    <p>WIS</p>
                    <h3 className="bg-success">{this.props.character['charAbilities']['wis']['mod']}</h3>
                    <p>{this.props.character['charAbilities']['wis']['score']}</p>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="card">
                    <p>CHA</p>
                    <h3 className="bg-success">{this.props.character['charAbilities']['cha']['mod']}</h3>
                    <p>{this.props.character['charAbilities']['cha']['score']}</p>
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
                    <h3 className="trained">{this.props.character['charProficiencyBonus']['score']}</h3>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="card">
                    <p>Passive Perception</p>
                    <h3>{this.props.character['charPassivePerception']['score']}</h3>
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
              {skills}
            </Grid>
          </Panel>
        </div>
      </HatchGroup>
    );
  }
})

module.exports = Ability;