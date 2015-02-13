var React = require('react');
var Settings = require('./settings-tear');

var Input = require('react-bootstrap/Input');
var ButtonToolbar = require('react-bootstrap/ButtonToolbar');
var Button = require('react-bootstrap/Button');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');

var SettingsEquip = React.createClass({
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
        <h3>{"Add New Equipment"}</h3>
        <p>{"Enter the name and a short description of a new equipment!"}</p>
        <Input placeholder="name" value={this.state.name} type="text" label="Equipment Name" onChange={this.handleChange.bind(this, "name")}/>
        <Input placeholder="short description" value={this.state.desc} type="textarea" label="Equipment Description" onChange={this.handleChange.bind(this, "desc")}/>
         <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success">Save</Button>
        </ButtonToolbar>
      </div>
    );
  },
  renderEdit : function() {

    // populate the select box
    var equips = [];
    this.props.character['charEquipment']['otherEquipment'].forEach(function(equip, i) {
      equips.push(
        <option key={i} value={i}>{equip.name}</option>
      );
    }); 

    return (
      <div>
        <h3>{"Edit Proficiencies"}</h3>
        <p>{"Change something you definitely don't like about equipment pieces..."}</p>
        <Input>
          <Row>
            <Col xs={8}>
              <Input type="select" onChange={this.handleSelect} defaultSelected={-1}>
                <option value={-1}>{"Select an Equipment"}</option>
                {equips}
              </Input>
            </Col>
            <Col xs={4}>
              <Button disabled={(this.state.idx === -1) ? true : false} bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
            </Col>
          </Row>
        </Input>
        <Input disabled={(this.state.idx === -1) ? true : false} type="text" onChange={this.handleChange.bind(this, "newName")} placeholder={"equipmen name"} value={this.state.newName} label={"New Equipment Name"}/>
        <Input disabled={(this.state.idx === -1) ? true : false} type="textarea" onChange={this.handleChange.bind(this, "newDesc")} placeholder={"equipment desc"} value={this.state.newDesc} label={"New Equipment Description"}/>
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
        </TabbedArea>
      </Settings>
    );
  }
})

module.exports = SettingsEquip;