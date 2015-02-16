var React = require('react');

var Input = require('react-bootstrap/Input');
var ButtonToolbar = require('react-bootstrap/ButtonToolbar');
var Button = require('react-bootstrap/Button');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');

var SettingsTraits = React.createClass({
  getInitialState : function () {
    var state = {};

    state.name = "";
    state.desc = "";
    state.mode = 0;
    state.newDesc = "";
    state.newName = "";
    state.idx = -1;

    return (state);
  },
  toggle : function() {
    this.refs.settings.toggle();
  },
  clearState : function() {
    var state = {};

    state.name = "";
    state.desc = "";
    //state.mode = 0;
    state.newDesc = "";
    state.newName = "";
    state.idx = -1;

    this.setState(state);
  },
  handleModeChange : function(mode) {
    this.clearState();
    this.setState({ mode : mode });

  },
  componentDidUpdate : function() {
    // recalculate this 
    this.props.recalculate();
  },
  handleChange : function(cmp, e) {
    var node = {};
    node[cmp] = e.target.value;
    this.setState(node);
  },
  handleSelect : function(e) {
    var idx = parseInt(e.target.value, 10);
    var langs = this.props.character['charOtherProficiencies']['languages'][idx];
    var name = (idx === -1) ? "" : langs.name;
    var desc = (idx === -1) ? "" : langs.desc;
    var state = {};

    state.idx = idx;
    state.newName = name;
    state.newDesc = desc;

    this.setState(state);
  },
  handleDelete : function() {
    var tmp = this.props.character;
    var path = "charOtherProficiencies.languages.delete";
    var name = tmp['charOtherProficiencies']['languages'][this.state.idx].name;
    var langs;

    //if mistake, stop deleting!
    if (!confirm("Do you really want to get rid of\n '" + name + "'\n forever?")) return;

    langs = tmp['charOtherProficiencies']['languages'].splice(this.state.idx, 1);
    path += "." + langs[0].name;

    //save and close
    this.props.edit({ path : path, character : tmp });
    this.clearState();
  },
  handleOk : function() {
    var tmp = this.props.character;
    var path = "charOtherProficiencies.languages";
    var data = {};

    //adding new language
    if (this.state.mode === 0) {
      if (this.state.name === "") return;

      data.name = this.state.name;
      data.desc = this.state.desc;

      tmp['charOtherProficiencies']['languages'].push(data);
      path += ".add." + data.name;
    }
    
    //edit existing language
    else if (this.state.mode === 1) {
      if (this.state.idx === -1) return;

      // make the changes
      tmp['charOtherProficiencies']['languages'][this.state.idx].name = this.state.newName;
      tmp['charOtherProficiencies']['languages'][this.state.idx].desc = this.state.newDesc;

      // log the changes made
      path += ".edit." + tmp['charOtherProficiencies']['languages'][this.state.idx].name;
    } 

    // save and close
    this.props.edit({ path : path, character : tmp });
    this.clearState();
  },
  renderAdd : function() {
    return (
      <div>
        <p>{"Enter the name of the language (ex: Draconic) and an optional sort description."}</p>
        <Input placeholder="name" value={this.state.name} type="text" label="Language Name" onChange={this.handleChange.bind(this, "name")} />
        <Input placeholder="short description" value={this.state.desc} type="textarea" label="Language Description" onChange={this.handleChange.bind(this, "desc")}/>
        <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success" onClick={this.handleOk}>Save</Button>
        </ButtonToolbar>
      </div>
    );
  },
  renderEdit : function() {

    // populate the select box
    var languages = [];
    this.props.character['charOtherProficiencies']['languages'].forEach(function(langs, i) {
      languages.push(
        <option key={i} value={i}>{langs.name}</option>
      );
    });

    return (
      <div>
        <p>{"Change the name or description of a language by first selecting the language to edit and then entering new values."}</p>
        <Input>
          <Row>
            <Col xs={8}>
              <Input type="select" onChange={this.handleSelect} value={this.state.idx}>
                <option value={-1}>{"Select a Language"}</option>
                {languages}
              </Input>
            </Col>
            <Col xs={4}>
              <Button disabled={(this.state.idx === -1) ? true : false} bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
            </Col>
          </Row>
        </Input>
        <Input disabled={(this.state.idx === -1) ? true : false} type="text" onChange={this.handleChange.bind(this, "newName")} placeholder={"langs name"} value={this.state.newName} label={"New Language Name"}/> 
        <Input disabled={(this.state.idx === -1) ? true : false} type="textarea" onChange={this.handleChange.bind(this, "newDesc")} placeholder={"langs desc"} value={this.state.newDesc} label={"New Language Description"}/>
        <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success" onClick={this.handleOk}>Save</Button>
        </ButtonToolbar>
      </div>
    );
  },
  render : function() {
    return (
      <div className="settings-tear" ref="settings">
        <h3>{"Add / Edit Languages"}</h3>
        <TabbedArea activeKey={this.state.mode} animation={false} onSelect={this.handleModeChange}>
          <TabPane eventKey={0} tab="new">
            {this.renderAdd()}
          </TabPane>
          <TabPane eventKey={1} tab="edit">
            {this.renderEdit()}
          </TabPane>
        </TabbedArea>
      </div>
    );
  }
})

module.exports = SettingsTraits;