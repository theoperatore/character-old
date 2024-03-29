var React = require('react');

var Input = require('react-bootstrap/lib/Input');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Button = require('react-bootstrap/lib/Button');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');

var SettingsSavingThrows = React.createClass({
  getInitialState : function() {
    var state = {};

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
    this.props.hatchToggle();
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
    var path = "charSavingThrows.bonus.";

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

    // handle adding bonuses to each saving throw that was entered
    if (this.state['str'] !== "") {
      tmp = tmp.setIn(['charSavingThrows', 'str', 'bonus'], this.state['str']);
      path += 'str=' + this.state['str'] + ".";

    }

    if (this.state['dex'] !== "") {
      tmp = tmp.setIn(['charSavingThrows', 'dex', 'bonus'], this.state['dex']);
      path += 'dex=' + this.state['dex'] + ".";
    }

    if (this.state['con'] !== "") {
      tmp = tmp.setIn(['charSavingThrows', 'con', 'bonus'], this.state['con']);
      path += 'con=' + this.state['con'] + ".";
    }

    if (this.state['int'] !== "") {
      tmp = tmp.setIn(['charSavingThrows', 'int', 'bonus'], this.state['int']);
      path += 'int=' + this.state['int'] + ".";
    }

    if (this.state['wis'] !== "") {
      tmp = tmp.setIn(['charSavingThrows', 'wis', 'bonus'], this.state['wis']);
      path += 'wis=' + this.state['wis'] + ".";
    }

    if (this.state['cha'] !== "") {
      tmp = tmp.setIn(['charSavingThrows', 'cha', 'bonus'], this.state['cha']);
      path += 'cha=' + this.state['cha'] + ".";
    }

    // save
    this.props.edit({ path : path, character : tmp });
    this.clearState();
    this.toggle();
  },
  handleProfSelect : function(save, e) {
    var tmp = this.props.character;
    var path = "charSavingThrows.proficient.";
    
    tmp = tmp.setIn(['charSavingThrows', save, 'proficient'], e.target.checked);
    path += save + "." + e.target.checked;

    this.props.edit({ path : path, character : tmp });
  },
  render : function() {

    var validstr = (this.state.strerror) ? "error" : "success";
    var validdex = (this.state.dexerror) ? "error" : "success";
    var validcon = (this.state.conerror) ? "error" : "success";
    var validint = (this.state.interror) ? "error" : "success";
    var validwis = (this.state.wiserror) ? "error" : "success";
    var validcha = (this.state.chaerror) ? "error" : "success";

    // build checkbox list
    var profs = [];
    this.props.character.get('charSavingThrows').forEach(function(value, key) {
      var checked = value.get('proficient');
      profs.push(
        <Input type="checkbox" key={"st"+key} label={key.toUpperCase()} checked={checked} onChange={this.handleProfSelect.bind(this, key)} />
      );
    }, this)

    return (
      <div className="settings-tear">
        <h3>{"Edit Saving Throws"}</h3>
        <p>{"Edit the saving throws with which you are proficient and add any modifiers you may also have for that saving throw."}</p>
        <div className="multiselect-checkboxes">
          {profs}
        </div>
        <p>{"Have any other modifiers to saving throws? (Ex: Armor, Class Feature)"}</p>
        <Input>
          <Row>
            <Col xs={4}>
              <Input type="text" bsStyle={(this.state['str'] === "") ? null : validstr} onChange={this.handleChange.bind(this, 'str')} value={this.state['str']} placeholder={this.props.character.getIn(['charSavingThrows', 'str', 'bonus'])} label={"Strength"} />
            </Col>
            <Col xs={4}>
              <Input type="text" bsStyle={(this.state['dex'] === "") ? null : validdex} onChange={this.handleChange.bind(this, 'dex')} value={this.state['dex']} placeholder={this.props.character.getIn(['charSavingThrows', 'dex', 'bonus'])} label={"Dexterity"} />
            </Col>
            <Col xs={4}>
              <Input type="text" bsStyle={(this.state['con'] === "") ? null : validcon} onChange={this.handleChange.bind(this, 'con')} value={this.state['con']} placeholder={this.props.character.getIn(['charSavingThrows', 'con', 'bonus'])} label={"Constitution"} />
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <Input type="text" bsStyle={(this.state['int'] === "") ? null : validint} onChange={this.handleChange.bind(this, 'int')} value={this.state['int']} placeholder={this.props.character.getIn(['charSavingThrows', 'int', 'bonus'])} label={"Intelligence"} />
            </Col>
            <Col xs={4}>
              <Input type="text" bsStyle={(this.state['wis'] === "") ? null : validwis} onChange={this.handleChange.bind(this, 'wis')} value={this.state['wis']} placeholder={this.props.character.getIn(['charSavingThrows', 'wis', 'bonus'])} label={"Wisdom"} />
            </Col>
            <Col xs={4}>
              <Input type="text" bsStyle={(this.state['cha'] === "") ? null : validcha} onChange={this.handleChange.bind(this, 'cha')} value={this.state['cha']} placeholder={this.props.character.getIn(['charSavingThrows', 'cha', 'bonus'])} label={"Charisma"} />
            </Col>
          </Row>
        </Input>
        <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success" onClick={this.handleOk}>Save</Button>
        </ButtonToolbar>
      </div>
    );
  }
})

module.exports = SettingsSavingThrows;