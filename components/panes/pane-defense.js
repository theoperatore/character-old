var React = require('react');
var HelpTooltip = require('../tooltips/help');
var RestConfig = require('../popovers/rest');
var SettingsDefenses = require('../settings/settings-defenses');
var SettingsThrows = require('../settings/settings-saving-throws');
var SettingsResistances = require('../settings/settings-resistances');
var HatchGroup = require('../hatch/HatchGroup');
var Hatch = require('../hatch/Hatch');
var Panel3d = require('../hatch/Panel3d');

var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Accordion = require('react-bootstrap/lib/Accordion');
var Panel = require('react-bootstrap/lib/Panel');
var ProgressBar = require('react-bootstrap/lib/ProgressBar');
var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
var Popover = require('react-bootstrap/lib/Popover');
var Tooltip = require('react-bootstrap/lib/Tooltip');
var Input = require('react-bootstrap/lib/Input');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');

var Defense = React.createClass({
  displayName : "CharDefenses",
  getInitialState : function() {
    return ({
      hpOpen : 0,
      temp : "",
      dmg : ""
    });
  },
  toggle : function(idx) {
    this.refs.settings.toggle(idx);
  },
  toggleHP : function() {
    this.setState({ hpOpen : ((this.state.hpOpen === 0) ? 1 : 0) });
  },
  toggleRest : function() {
    this.refs['rest-popover'].toggle();
  },
  handleHPInput : function(cmp, e) {
    var node = {};
    node[cmp] = e.target.value;
    this.setState(node);
  },
  handleDeathSaves : function(cmp, e) {
    var tmp = this.props.character;
    var path = "charDefenses." + cmp + ".total.";
    if (cmp === "successes") {
      if (e.target.checked) {
        tmp['charHitPoints']['deathSaves']['successes'] += 1;
      }
      else {
        tmp['charHitPoints']['deathSaves']['successes'] -= 1;
      }

      path += tmp['charHitPoints']['deathSaves']['successes'];
    }
    else if (cmp === "failures") {
      if (e.target.checked) {
        tmp['charHitPoints']['deathSaves']['failures'] += 1;
      }
      else {
        tmp['charHitPoints']['deathSaves']['failures'] -= 1;
      }

      path += tmp['charHitPoints']['deathSaves']['failures'];
    }

    this.props.edit({ path : path, character : tmp });
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
      data['charHitPoints']['temporary'] = temp;
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

    var resistances = [];
    this.props.character['charResistances'].forEach(function(res, i) {
      resistances.push(
        <Panel3d key={"res" + i} title={res.name} className="list-header">
          <p>{res.desc}</p>
        </Panel3d>
      );
    });

    var successes = [];
    var failures = [];
    for (var i = 0; i < 3; i++) {
      var checked = i < this.props.character['charHitPoints']['deathSaves']['successes'];
      successes.push(
        <Col key={"successes" + i} xs={4}><input onChange={this.handleDeathSaves.bind(this, "successes")}  checked={checked} className="chkbox-lg" type="checkbox" /></Col>
      );
    }

    for (var i = 0; i < 3; i++) {
      var checked = i < this.props.character['charHitPoints']['deathSaves']['failures'];
      failures.push(
        <Col key={"failures" + i} xs={4}><input onChange={this.handleDeathSaves.bind(this, "failures")} checked={checked} className="chkbox-lg" type="checkbox" /></Col>
      );
    }

    return (
      <HatchGroup ref="settings">
        <div className="hatch-cover">
          <h3>
            {"Defenses"}
            <Button className="no-border" onClick={this.toggle.bind(this, "def0")}><Glyphicon glyph="cog"/></Button>

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
        </div>
        <Hatch eventKey={"def0"}>
          <SettingsDefenses character={this.props.character} edit={this.props.edit}/>
        </Hatch>
        <div className="hatch-cover">
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
                <Col xs={4}>
                  <OverlayTrigger ref={"rest-popover"} placement={"bottom"} trigger={'manual'} overlay={
                    <Popover title={"Take a Rest"}>
                      <RestConfig close={this.toggleRest} character={this.props.character} edit={this.props.edit}/>
                    </Popover>
                  }>
                    <div className="card">
                      <p>Rest</p>
                      <Button className="btn-rest no-border" onClick={this.toggleRest}><Glyphicon glyph="tent" /></Button>
                    </div>
                  </OverlayTrigger>
                </Col>
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
                    <p>{this.props.character['charHitPoints']['hitDiceCurrent']} / {this.props.character['charInfo']['level']}</p>
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
                      {successes}
                    </Row>
                  </Grid>
                </Col>
                <Col xs={6}>
                  <Grid fluid>
                    <Row className="no-padding">
                      {failures}
                    </Row>
                  </Grid>
                </Col>
              </Row>
            </Grid>
          </Panel>


          <h3>{"Saving Throws"} <Button className="no-border" onClick={this.toggle.bind(this, "def1")}><Glyphicon glyph="cog"/></Button></h3>
        </div>
        <Hatch eventKey={"def1"}>
          <SettingsThrows character={this.props.character} edit={this.props.edit}/>
        </Hatch>
        <div className="hatch-cover">
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
          <h3>{"Resistances"} <Button className="no-border" onClick={this.toggle.bind(this, "res0")}><Glyphicon glyph="cog"/></Button></h3>
        </div>
        <Hatch eventKey={"res0"}>
          <SettingsResistances character={this.props.character} edit={this.props.edit} />
        </Hatch>
        <div className="hatch-cover">
          {resistances}
        </div>
      </HatchGroup>
    );
  }
})

module.exports = Defense;