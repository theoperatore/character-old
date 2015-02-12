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



var SpellModal = React.createClass({
  displayName : "SpellModal",
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
    var spells = [];
    this.props.character['charSpells'].forEach(function(lvl, i) {
      lvl.spells.forEach(function(sp, j) {
        spells.push(
          <option key={"level"+i+"spell"+j} value={j} lvl={i}>{sp.name}</option>
        );
      });
    });

    return (
      <Modal onRequestHide={this.props.close}>
        <div className="modal-body">
          <TabbedArea activeKey={this.state.mode} onSelect={this.handleModeChange}>
            
            <TabPane eventKey={0} tab="new">
              <div className="container-fluid">
                <h4>{"Add new spell"}</h4>
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
              </div>
            </TabPane>

            <TabPane eventKey={1} tab="edit">
              <div className="container-fluid">
                <h4>{"Edit attack"}</h4>
                <Input>
                  <Row>
                    <Col xs={8}>
                      <Input type="select" onChange={this.handleEditSelect} defaultSelected={-1}>
                        <option value={-1}>{"Select a Spell"}</option>
                        {spells}
                      </Input>
                    </Col>
                    <Col xs={4}>
                      <Button disabled={(this.state.edit === -1) ? true : false} bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
                    </Col>
                  </Row>
                </Input>
                  

              </div>
            </TabPane>

            <TabPane eventKey={2} tab="slots">
              <div className="container-fluid">
                <h4>{"Edit spell slots"}</h4>
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

module.exports = SpellModal;