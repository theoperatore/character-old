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

    state.profThrows = [];

    return (state);
  },
  toggle : function() {
    this.refs.settings.toggle();
  },
  handleChange : function(cmp, e) {
    var node = {};
    node[cmp] = e.target.value;
    this.setState(node);
  },
  handleOk : function() {

  },
  handleProfSelect : function(e) {
    console.log("selected:", e.target.value);
  },
  render : function() {

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
        <Input type="select" multiple label="Select Proficient Saving Throws" defaultValue={prof} onChange={this.handleProfSelect}>
          <option value="str">Strength</option>
          <option value="dex">Dexterity</option>
          <option value="con">Constitution</option>
          <option value="int">Intelligence</option>
          <option value="wis">Wisdom</option>
          <option value="cha">Charisma</option>
        </Input>
        <Input>
          <Row>
            <Col xs={4}>
              <Input type="text" label={"Strength"} />
            </Col>
            <Col xs={4}>
              <Input type="text" label={"Dexterity"} />
            </Col>
            <Col xs={4}>
              <Input type="text" label={"Constitution"} />
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <Input type="text" label={"Intelligence"} />
            </Col>
            <Col xs={4}>
              <Input type="text" label={"Wisdom"} />
            </Col>
            <Col xs={4}>
              <Input type="text" label={"Charisma"} />
            </Col>
          </Row>
        </Input>
        <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success">Save</Button>
        </ButtonToolbar>
      </Settings>
    );
  }
})

module.exports = SettingsSavingThrows;