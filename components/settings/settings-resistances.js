var React = require('react');

var Input = require('react-bootstrap/Input');
var Button = require('react-bootstrap/Button');
var ButtonToolbar = require('react-bootstrap/ButtonToolbar');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');

var ResistanceSettings = React.createClass({
  getInitialState : function() {
    var state = {};

    state.mode = 0;
    state.name = "";
    state.desc = "";
    state.newName = "";
    state.newDesc = "";
    state.idx = -1;

    return (state);
  },
  clearState : function() {
    var state = {};

    state.name = "";
    state.desc = "";
    state.newName = "";
    state.newDesc = "";
    state.idx = -1;

    this.setState(state);
  },
  toggle : function() {

    // call HatchGroup to close
    this.props.toggle();
  },
  componentDidUpdate : function() {
    
    // call HatchGroup recalculate
    this.props.recalculate();
  },
  handleModeChange : function(mode) {
    this.setState({ mode : mode });
  },
  handleChange : function(cmp, e) {
    var state = {};

    state[cmp] = e.target.value;

    this.setState(state);
  },
  handleSelect : function(e) {
    var idx = parseInt(e.target.value, 10);
    var node = this.props.character['charResistances'][idx];
    var name = (idx === -1) ? "" : node.name;
    var desc = (idx === -1) ? "" : node.desc;
    var state = {};

    state.idx = idx;
    state.newName = name;
    state.newDesc = desc;
    
    this.setState(state);
  },
  handleOk : function() {
    var tmp = this.props.character;
    var path = "charResistances.";
    var res;

    // adding res
    if (this.state.mode === 0) {
      if (this.state.name === "") return;

      path += "add." + this.state.name;

      res = {};
      res.name = this.state.name;
      res.desc = this.state.desc;

      tmp['charResistances'].push(res);
    }

    // editing res
    else if (this.state.mode === 1) {
      if (this.state.newName === "") return;
      if (this.state.idx === -1) return;

      path += "edit." + this.state.newName;

      res = tmp['charResistances'][this.state.idx];
      res.name = this.state.newName;
      res.desc = this.state.newDesc;
    }

    this.props.edit({ path : path, character : tmp });
    this.clearState();
  },
  handleDelete : function() {
    var tmp = this.props.character;
    var path = "charResistances.delete.";
    var name = tmp['charResistances'][this.state.idx].name;
    var res;

    // if mistake, stop deleting!
    if (!confirm("Do you really want to get rid of\n '" + name + "'\n forever?")) return;

    res = tmp['charResistances'].splice(this.state.idx, 1);
    path += res[0].name;

    this.props.edit({ path : path, character : tmp });
    this.clearState();
  },
  renderNew : function() {
    return(
      <div>
        <p>{"Enter the name and an optional short description of the resistance/immunity."}</p>
        <Input type="text" value={this.state.name} label={"Resistance Name"} onChange={this.handleChange.bind(this, "name")} />
        <Input type="textarea" value={this.state.desc} label={"Resistance Description"} onChange={this.handleChange.bind(this, "desc")} />
      </div>
    );
  },
  renderEdit : function() {
    var options = [];
    this.props.character['charResistances'].forEach(function(res, i) {
      options.push(
        <option key={i} value={i}>{res.name}</option>
      );
    }.bind(this));

    return(
      <div>
        <p>{"Select a resistance/immunity to edit or delete."}</p>
        <Row>
          <Col xs={6}>
            <Input type="select" onChange={this.handleSelect} value={this.state.idx}>
              <option value={-1}>{"Select Resistance"}</option>
              {options}
            </Input>
          </Col>
          <Col xs={6}>
            <Button disabled={this.state.idx === -1 ? true : false} bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
          </Col>
        </Row>
        <Input disabled={this.state.idx === -1 ? true : false} type="text" value={this.state.newName} label={"New Resistance Name"} onChange={this.handleChange.bind(this, "newName")} />
        <Input disabled={this.state.idx === -1 ? true : false} type="textarea" value={this.state.newDesc} label={"New Resistance Descescription"} onChange={this.handleChange.bind(this, "newDesc")} />
      </div>
    );
  },
  render : function() {
    return (
      <div className="settings-tear">
        <h3>{"Add / Edit Resistances"}</h3>
        <TabbedArea activeKey={this.state.mode} animation={false} onSelect={this.handleModeChange}>
          <TabPane tab="new" eventKey={0}>
            {this.renderNew()}
          </TabPane>
          <TabPane tab="edit" eventKey={1}>
            {this.renderEdit()}
          </TabPane>
        </TabbedArea>
        <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success" onClick={this.handleOk}>Save</Button>
        </ButtonToolbar>
      </div>
    );
  }
})

module.exports = ResistanceSettings;