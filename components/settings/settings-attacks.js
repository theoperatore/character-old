var React = require('react');
var Settings = require('./settings-tear');

var Input = require('react-bootstrap/Input');
var ButtonToolbar = require('react-bootstrap/ButtonToolbar');
var Button = require('react-bootstrap/Button');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');

var SettingsAttacks = React.createClass({
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
    var idx = parseInt(e.target.value, 10);
    var prof = this.props.character['charAttacks'][idx];
    var name = (idx === -1) ? "" : prof.name;
    var desc = (idx === -1) ? "" : prof.desc;
    var state = {};

    state.idx = idx;
    state.newName = name;
    state.newDesc = desc;
    
    this.setState(state);
  },
  handleDelete : function() {
    var tmp = this.props.character;
    var path = "charAttacks.delete";
    var name = tmp['charAttacks'][this.state.idx].name;
    var atk;

    // if mistake, stop deleting!
    if (!confirm("Do you really want to get rid of\n '" + name + "'\n forever?")) return;

    atk = tmp['charAttacks'].splice(this.state.idx, 1);
    path += "." + atk.name;

    // save and close
    //this.props.edit({ path : path, character : tmp });
  },
  handleOk : function() {

  },
  renderAdd : function() {
    return (
      <div>
        <h3>{"Add New Attack"}</h3>
        <p>{"Do the attack name and short description dance!"}</p>
        <Input placeholder="name" value={this.state.name} type="text" label="Attack Name" onChange={this.handleChange.bind(this, "name")}/>
        <Input placeholder="short description" value={this.state.desc} type="textarea" label="Attack Description" onChange={this.handleChange.bind(this, "desc")}/>
         <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success">Save</Button>
        </ButtonToolbar>
      </div>
    );
  },
  renderEdit : function() {

    // populate the select box
    var attacks = [];
    this.props.character['charAttacks'].forEach(function(atk, i) {
      attacks.push(
        <option key={i} value={i}>{atk.name}</option>
      );
    }); 

    return (
      <div>
        <h3>{"Edit Attacks"}</h3>
        <p>{"Change the name or description of an attack by first selecting the attack to edit and then entering new values."}</p>
        <Input>
          <Row>
            <Col xs={8}>
              <Input type="select" onChange={this.handleSelect} defaultSelected={-1}>
                <option value={-1}>{"Select an Attack"}</option>
                {attacks}
              </Input>
            </Col>
            <Col xs={4}>
              <Button disabled={(this.state.idx === -1) ? true : false} bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
            </Col>
          </Row>
        </Input>
        <Input disabled={(this.state.idx === -1) ? true : false} type="text" onChange={this.handleChange.bind(this, "newName")} placeholder={"attack name"} value={this.state.newName} label={"New Attack Name"}/>
        <Input disabled={(this.state.idx === -1) ? true : false} type="textarea" onChange={this.handleChange.bind(this, "newDesc")} placeholder={"attack desc"} value={this.state.newDesc} label={"New Attack Description"}/>
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

module.exports = SettingsAttacks;