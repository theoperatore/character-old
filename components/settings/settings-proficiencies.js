var React = require('react');
var Immutable = require('immutable');

var Input = require('react-bootstrap/lib/Input');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Button = require('react-bootstrap/lib/Button');
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');

var SettingsTraits = React.createClass({
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
    this.props.hatchToggle();
  },
  clearState : function() {
    var state = {};

    state.name = "";
    state.desc = "";
    //state.mode = 0;
    state.newName = "";
    state.newDesc = "";
    state.idx = -1;

    this.setState(state);
  },
  handleModeChange : function(mode) {
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
    var prof = this.props.character.getIn(['charOtherProficiencies', 'proficiencies']).get(idx);
    var name = (idx === -1) ? "" : prof.get('name');
    var desc = (idx === -1) ? "" : prof.get('desc');
    var state = {};

    state.idx = idx;
    state.newName = name;
    state.newDesc = desc;
    
    this.setState(state);
  },
  handleDelete : function() {
    var tmp = this.props.character;
    var path = "charOtherProficiencies.proficiencies.delete";
    var name = tmp.getIn(['charOtherProficiencies', 'proficiencies']).get(this.state.idx).get('name');
    var profs;

    // if mistake, stop deleting!
    if (!confirm("Do you really want to get rid of\n '" + name + "'\n forever?")) return;

    //prof = tmp['charOtherProficiencies']['proficiencies'].splice(this.state.idx, 1);
    //path += "." + prof.name;
    profs = tmp.getIn(['charOtherProficiencies', 'proficiencies']).splice(this.state.idx, 1);
    tmp = tmp.setIn(['charOtherProficiencies', 'proficiencies'], profs);
    path += "." + name;

    // save and close
    this.props.edit({ path : path, character : tmp });
    this.clearState();
  },
  handleOk : function() {
    var tmp = this.props.character;
    var path = "charOtherProficiencies.proficiencies";
    var data = {};

    // adding new proficiency
    if (this.state.mode === 0) {
      if (this.state.name === "") return;

      data.name = this.state.name;
      data.desc = this.state.desc;

      //tmp['charOtherProficiencies']['proficiencies'].push(data);
      tmp = tmp.updateIn(['charOtherProficiencies', 'proficiencies'], function(list) {
        return list.push(new Immutable.Map(data));
      });
      path += ".add." + data.name;
    }

    // editing existing proficiency
    else if (this.state.mode === 1) {
      if (this.state.idx === -1) return;

      // make the changes
      //tmp['charOtherProficiencies']['proficiencies'][this.state.idx].name = this.state.newName;
      //tmp['charOtherProficiencies']['proficiencies'][this.state.idx].desc = this.state.newDesc;

      // make changes using Immutable
      tmp = tmp.updateIn(['charOtherProficiencies', 'proficiencies'], function(list) {
        return list.update(this.state.idx, function(item) {
          var newItem = item;

          newItem = newItem.set('name', this.state.newName);
          newItem = newItem.set('desc', this.state.newDesc);

          return newItem;
        }.bind(this));
      }.bind(this));

      // log the changes made
      path += ".edit." + this.state.newName;
    }
      
    // save and close
    this.props.edit({ path : path, character : tmp });
    this.clearState();
  },
  renderAdd : function() {
    return (
      <div>
        <p>{"Enter the name of the proficiency (ex: Herbalism Kit) and an optional sort description."}</p>
        <Input placeholder="name" value={this.state.name} type="text" label="Proficiency Name" onChange={this.handleChange.bind(this, "name")}/>
        <Input placeholder="short description" value={this.state.desc} type="textarea" label="Proficiency Description" onChange={this.handleChange.bind(this, "desc")}/>
         <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success" onClick={this.handleOk}>Save</Button>
        </ButtonToolbar>
      </div>
    );
  },
  renderEdit : function() {

    // populate the select box
    var proficiencies = [];
    this.props.character.getIn(['charOtherProficiencies', 'proficiencies']).forEach(function(prof, i) {
      proficiencies.push(
        <option key={i} value={i}>{prof.get('name')}</option>
      );
    }); 

    return (
      <div>
        <p>{"Change the name or description of a proficiency by first selecting the proficiency to edit and then entering new values."}</p>
        <Input>
          <Row>
            <Col xs={8}>
              <Input type="select" onChange={this.handleSelect} value={this.state.idx}>
                <option value={-1}>{"Select a Proficiency"}</option>
                {proficiencies}
              </Input>
            </Col>
            <Col xs={4}>
              <Button disabled={(this.state.idx === -1) ? true : false} bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
            </Col>
          </Row>
        </Input>
        <Input disabled={(this.state.idx === -1) ? true : false} type="text" onChange={this.handleChange.bind(this, "newName")} placeholder={"prof name"} value={this.state.newName} label={"New Proficiency Name"}/>
        <Input disabled={(this.state.idx === -1) ? true : false} type="textarea" onChange={this.handleChange.bind(this, "newDesc")} placeholder={"prof desc"} value={this.state.newDesc} label={"New Proficiency Desc"}/>
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
        <h3>{"Add / Edit Proficiencies"}</h3>
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