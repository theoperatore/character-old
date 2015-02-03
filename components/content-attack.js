var React = require('react');
var Glyphicon = require('react-bootstrap/Glyphicon');
var Accordion = require('react-bootstrap/Accordion');
var Panel = require('react-bootstrap/Panel');
var Input = require('react-bootstrap/Input');
var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var OverlayTrigger = require('react-bootstrap/OverlayTrigger');
var OverlayMixin = require('react-bootstrap/OverlayMixin');
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
      spell: "wis",
      needsAttack : false,
      name : "",
      desc : ""
    });
  },
  handleProficient : function(e) {
    this.setState({ prof : e.target.checked });
  },
  handleSelectAttack : function(e) {
    this.setState({ abil : e.target.value });
  },
  handleSelectSpell : function(e) {
    this.setState({ spell : e.target.value });
  },
  handleAttackClose : function() {
    this.setState({ needsAttack : !this.state.needsAttack });
  },
  handleAttackAdd : function() {
    this.handleAttackClose();
  },
  handleAttackName : function(e) {
    this.setState({ name : e.target.value });
  },
  handleAttackDesc : function(e) {
    this.setState({ desc : e.target.value });
  },
  renderOverlay : function() {
    if (!this.state.needsAttack) return <span/>;

    return (
      <Modal title="Add New Attack!" onRequestHide={this.handleAttackClose}>
        <div className="modal-body">
          <Input value={this.state.name} type="text" label="Attack Name" onChange={this.handleAttackName}/>
          <Input value={this.state.desc} type="text" label="Attack Desc" onChange={this.handleAttackDesc}/>
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
    var attacks = [];

    charAttacks.forEach(function(attack, i) {
      attacks.push(
        <Panel key={i} header={attack.name} eventKey={i}>
            <p>{attack.desc}</p>
        </Panel>
      );
    }.bind(this));

    var bonus = this.props.character['charAbilities'][this.state.abil]['mod'];
    var prof = this.props.character['charProficiencyBonus']['score'];
    var spell = this.props.character['charAbilities'][this.state.spell]['mod'];
    if (this.state.prof) bonus += prof;

    // render class charges
    var charges = [];
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


    return (
      <div className="container-fluid">
        <h3>{"Attacks"} <Button className="no-border" onClick={this.handleAttackClose}><Glyphicon glyph="plus-sign"/></Button></h3>    
        <Panel className="text-center">
          <p>{"Attack Bonus"}</p>
          <OverlayTrigger trigger="click" placement="bottom" overlay={
            <Popover title="Attack Bonus Config">
              <div>
                <Input type="select" label='Ability Mod' defaultValue="str" onChange={this.handleSelectAttack}>
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