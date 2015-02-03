var React = require('react');
var Glyphicon = require('react-bootstrap/Glyphicon');
var Accordion = require('react-bootstrap/Accordion');
var Panel = require('react-bootstrap/Panel');
var ProgressBar = require('react-bootstrap/ProgressBar');
var Input = require('react-bootstrap/Input');
var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var Button = require('react-bootstrap/Button');

var Defense = React.createClass({
  displayName : "CharDefenses",
  render : function() {
    var curr = this.props.character['charHitPoints']['current'];
    var max  = this.props.character['charHitPoints']['maximum'];
    var hpPercent = Math.floor(curr / max) * 100;
    var hpStyle = "success";

    if (curr <= (max / 4)) {
      hpStyle = "danger";
    }
    else if (curr <= (max / 2)) {
      hpStyle = "warning";
    }

    return (
      <div className="container-fluid">
        <h3>{"Defenses"}</h3>
        <ProgressBar bsStyle={hpStyle} label={curr + " / " + max} now={hpPercent} />

        <Panel className="text-center">
          <Grid fluid>
            <Row>
              <Col xs={12}>
                <div className="card">
                  <p>Armor Class</p>
                  <h3>{this.props.character['charArmorClass']['score']}</h3>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <div className="card">
                  <p>Initiative</p>
                  <h3>{this.props.character['charInitiative']['score']}</h3>
                </div>
              </Col>
              <Col xs={4}><div></div></Col>
              <Col xs={4}>
                <div className="card">
                  <p>Speed</p>
                  <h3>{this.props.character['charSpeed']['score']}</h3>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <div>
                  <p>Hit Dice</p>
                  <h3>{this.props.character['charHitPoints']['hitDiceTotal']}</h3>
                </div>
              </Col>
            </Row>
          </Grid>
        </Panel>


        <h3>{"Saving Throws"}</h3>
        <Panel className="text-center">
          <Grid fluid>
            <Row>
              <Col xs={4}>
                <div className="card">
                  <p>STR</p>
                  <h3 className={(this.props.character['charSavingThrows']['str']['proficient'] === true) ? "trained" : ""}>{this.props.character['charSavingThrows']['str']['score']}</h3>
                </div>
              </Col>
              <Col xs={4}>
                <div className="card">
                  <p>DEX</p>
                  <h3 className={(this.props.character['charSavingThrows']['dex']['proficient'] === true) ? "trained" : ""}>{this.props.character['charSavingThrows']['dex']['score']}</h3>
                </div>
              </Col>
              <Col xs={4}>
                <div className="card">
                  <p>CON</p>
                  <h3 className={(this.props.character['charSavingThrows']['con']['proficient'] === true) ? "trained" : ""}>{this.props.character['charSavingThrows']['con']['score']}</h3>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <div className="card">
                  <p>INT</p>
                  <h3 className={(this.props.character['charSavingThrows']['int']['proficient'] === true) ? "trained" : ""}>{this.props.character['charSavingThrows']['int']['score']}</h3>
                </div>
              </Col>
              <Col xs={4}>
                <div className="card">
                  <p>WIS</p>
                  <h3 className={(this.props.character['charSavingThrows']['wis']['proficient'] === true) ? "trained" : ""}>{this.props.character['charSavingThrows']['wis']['score']}</h3>
                </div>
              </Col>
              <Col xs={4}>
                <div className="card">
                  <p>CHA</p>
                  <h3 className={(this.props.character['charSavingThrows']['cha']['proficient'] === true) ? "trained" : ""}>{this.props.character['charSavingThrows']['cha']['score']}</h3>
                </div>
              </Col>
            </Row>
          </Grid>
        </Panel>
      </div>
    );
  }
})

module.exports = Defense;