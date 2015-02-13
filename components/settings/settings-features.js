var React = require('react');
var Settings = require('./settings-tear');

var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var Input = require('react-bootstrap/Input');
var ButtonToolbar = require('react-bootstrap/ButtonToolbar');
var Button = require('react-bootstrap/Button');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');

var SettingsFeatures = React.createClass({
  getInitialState : function() {
    var state = {};

    state.mode = 0;
    state.name = "";
    state.desc = "";
    state.charges = "";
    state.enableCharges = false;

    state.newName = "";
    state.newDesc = "";
    state.newCharges = "";

    return (state);
  },
  toggle : function() {
    this.refs.settings.toggle();
  },
  toggleCharges : function() {
    this.setState({ enableCharges : !this.state.enableCharges });
  },
  handleMode : function(key) {
    this.setState({ mode : key });
  },
  handleChange : function(cmp, e) {
    var node = {};
    node[cmp] = e.target.value;
    this.setState(node);
  },
  handleDelete : function() {

  },
  handleSelect : function(e) {

  },
  handleOk : function() {

  },
  renderAdd : function() {

    return (
      <div>
        <h3>{"Add New Feature"}</h3>
        <p>{"Do the things with the adding, to get new features."}</p>
        <Input placeholder="name" value={this.state.name} type="text" label="Feature Name" onChange={this.handleChange.bind(this, "name")}/>
        <Input placeholder="short description" value={this.state.desc} type="textarea" label="Feature Description" onChange={this.handleChange.bind(this, "desc")}/>
        <Input type="checkbox" label="gives class charges?"  onChange={this.toggleCharges}/>
        <Input disabled={(this.state.enableCharges) ? false : true} placeholder="check box to enable" type="text" label="Number of Charges" help="(Ki, Rages, Sorcery, etc)?" onChange={this.handleChange.bind(this, "charges")}/>
        <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success">Save</Button>
        </ButtonToolbar>
      </div>
    );
  },
  renderEdit : function() {
    // set up features for box
    var features = [];
    this.props.character['charFeatures'].forEach(function(feat, i) {
      features.push(
        <option key={i} value={i}>{feat.name}</option>
      );
    });

    return (
      <div>
        <h3>{"Edit Features"}</h3>
        <p>{"Do the things with the editing, for making changes to features."}</p>
        <Input>
          <Row>
            <Col xs={8}>
              <Input type="select" onChange={this.handleSelect} defaultSelected={-1}>
                <option value={-1}>{"Select a Feature"}</option>
                {features}
              </Input>
            </Col>
            <Col xs={4}>
              <Button bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
            </Col>
          </Row>
        </Input>
        <Input type="text" onChange={this.handleChange.bind(this, "newName")} placeholder={"feat name"} label="New Feature Name" value={this.state.newName} />
        <Input type="textarea" onChange={this.handleChange.bind(this, "newDesc")} placeholder={"feat desc"} label="New Feature Description" value={this.state.newDesc} />
        <Input type="text" onChange={this.handleChange.bind(this, "newCharges")} placeholder={"number of charges"} label={"New Amount of Class Charges"} value={this.state.newCharges} />
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
        <TabbedArea activeKey={this.state.mode} onSelect={this.handleMode}>
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

module.exports = SettingsFeatures;