var React = require('react');
var Glyphicon = require('react-bootstrap/Glyphicon');
var Accordion = require('react-bootstrap/Accordion');
var Panel = require('react-bootstrap/Panel');
var Input = require('react-bootstrap/Input');
var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var Popover = require('react-bootstrap/Popover');
var Modal = require('react-bootstrap/Modal');
var Button = require('react-bootstrap/Button');

var Ability = React.createClass({
  displayName : "CharAbility",
  render : function() {

    var skills = [];
    var skillNames = Object.keys(this.props.character['charSkills']);
    skillNames.forEach(function(skillName, i) {
      var skill = this.props.character['charSkills'][skillName];
      skills.push(
        <Row key={i}>
          <Col xs={4}>
            <div className="circle text-center">
              <h4 className={((skill.trained === true) ? " trained" : "")}>{skill.score}</h4>
            </div>
          </Col>
          <Col xs={8}>
            <p className="card-description">{skillName}</p>
          </Col>
        </Row>
      );

    }.bind(this));

    return (
      <div className="container-fluid">
        <h3>{"Ability Scores"} <Button className="no-border"><Glyphicon glyph="cog"/></Button></h3>

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

        <h3>{"Skills"} <Button className="no-border"><Glyphicon glyph="cog"/></Button></h3>
        <Panel>
          <Grid fluid>
            {skills}
          </Grid>
        </Panel>
      </div>
    );
  }
})

module.exports = Ability;