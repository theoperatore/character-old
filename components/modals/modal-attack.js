var React = require('react');
var Modal = require('react-bootstrap/Modal');
var Button = require('react-bootstrap/Button');
var Panel = require('react-bootstrap/Panel');
var Input = require('react-bootstrap/Input');
var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');



var AttackModal = React.createClass({
  displayName : "AttackModal",
  getInitialState : function() {
    var state = {};

    state.toggle = false,
    state.name = "",
    state.desc = "",
    state.edit = -1,
    state.changeName = "",
    state.changeDesc = "",
    state.mode = 0

    return (state);
  },

  handleChange : function(cmp, e) {
    var state = {};
    state[cmp] = e.target.value;
    this.setState(state);
  },

  handleModeChange : function(mode) {
    this.setState({ mode : mode });
  },

  handleEditSelect : function(e) {
    var idx = parseInt(e.target.value, 10);
    var attack = this.props.character['charAttacks'][idx];
    var name = (idx === -1) ? "" : attack.name;
    var desc = (idx === -1) ? "" : attack.desc;
    var state = {};

    state.edit = idx;
    state.changeName = name;
    state.changeDesc = desc;
    
    this.setState(state);
  },
  handleDelete : function() {
    var tmp = this.props.character;
    var path = "charAttacks.delete.";
    var name = tmp['charAttacks'][this.state.edit].name;
    var atk;

    if (!confirm("Do you really want to get rid of\n '" + name + "'\n forever?")) return;

    // delete attack
    atk = tmp['charAttacks'].splice(this.state.edit, 1);
    path += atk.name;

    // push changes upstream
    this.props.edit({ path : path, character : tmp });
    this.props.close();
  },
  handleAdd : function() {
    var tmp = this.props.character;
    var data = {};
    var path = "charAttacks";

    // mode 0 -- add new attack
    if (this.state.mode === 0) {

      // make sure we have enough info to add
      if (this.state.name === "" || this.state.desc === "") return;
      
      // build new attack node
      data.name = this.state.name;
      data.desc = this.state.desc;

      // modify character
      tmp['charAttacks'].push(data);
      path += ".add";
    }
    
    // mode 1 -- edit attack
    else if (this.state.mode === 1) {

      // make sure something is selected
      if (this.state.edit === -1 || this.state.changeName === "" || this.state.changeDesc === "") return;

      // log old name
      path += ".edit." + tmp['charAttacks'][this.state.edit].name;

      // modify character
      tmp['charAttacks'][this.state.edit].name = this.state.changeName;
      tmp['charAttacks'][this.state.edit].desc = this.state.changeDesc;
    }
    
    this.props.edit({ path : path, character : tmp });
    this.props.close();
  },

  // draw it
  render : function() {

    // set up attack options
    var attacks = [];
    this.props.character['charAttacks'].forEach(function(atk, i) {
      attacks.push(
        <option key={i} value={i}>{atk.name}</option>
      );
    });

    return (
      <Modal onRequestHide={this.props.close}>
        <div className="modal-body">
          <TabbedArea activeKey={this.state.mode} onSelect={this.handleModeChange}>
            <TabPane eventKey={0} tab="new">
              <div className="container-fluid">
                <h3>{"Add new attack"}</h3>
                <p>{"Enter the name of the new attack and a short description."}</p>
                <Input placeholder="name" value={this.state.name} type="text" label="Attack Name" onChange={this.handleChange.bind(this,"name")}/>
                <Input placeholder="short description" value={this.state.desc} type="textarea" label="Attack Desc" onChange={this.handleChange.bind(this, "desc")}/>
              </div>
            </TabPane>
            <TabPane eventKey={1} tab="edit">
              <div className="container-fluid">
                <h3>{"Edit attack"}</h3>
                <p>{"Change the name or description of an attack by first selecting an attack name and then entering new values"}</p>
                <Input>
                  <Row>
                    <Col xs={8}>
                      <Input type="select" onChange={this.handleEditSelect} defaultSelected={-1}>
                        <option value={-1}>{"Select an Attack"}</option>
                        {attacks}
                      </Input>
                    </Col>
                    <Col xs={4}>
                      <Button disabled={(this.state.edit === -1) ? true : false} bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
                    </Col>
                  </Row>
                </Input>
                <Input disabled={(this.state.edit === -1) ? true : false} type="text" onChange={this.handleChange.bind(this,"changeName")} placeholder={"attack name"} value={this.state.changeName} label={"New Attack Name"}/>
                <Input disabled={(this.state.edit === -1) ? true : false} type="textarea" onChange={this.handleChange.bind(this, "changeDesc")} placeholder={"attack desc"} value={this.state.changeDesc} label={"New Attack Desc"}/>
              </div>
            </TabPane>
          </TabbedArea>
        </div>
        <div className="modal-footer">
          <Button bsStyle="danger"  onClick={this.props.close}>Close</Button>
          <Button bsStyle="success" onClick={this.handleAdd}>Save</Button>
        </div>
      </Modal>
    );
  }
})

module.exports = AttackModal;