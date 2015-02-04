var React = require('react');
var Glyphicon = require('react-bootstrap/Glyphicon');
var Accordion = require('react-bootstrap/Accordion');
var Panel = require('react-bootstrap/Panel');
var Input = require('react-bootstrap/Input');
var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var OverlayTrigger = require('react-bootstrap/OverlayTrigger');
var OverlayMixin = require('react-bootstrap/OverlayMixin');
var Tooltip = require('react-bootstrap/Tooltip');
var Popover = require('react-bootstrap/Popover');
var Modal = require('react-bootstrap/Modal');
var Button = require('react-bootstrap/Button');

var Attack = React.createClass({
  displayName : "CharAttack",
  mixins : [OverlayMixin],
  getInitialState : function() {
    return ({
      prof : true,
      abil : "dex",
      toggle : false,
      name : "",
      desc : "",
      edit : -1,
      changeName : "",
      changeDesc : "",
      mode : 0
    });
  },
  handleProficient : function(e) {
    this.setState({ prof : e.target.checked });
  },
  handleSelectAbil : function(e) {
    this.setState({ abil : e.target.value });
  },
  handleModalModeChange : function(mode) {
    this.setState({ mode : mode });
  },
  handleAttackName : function(e) {
    this.setState({ name : e.target.value });
  },
  handleAttackDesc : function(e) {
    this.setState({ desc : e.target.value });
  },
  handleEditName : function(e) {
    this.setState({ changeName : e.target.value });
  },
  handleEditDesc : function(e) {
    this.setState({ changeDesc : e.target.value });
  },
  handleAttackClose : function() {
    var state = {};

    state.name = "";
    state.desc = "";
    state.changeName = "";
    state.changeDesc = "";
    state.edit = -1;
    state.mode = 0;
    state.toggle = !this.state.toggle;

    this.setState(state);
  },
  handleAttackEditSelect : function(e) {
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
    var atk;

    // delete attack
    atk = tmp['charAttacks'].splice(this.state.edit, 1);
    path += atk.name;

    // push changes upstream
    this.props.edit({ path : path, character : tmp });
    this.handleAttackClose();
  },
  handleAttackAdd : function() {
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

    // from index.js -- push changes upstream
    this.props.edit({ path : path, character : tmp });

    // close modal and reset state
    this.handleAttackClose();
  },
  renderOverlay : function() {
    if (!this.state.toggle) return <span/>;

    var attacks = [];
    this.props.character['charAttacks'].forEach(function(atk, i) {
      attacks.push(
        <option key={i} value={i}>{atk.name}</option>
      );
    }); 

    // add new attack modal
    return (
      <Modal onRequestHide={this.handleAttackClose}>
        <div className="modal-body">
          <TabbedArea activeKey={this.state.mode} onSelect={this.handleModalModeChange}>
            <TabPane eventKey={0} tab="new">
              <div className="container-fluid">
                <h3>{"Add new attack"}</h3>
                <Input placeholder="name" value={this.state.name} type="text" label="Attack Name" onChange={this.handleAttackName}/>
                <Input placeholder="short description" value={this.state.desc} type="text" label="Attack Desc" onChange={this.handleAttackDesc}/>
              </div>
            </TabPane>
            <TabPane eventKey={1} tab="edit">
              <div className="container-fluid">
                <h3>{"Edit attack"}</h3>
                <p>{"Change the name or description of an attack by first selecting an attack name and then entering new values"}</p>
                <Input type="select" onChange={this.handleAttackEditSelect} defaultSelected={-1}>
                  <option value={-1}>{"Select an Attack"}</option>
                  {attacks}
                </Input>
                <Input disabled={(this.state.edit === -1) ? true : false} type="text" onChange={this.handleEditName} placeholder={"attack name"} value={this.state.changeName} label={"New Attack Name"}/>
                <Input disabled={(this.state.edit === -1) ? true : false} type="text" onChange={this.handleEditDesc} placeholder={"attack desc"} value={this.state.changeDesc} label={"New Attack Desc"}/>
                <Button disabled={(this.state.edit === -1) ? true : false} bsStyle="danger" bsSize="large" onClick={this.handleDelete}>Delete</Button>
              </div>
            </TabPane>
          </TabbedArea>
        </div>
        <div className="modal-footer">
          <Button bsStyle="danger"  onClick={this.handleAttackClose}>Close</Button>
          <Button bsStyle="success" onClick={this.handleAttackAdd}>Ok</Button>
        </div>
      </Modal>
    );

  },
  render : function() {

    var charAttacks = this.props.character['charAttacks'];
    var bonus = this.props.character['charAbilities'][this.state.abil]['mod'];
    var prof = this.props.character['charProficiencyBonus']['score'];
    var attacks = [];
    var charges = [];

    // add proficiency bonus
    if (this.state.prof) bonus += prof;

    // compile list of attacks
    charAttacks.forEach(function(attack, i) {
      attacks.push(
        <Panel className="no-padding" bsStyle="warning" key={i} header={attack.name} eventKey={i}>
            <p>{attack.desc}</p>
        </Panel>
      );
    }.bind(this));

    // render class charges
    this.props.character['charClassCharges'].forEach(function(resource, i) {
      var slots = [];

      for (var j = 0; j < resource['charges']; j++) {
        slots.push(
          <Col key={j} xs={1}><input type="checkbox" /></Col>
        );
      }

      charges.push(
        <Panel key={i}>
          <div className="slots">
            <p>{resource.name}</p>
            <Grid fluid>
              <Row>
                {slots}
              </Row>
            </Grid>
          </div>
        </Panel>
      );
    });


    // render the component
    return (
      <div className="container-fluid">
        <h3>
          {"Attacks"} 
          <Button className="no-border" onClick={this.handleAttackClose}><Glyphicon glyph="cog"/></Button>
          <OverlayTrigger placement="bottom" trigger="click" overlay={
            <Tooltip>
              <p>{"Class points like 'Ki', 'Rage', or 'Sorcery' can be modified in 'Features' ("} <Glyphicon glyph="flash" /> {")"}</p>
              <p>{"Tap 'Attack Bonus' to configure the ability score it uses and if you have proficiency"}</p>
            </Tooltip>
          }>
            <Button className="no-border">
              <Glyphicon glyph="question-sign"/>
            </Button>
          </OverlayTrigger>
        </h3>    
        <Panel className="text-center">
          <p>{"Attack Bonus"}</p>
          <OverlayTrigger trigger="click" placement="bottom" overlay={
            <Popover title="Attack Bonus Config">
              <div>
                <Input type="select" label='Ability Mod' defaultValue="str" onChange={this.handleSelectAbil}>
                  <option value="str">str</option>
                  <option value="dex">dex</option>
                  <option value="con">con</option>
                  <option value="int">int</option>
                  <option value="wis">wis</option>
                  <option value="cha">cha</option>
                </Input>
                <Input type="checkbox" label="Proficient" onChange={this.handleProficient} />
              </div>
            </Popover>
          }>
            <h3 className={"bonus text-center" + ((this.state.prof === true) ? " trained" : "")}>{bonus}</h3>
          </OverlayTrigger>
          <p>{this.state.abil.toUpperCase() + ((this.state.prof === true) ? " + PROF" : "")}</p>
        </Panel>

        {charges}

        <Accordion defaultActiveKey="">
          {attacks}
        </Accordion>
      </div>
    )
  }
})

module.exports = Attack;