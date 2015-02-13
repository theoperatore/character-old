var React = require('react');
var Settings = require('./settings-tear');

var Input = require('react-bootstrap/Input');
var ButtonToolbar = require('react-bootstrap/ButtonToolbar');
var Button = require('react-bootstrap/Button');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');

var SettingsSpells = React.createClass({
  getInitialState : function () {
    var state = {};

    state.name = "";
    state.desc = "";
    state.mode = 0;
    state.newName = "";
    state.newDesc = "";
    state.idx = -1;

    return (state);
  },
  toggle : function() {
    this.refs.settings.toggle();
  },
  handleModeChange : function(mode) {
    this.setState({ mode : mode });
  },
  handleChange : function(cmp, e) {
    var node = {};
    node[cmp] = e.target.value;
    this.setState(node);
  },
  handleSelect : function(e) {

  },
  handleDelete : function() {
    
  },
  handleOk : function() {

  },
  renderAdd : function() {
    return (
      <div>
        <h3>{"Add new spell"}</h3>
        <p>{"Enter the info for each spell. The only required information is spell level and name--all other fields are optional."}</p>
        <Input type="text" label={"Name"}/>
        <Input type="select" label={"Spell Level"} defaultSelected={-1}>
          <option value={-1}>{"Spell Level"}</option>
          <option value={0}>{"Cantrip"}</option>
          <option value={1}>{"1st Level"}</option>
          <option value={2}>{"2nd Level"}</option>
          <option value={3}>{"3rd Level"}</option>
          <option value={4}>{"4th Level"}</option>
          <option value={5}>{"5th Level"}</option>
          <option value={6}>{"6th Level"}</option>
          <option value={7}>{"7th Level"}</option>
          <option value={8}>{"8th Level"}</option>
          <option value={9}>{"9th Level"}</option>
        </Input>
        <Input type="textarea" label={"Description"}/>
        <Input type="text" label={"Components"}/>
        <Input type="text" label={"Casting TIme"}/>
        <Input type="text" label={"Duration"}/>
        <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success">Save</Button>
        </ButtonToolbar>
      </div>
    );
  },
  renderEdit : function() {
    return (
      <div>
        <h3>{"Edit Spells"}</h3>
        <p>{"Select a spell to edit any detail. Be as thorough as possible."}</p>
        <Input>
          <Row>
            <Col xs={8}>
              <Input type="select" defaultSelected={-1}>
                <option value={-1}>{"Select a Spell"}</option>
              </Input>
            </Col>
            <Col xs={4}>
              <Button bsStyle="danger">Delete</Button>
            </Col>
          </Row>
        </Input>
        <Input type="text" label={"Name"}/>
        <Input type="select" label={"Spell Level"} defaultSelected={-1}>
          <option value={-1}>{"Spell Level"}</option>
          <option value={0}>{"Cantrip"}</option>
          <option value={1}>{"1st Level"}</option>
          <option value={2}>{"2nd Level"}</option>
          <option value={3}>{"3rd Level"}</option>
          <option value={4}>{"4th Level"}</option>
          <option value={5}>{"5th Level"}</option>
          <option value={6}>{"6th Level"}</option>
          <option value={7}>{"7th Level"}</option>
          <option value={8}>{"8th Level"}</option>
          <option value={9}>{"9th Level"}</option>
        </Input>
        <Input type="textarea" label={"Description"}/>
        <Input type="text" label={"Components"}/>
        <Input type="text" label={"Casting TIme"}/>
        <Input type="text" label={"Duration"}/>
        <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success">Save</Button>
        </ButtonToolbar>
      </div>
    );
  },
  renderSpellSlots : function() {
    return (
      <div>
        <h3>{"Edit spell slots"}</h3>
        <p>{"Select a spell level and enter how many spell slots your character has for that level."}</p>
        <Input type="select" label={"Spell Level"} defaultSelected={-1}>
          <option value={-1}>{"Spell Level"}</option>
          <option value={1}>{"1st Level"}</option>
          <option value={2}>{"2nd Level"}</option>
          <option value={3}>{"3rd Level"}</option>
          <option value={4}>{"4th Level"}</option>
          <option value={5}>{"5th Level"}</option>
          <option value={6}>{"6th Level"}</option>
          <option value={7}>{"7th Level"}</option>
          <option value={8}>{"8th Level"}</option>
          <option value={9}>{"9th Level"}</option>
        </Input>
        <Input type="text" label={"New Amount of Spell Slots"} />
        <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success">Save</Button>
        </ButtonToolbar>
      </div>
    );
  },
  render : function() {
    return (
      <Settings ref="settings">
        <TabbedArea activeKey={this.state.mode} onSelect={this.handleModeChange}>
          <TabPane eventKey={0} tab="new">
            {this.renderAdd()}
          </TabPane>
          <TabPane eventKey={1} tab="edit">
            {this.renderEdit()}
          </TabPane>
          <TabPane eventKey={2} tab="slots">
            {this.renderSpellSlots()}
          </TabPane>
        </TabbedArea>
      </Settings>
    );
  }
})

module.exports = SettingsSpells;