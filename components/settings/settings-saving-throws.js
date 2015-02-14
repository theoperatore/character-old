var React = require('react');
var Settings = require('./settings-tear');

var Input = require('react-bootstrap/Input');
var ButtonToolbar = require('react-bootstrap/ButtonToolbar');
var Button = require('react-bootstrap/Button');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');

var SettingsSavingThrows = React.createClass({
  getInitialState : function() {
    var state = {};

    state.profs = [];
    state['str'] = "";
    state['dex'] = "";
    state['con'] = "";
    state['int'] = "";
    state['wis'] = "";
    state['cha'] = "";

    state.strerror = false;
    state.dexerror = false;
    state.conerror = false;
    state.interror = false;
    state.wiserror = false;
    state.chaerror = false;

    Object.keys(this.props.character['charSavingThrows']).forEach(function(key) {
      if (this.props.character['charSavingThrows'][key].proficient) {
        state.profs.push(key);
      }
    }.bind(this))

    return (state);
  },
  clearState : function() {
    var state ={};

    state['str'] = "";
    state['dex'] = "";
    state['con'] = "";
    state['int'] = "";
    state['wis'] = "";
    state['cha'] = "";

    state.strerror = false;
    state.dexerror = false;
    state.conerror = false;
    state.interror = false;
    state.wiserror = false;
    state.chaerror = false;

    this.setState(state);
  },
  toggle : function() {
    this.refs.settings.toggle();
  },
  handleChange : function(cmp, e) {
    var val = (e.target.value === "" ) ? "" : parseInt(e.target.value, 10);
    var err = {};

    if (isNaN(val)) {
      err[cmp+"error"] = true;
      this.setState(err);

      val = e.target.value;
    }
    else {
      err[cmp+"error"] = false;
      this.setState(err);
    }

    var node = {};
    node[cmp] = val;
    this.setState(node);
  },
  handleOk : function() {
    var tmp = this.props.character;
    var path = "charSavingThrows.edit[";
    var profBonus = tmp['charProficiencyBonus']['score'];
    var prs = {};

    prs['str'] = false;
    prs['dex'] = false;
    prs['con'] = false;
    prs['int'] = false;
    prs['wis'] = false;
    prs['cha'] = false;

    if (
      this.state.strerror === true ||
      this.state.dexerror === true ||
      this.state.conerror === true ||
      this.state.interror === true ||
      this.state.wiserror === true ||
      this.state.chaerror === true
    )
    {
      return;
    }

    // get map ready
    this.state.profs.forEach(function(prof) {
      prs[prof] = true;
    });

    path += this.state.profs.toString() + "]";

    // map prof throws to character and calc new saving throw
    Object.keys(prs).forEach(function(prof) {

      // save proficient or not
      tmp['charSavingThrows'][prof]['proficient'] = prs[prof];

      // save bonus
      tmp['charSavingThrows'][prof]['bonus'] = 
        (this.state[prof] === "")
        ? tmp['charSavingThrows'][prof]['bonus']
        : this.state[prof];

      // calculate new score
      tmp['charSavingThrows'][prof]['score'] = 
        tmp['charAbilities'][prof]['mod'] +
        tmp['charSavingThrows'][prof]['bonus'] +
        ((prs[prof]) ? profBonus : 0);

    }.bind(this))

    // save
    this.props.edit({ path : path, character : tmp });
    this.clearState();
  },
  handleProfSelect : function(e) {
    //console.log(e.target.options);
    var sel = [];
    for(var i = 0; i < e.target.options.length; i++) {
      if (e.target.options[i].selected) {
        sel.push(e.target.options[i].value);
      }
    }

    this.setState({ profs : sel });
  },
  render : function() {

    var validstr = (this.state.strerror) ? "error" : "success";
    var validdex = (this.state.dexerror) ? "error" : "success";
    var validcon = (this.state.conerror) ? "error" : "success";
    var validint = (this.state.interror) ? "error" : "success";
    var validwis = (this.state.wiserror) ? "error" : "success";
    var validcha = (this.state.chaerror) ? "error" : "success";

    var prof = [];
    Object.keys(this.props.character['charSavingThrows']).forEach(function(key) {
      if (this.props.character['charSavingThrows'][key].proficient) {
        prof.push(key);
      }
    }.bind(this));

    return (
      <Settings ref="settings">
        <h3>{"Edit Saving Throws"}</h3>
        <p>{"Edit the saving throws with which you are proficient and add any modifiers you may also have for that saving throw."}</p>
        <Input type="select" ref="profSelect" multiple label="Select Proficient Saving Throws" defaultValue={prof} onChange={this.handleProfSelect}>
          <option value="str">Strength</option>
          <option value="dex">Dexterity</option>
          <option value="con">Constitution</option>
          <option value="int">Intelligence</option>
          <option value="wis">Wisdom</option>
          <option value="cha">Charisma</option>
        </Input>
        <p>{"Have any other modifiers to saving throws? (Ex: Armor, Class Feature)"}</p>
        <Input>
          <Row>
            <Col xs={4}>
              <Input type="text" bsStyle={(this.state['str'] === "") ? null : validstr} onChange={this.handleChange.bind(this, 'str')} value={this.state['str']} placeholder={this.props.character['charSavingThrows']['str']['bonus']} label={"Strength"} />
            </Col>
            <Col xs={4}>
              <Input type="text" bsStyle={(this.state['dex'] === "") ? null : validdex} onChange={this.handleChange.bind(this, 'dex')} value={this.state['dex']} placeholder={this.props.character['charSavingThrows']['dex']['bonus']} label={"Dexterity"} />
            </Col>
            <Col xs={4}>
              <Input type="text" bsStyle={(this.state['con'] === "") ? null : validcon} onChange={this.handleChange.bind(this, 'con')} value={this.state['con']} placeholder={this.props.character['charSavingThrows']['con']['bonus']} label={"Constitution"} />
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <Input type="text" bsStyle={(this.state['int'] === "") ? null : validint} onChange={this.handleChange.bind(this, 'int')} value={this.state['int']} placeholder={this.props.character['charSavingThrows']['int']['bonus']} label={"Intelligence"} />
            </Col>
            <Col xs={4}>
              <Input type="text" bsStyle={(this.state['wis'] === "") ? null : validwis} onChange={this.handleChange.bind(this, 'wis')} value={this.state['wis']} placeholder={this.props.character['charSavingThrows']['wis']['bonus']} label={"Wisdom"} />
            </Col>
            <Col xs={4}>
              <Input type="text" bsStyle={(this.state['cha'] === "") ? null : validcha} onChange={this.handleChange.bind(this, 'cha')} value={this.state['cha']} placeholder={this.props.character['charSavingThrows']['cha']['bonus']} label={"Charisma"} />
            </Col>
          </Row>
        </Input>
        <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success" onClick={this.handleOk}>Save</Button>
        </ButtonToolbar>
      </Settings>
    );
  }
})

module.exports = SettingsSavingThrows;