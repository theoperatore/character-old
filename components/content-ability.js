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
    return (
      <div className="container-fluid">
        <h3>{"Ability Scores"}</h3>

        <Panel>
          <Grid fluid className="text-center">
            <Row>
              <Col xs={4}>
                <div className="card">
                  <p>STR</p>
                  <h3>{this.props.character['charAbilities']['str']['mod']}</h3>
                  <p>{this.props.character['charAbilities']['str']['score']}</p>
                </div>
              </Col>
              <Col xs={4}>
                <div className="card">
                  <p>DEX</p>
                  <h3>{this.props.character['charAbilities']['dex']['mod']}</h3>
                  <p>{this.props.character['charAbilities']['dex']['score']}</p>
                </div>
              </Col>
              <Col xs={4}>
                <div className="card">
                  <p>CON</p>
                  <h3>{this.props.character['charAbilities']['con']['mod']}</h3>
                  <p>{this.props.character['charAbilities']['con']['score']}</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <div className="card">
                  <p>INT</p>
                  <h3>{this.props.character['charAbilities']['int']['mod']}</h3>
                  <p>{this.props.character['charAbilities']['int']['score']}</p>
                </div>
              </Col>
              <Col xs={4}>
                <div className="card">
                  <p>WIS</p>
                  <h3>{this.props.character['charAbilities']['wis']['mod']}</h3>
                  <p>{this.props.character['charAbilities']['wis']['score']}</p>
                </div>
              </Col>
              <Col xs={4}>
                <div className="card">
                  <p>CHA</p>
                  <h3>{this.props.character['charAbilities']['cha']['mod']}</h3>
                  <p>{this.props.character['charAbilities']['cha']['score']}</p>
                </div>
              </Col>
            </Row>
          </Grid>
        </Panel>

        <h3>{"Skills"}</h3>
        <Panel>
          <Grid fluid className="text-center">
            <Row>
              <Col xs={4}>
                <div className={"card"}>
                  <p>Acrobatics</p>
                  <h3 className={(this.props.character['charSkills']['Acrobatics']["trained"] === true) ? "trained" : ""}>{this.props.character['charSkills']['Acrobatics']['score']}</h3>
                </div>
              </Col>
              <Col xs={4}>
                <div className={"card"}>
                  <p>Animal Handling</p>
                  <h3 className={(this.props.character['charSkills']['Animal Handling']["trained"] === true) ? "trained" : ""}>{this.props.character['charSkills']['Animal Handling']['score']}</h3>
                </div>
              </Col>
              <Col xs={4}>
                <div className={"card"}>
                  <p>Arcana</p>
                  <h3 className={(this.props.character['charSkills']['Arcana']["trained"] === true) ? "trained" : ""}>{this.props.character['charSkills']['Arcana']['score']}</h3>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <div className={"card"}>
                  <p>Athletics</p>
                  <h3 className={(this.props.character['charSkills']['Athletics']["trained"] === true) ? "trained" : ""}>{this.props.character['charSkills']['Athletics']['score']}</h3>
                </div>
              </Col>
              <Col xs={4}>
                <div className={"card"}>
                  <p>Deception</p>
                  <h3 className={(this.props.character['charSkills']['Deception']["trained"] === true) ? "trained" : ""}>{this.props.character['charSkills']['Deception']['score']}</h3>
                </div>
              </Col>
              <Col xs={4}>
                <div className={"card"}>
                  <p>History</p>
                  <h3 className={(this.props.character['charSkills']['History']["trained"] === true) ? "trained" : ""}>{this.props.character['charSkills']['History']['score']}</h3>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <div className={"card"}>
                  <p>Insight</p>
                  <h3 className={(this.props.character['charSkills']['Insight']["trained"] === true) ? "trained" : ""}>{this.props.character['charSkills']['Insight']['score']}</h3>
                </div>
              </Col>
              <Col xs={4}>
                <div className={"card"}>
                  <p>Intimidation</p>
                  <h3 className={(this.props.character['charSkills']['Intimidation']["trained"] === true) ? "trained" : ""}>{this.props.character['charSkills']['Intimidation']['score']}</h3>
                </div>
              </Col>
              <Col xs={4}>
                <div className={"card"}>
                  <p>Investigation</p>
                  <h3 className={(this.props.character['charSkills']['Investigation']["trained"] === true) ? "trained" : ""}>{this.props.character['charSkills']['Investigation']['score']}</h3>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <div className={"card"}>
                  <p>Medicine</p>
                  <h3 className={(this.props.character['charSkills']['Medicine']["trained"] === true) ? "trained" : ""}>{this.props.character['charSkills']['Medicine']['score']}</h3>
                </div>
              </Col>
              <Col xs={4}>
                <div className={"card"}>
                  <p>Nature</p>
                  <h3 className={(this.props.character['charSkills']['Nature']["trained"] === true) ? "trained" : ""}>{this.props.character['charSkills']['Nature']['score']}</h3>
                </div>
              </Col>
              <Col xs={4}>
                <div className={"card"}>
                  <p>Perception</p>
                  <h3 className={(this.props.character['charSkills']['Perception']["trained"] === true) ? "trained" : ""}>{this.props.character['charSkills']['Perception']['score']}</h3>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <div className={"card"}>
                  <p>Performance</p>
                  <h3 className={(this.props.character['charSkills']['Performance']["trained"] === true) ? "trained" : ""}>{this.props.character['charSkills']['Performance']['score']}</h3>
                </div>
              </Col>
              <Col xs={4}>
                <div className={"card"}>
                  <p>Persuasion</p>
                  <h3 className={(this.props.character['charSkills']['Persuasion']["trained"] === true) ? "trained" : ""}>{this.props.character['charSkills']['Persuasion']['score']}</h3>
                </div>
              </Col>
              <Col xs={4}>
                <div className={"card"}>
                  <p>Religion</p>
                  <h3 className={(this.props.character['charSkills']['Religion']["trained"] === true) ? "trained" : ""}>{this.props.character['charSkills']['Religion']['score']}</h3>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <div className={"card"}>
                  <p>Sleight of Hand</p>
                  <h3 className={(this.props.character['charSkills']['Sleight of Hand']["trained"] === true) ? "trained" : ""}>{this.props.character['charSkills']['Sleight of Hand']['score']}</h3>
                </div>
              </Col>
              <Col xs={4}>
                <div className={"card"}>
                  <p>Stealth</p>
                  <h3 className={(this.props.character['charSkills']['Stealth']["trained"] === true) ? "trained" : ""}>{this.props.character['charSkills']['Stealth']['score']}</h3>
                </div>
              </Col>
              <Col xs={4}>
                <div className={"card"}>
                  <p>Survival</p>
                  <h3 className={(this.props.character['charSkills']['Survival']["trained"] === true) ? "trained" : ""}>{this.props.character['charSkills']['Survival']['score']}</h3>
                </div>
              </Col>
            </Row>
          </Grid>
        </Panel>
      </div>
    );
  }
})

module.exports = Ability;