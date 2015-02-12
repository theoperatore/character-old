
var React = require('react');
var HelpTooltip = require('./tooltips/help');

var Glyphicon = require('react-bootstrap/Glyphicon');
var Accordion = require('react-bootstrap/Accordion');
var Panel = require('react-bootstrap/Panel');
var ProgressBar = require('react-bootstrap/ProgressBar');
var OverlayTrigger = require('react-bootstrap/OverlayTrigger');
var Tooltip = require('react-bootstrap/Tooltip');
var Input = require('react-bootstrap/Input');
var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var Button = require('react-bootstrap/Button');

var Defense = React.createClass({
  displayName : "CharDefenses",
  getInitialState : function() {
    return ({
      hpOpen : 0,
      temp : "",
      dmg : ""
    });
  },
  toggleHP : function() {
    this.setState({ hpOpen : ((this.state.hpOpen === 0) ? 1 : 0) });
  },
  handleHPInput : function(cmp, e) {
    var node = {};
    node[cmp] = e.target.value;
    this.setState(node);
  },
  handleHP : function(mode) {
    var data = this.props.character;
    var path = "charDefenses.";
    var amount = parseInt(this.state.dmg, 10);
    var temp = parseInt(this.state.temp, 10);
    var diff;

    if (mode === "heal") {

      if (isNaN(amount)) return;

      path += "hpHeal." + amount;
      data['charHitPoints']['current'] = 
        (data['charHitPoints']['current'] + amount >= data['charHitPoints']['maximum'])
        ? data['charHitPoints']['maximum']
        : data['charHitPoints']['current'] + amount;
    }
    else if (mode === "dmg") {

      if (isNaN(amount)) return;

      path += "hpDamage." + amount;
      if (data['charHitPoints']['temporary'] !== 0) {
        diff = data['charHitPoints']['temporary'] - amount;

        if (diff < 0) {
          data['charHitPoints']['temporary'] = 0;
          data['charHitPoints']['current'] += diff;         
        }
        else if (diff >= 0) {
          data['charHitPoints']['temporary'] = diff;
        }
      }
      else {
        data['charHitPoints']['current'] -= amount;
      }
    }
    else if (mode === "temp") {
      if (isNaN(temp)) return;

      path += "tempHP." + temp;
      data['charHitPoints']['temporary'] += temp;
    }
    else if (mode === "clear") {

      path += "tempHP.clear";
      data['charHitPoints']['temporary'] = 0;

    }

    this.props.edit({ path : path, character : data });
    this.setState({ dmg : "", temp : "", hpOpen : 0 });
  },
  handleHelpToggle : function() {
    this.refs.help.toggle();
  },
  render : function() {
    var curr = this.props.character['charHitPoints']['current'];
    var max  = this.props.character['charHitPoints']['maximum'];
    var temp = this.props.character['charHitPoints']['temporary'];
    var hpPercent = Math.floor((curr / max) * 100);
    var tempPercent = Math.floor((temp / max) * 100);
    var hpStyle = "success";
    var showhp = (this.state.hpOpen === true) ? "" : " hide";
    var heal;
    var dmg;
    var tempHeal;
    var clear;

    if (curr <= (max / 4)) {
      hpStyle = "danger";
    }
    else if (curr <= (max / 2)) {
      hpStyle = "warning";
    }

    heal = (
      <Button onClick={this.handleHP.bind(this, "heal")}>Heal</Button>
    );

    dmg = (
      <Button onClick={this.handleHP.bind(this, "dmg")}>Dmg</Button>
    );

    tempHeal = (
      <Button onClick={this.handleHP.bind(this, "temp")}>Add</Button>
    );

    clear = (
      <Button onClick={this.handleHP.bind(this, "clear")}>Clear</Button>
    );

    return (
      <div className="container-fluid">
        <h3>
          {"Defenses"}
          <Button className="no-border"><Glyphicon glyph="cog"/></Button>

          <OverlayTrigger ref="help" placement="bottom" trigger="manual" overlay={
            <Tooltip>
              <HelpTooltip close={this.handleHelpToggle}>
                <p>{"Tap on the health bar to change current, maximum, and temporary values."}</p>
              </HelpTooltip>
            </Tooltip>
          }>
            <Button className="no-border" onClick={this.handleHelpToggle}>
              <Glyphicon glyph="question-sign"/>
            </Button>
          </OverlayTrigger>
        </h3>

        <ProgressBar onClick={this.toggleHP}>
          <ProgressBar bsStyle="info" label={temp + " temp"} now={tempPercent} key={1}/>
          <ProgressBar bsStyle={hpStyle} label={curr + " / " + max} now={hpPercent} key={2}/>
        </ProgressBar>
        
        <Accordion activeKey={this.state.hpOpen}>
          <Panel className="no-padding" eventKey={1}>
            <Input type="text" value={this.state.dmg} placeholder="damage taken / hp healed" onChange={this.handleHPInput.bind(this, "dmg")} buttonBefore={dmg} buttonAfter={heal}/>
            <Input type="text" value={this.state.temp} placeholder="temporary hps" onChange={this.handleHPInput.bind(this, "temp")} buttonBefore={clear} buttonAfter={tempHeal} />
          </Panel>
        </Accordion>

        <Panel className="text-center">
          <Grid fluid>
            <Row>
              <Col xs={12}>
                <div className="card">
                  <p>Armor Class</p>
                  <h3 className="shield">{this.props.character['charArmorClass']['score']}</h3>
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

        <Panel>
          <Grid fluid>
            <Row className="text-center">
              <Col xs={6}>
                <p><strong>successes</strong></p>
              </Col>
              <Col xs={6}>
                <p><strong>failures</strong></p>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Grid fluid>
                  <Row className="no-padding">
                    <Col xs={4}><input className="chkbox-lg" type="checkbox" /></Col>
                    <Col xs={4}><input className="chkbox-lg" type="checkbox" /></Col>
                    <Col xs={4}><input className="chkbox-lg" type="checkbox" /></Col>
                  </Row>
                </Grid>
              </Col>
              <Col xs={6}>
                <Grid fluid>
                  <Row className="no-padding">
                    <Col xs={4}><input className="chkbox-lg" type="checkbox" /></Col>
                    <Col xs={4}><input className="chkbox-lg" type="checkbox" /></Col>
                    <Col xs={4}><input className="chkbox-lg" type="checkbox" /></Col>
                  </Row>
                </Grid>
              </Col>
            </Row>
          </Grid>
        </Panel>


        <h3>{"Saving Throws"} <Button className="no-border"><Glyphicon glyph="cog"/></Button></h3>
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