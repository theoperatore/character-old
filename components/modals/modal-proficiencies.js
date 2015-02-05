// Main requires
var React = require('react');
var Modal = require('react-bootstrap/Modal');
var Input = require('react-bootstrap/Input');
var Button = require('react-bootstrap/Button');
var Alert = require('react-bootstrap/Alert');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');

// The modal object to export
var ProfModal = React.createClass({

  getInitialState : function() {
    var state = {};

    state.name = "";
    state.desc = "";
    state.mode = 0;
    state.newName = "";
    state.newDesc = "";

    // this holds the index of the proficiency to edit
    state.edit = -1;

    return (state);
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
    var prof = this.props.character['charOtherProficiencies']['proficiencies'][idx];
    var name = (idx === -1) ? "" : prof.name;
    var desc = (idx === -1) ? "" : prof.desc;
    var state = {};

    state.edit = idx;
    state.newName = name;
    state.newDesc = desc;
    
    this.setState(state);
  },

  handleDelete : function() {
    var tmp = this.props.character;
    var path = "charOtherProficiencies.proficiencies.delete";
    var name = tmp['charOtherProficiencies']['proficiencies'][this.state.edit].name;
    var prof;

    // if mistake, stop deleting!
    if (!confirm("Do you really want to get rid of\n '" + name + "'\n forever?")) return;

    prof = tmp['charOtherProficiencies']['proficiencies'].splice(this.state.edit, 1);
    path += "." + prof.name;

    // save and close
    this.props.edit({ path : path, character : tmp });
    this.props.close();
  },

  handleOk : function() {
    var tmp = this.props.character;
    var path = "charOtherProficiencies.proficiencies";
    var data = {};

    // adding new proficiency
    if (this.state.mode === 0) {

      // if the name isn't given, then don't add
      if (this.state.name === "") return;

      data.name = this.state.name;
      data.desc = this.state.desc;

      tmp['charOtherProficiencies']['proficiencies'].push(data);
      path += ".add." + data.name;
    }

    // editing existing proficiency
    else if (this.state.mode === 1) {

      // if nothing is selected, don't change
      if (this.state.edit === -1) return;

      // make the changes
      tmp['charOtherProficiencies']['proficiencies'][this.state.edit].name = this.state.newName;
      tmp['charOtherProficiencies']['proficiencies'][this.state.edit].desc = this.state.newDesc;

      // log the changes made
      path += ".edit." + tmp['charOtherProficiencies']['proficiencies'][this.state.edit].name;
    }
      
    // save and close
    this.props.edit({ path : path, character : tmp });
    this.props.close();
  },

  render : function() {

    // populate the select box
    var proficiencies = [];
    this.props.character['charOtherProficiencies']['proficiencies'].forEach(function(prof, i) {
      proficiencies.push(
        <option key={i} value={i}>{prof.name}</option>
      );
    }); 

    return (
      <Modal onRequestHide={this.props.close}>
        <div className="modal-body">
          <TabbedArea activeKey={this.state.mode} onSelect={this.handleModeChange}>
            
            <TabPane eventKey={0} tab="new">
              <div className="container-fluid">
                <h3>{"Add New Proficiency"}</h3>
                <p>{"Enter the name of the proficiency (ex: Herbalism Kit) and an optional sort description."}</p>
                <Input placeholder="name" value={this.state.name} type="text" label="Proficiency Name" onChange={this.handleChange.bind(this, "name")}/>
                <Input placeholder="short description" value={this.state.desc} type="textarea" label="Proficiency Description" onChange={this.handleChange.bind(this, "desc")}/>
              </div>
            </TabPane>

            <TabPane eventKey={1} tab="edit">
              <div className="container-fluid">
                <h3>{"Edit Proficiencies"}</h3>
                <p>{"Change the name or description of a proficiency by first selecting the proficiency to edit and then entering new values."}</p>
                <Input>
                  <Row>
                    <Col xs={8}>
                      <Input type="select" onChange={this.handleSelect} defaultSelected={-1}>
                        <option value={-1}>{"Select a Proficiency"}</option>
                        {proficiencies}
                      </Input>
                    </Col>
                    <Col xs={4}>
                      <Button disabled={(this.state.edit === -1) ? true : false} bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
                    </Col>
                  </Row>
                </Input>
                <Input disabled={(this.state.edit === -1) ? true : false} type="text" onChange={this.handleChange.bind(this, "newName")} placeholder={"prof name"} value={this.state.newName} label={"New Proficiency Name"}/>
                <Input disabled={(this.state.edit === -1) ? true : false} type="textarea" onChange={this.handleChange.bind(this, "newDesc")} placeholder={"prof desc"} value={this.state.newDesc} label={"New Proficiency Desc"}/>
              </div>
            </TabPane>
          </TabbedArea>
        </div>
        <div className="modal-footer">
          <Button bsStyle="danger"  onClick={this.props.close}>Close</Button>
          <Button bsStyle="success" onClick={this.handleOk}>Save</Button>
        </div>
      </Modal>
    );
  }
})

// export
module.exports = ProfModal;