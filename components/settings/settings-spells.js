var React = require('react');
var Settings = require('./settings-tear');

var Input = require('react-bootstrap/Input');
var ButtonToolbar = require('react-bootstrap/ButtonToolbar');
var Button = require('react-bootstrap/Button');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');

var SettingsSpells = React.createClass({
  getInitialState : function () {
    var state = {};

    state.mode = 0;

    // add mode state
    state.name = "";
    state.desc = "";
    state.cmp = "";
    state.cast = "";
    state.dur = "";
    state.range = "";
    state.lvl = -1;

    // edit mode state
    state.newName = "";
    state.newDesc = "";
    state.newCmp = "";
    state.newCast = "";
    state.newDur = "";
    state.newRange = "";
    state.newLvl = -1;
    state.idx = -1;

    // spell slots state
    state.slotLvl = -1;
    state.newSlots = "";

    return (state);
  },
  toggle : function() {
    this.refs.settings.toggle();
  },
  clearState : function() {
    var state = {};

    //state.mode = 0;

    // add mode state
    state.name = "";
    state.desc = "";
    state.cmp = "";
    state.cast = "";
    state.dur = "";
    state.range = "";
    state.lvl = -1;

    // edit mode state
    state.newName = "";
    state.newDesc = "";
    state.newCmp = "";
    state.newCast = "";
    state.newDur = "";
    state.newRange = "";
    state.newLvl = -1;
    state.idx = -1;

    // spell slots state
    state.slotLvl = -1;
    state.newSlots = "";

    this.setState(state);
  },
  handleModeChange : function(mode) {
    this.setState({ mode : mode });
  },
  handleChange : function(cmp, e) {
    var node = {};
    node[cmp] = (cmp === "newLvl") ? parseInt(e.target.value) : e.target.value;
    this.setState(node);
  },
  handleSelect : function(e) {

    // user is adding a spell, this stands for spell level
    if (this.state.mode === 0) {
      this.setState({ lvl : parseInt(e.target.value,10) });
    }

    // user is editing spells
    else if (this.state.mode === 1) {
      var tmp = this.props.character['charSpells'];
      var parts = e.target.value.split("_");
      var lvl = parseInt(parts[0], 10);
      var idx = parseInt(parts[1], 10);
      var state = {};

      state.newName = tmp[lvl].spells[idx].name;
      state.newDesc = tmp[lvl].spells[idx].desc;
      state.newCmp = tmp[lvl].spells[idx].cmp;
      state.newCast = tmp[lvl].spells[idx].cast;
      state.newDur = tmp[lvl].spells[idx].dur;
      state.newRange = tmp[lvl].spells[idx].range;
      state.newLvl = lvl;
      state.idx = e.target.value;

      this.setState(state);
    }

    // user is editing spell slots per level
    else if (this.state.mode === 2) {
      var tmp = this.props.character['charSpells'];
      var lvl = parseInt(e.target.value,10);
      var slots = tmp[lvl].slots;

      this.setState({ slotLvl : lvl, newSlots : slots });
    }

  },
  handleDelete : function() {
    var tmp = this.props.character;
    var path = "charSpells.delete.";
    var lvl = parseInt(this.state.idx.split("_")[0], 10);
    var idx = parseInt(this.state.idx.split("_")[1], 10);
    var name = tmp['charSpells'][lvl]['spells'][idx].name;
    var spell;

    if (!confirm("Do you really want to get rid of\n '" + name + "'\n forever?")) return;

    spell = tmp['charSpells'][lvl]['spells'].splice(idx, 1)[0];
    path += spell.name;

    this.props.edit({ path : path, character : tmp });
    this.clearState();
  },
  handleOk : function() {
    var tmp = this.props.character;
    var path = "charSpells";
    var data = {};

    // adding a spell
    if (this.state.mode === 0) {
      if (this.state.name === "" || this.state.lvl === -1) return;

      data.name = this.state.name;
      data.desc = this.state.desc;
      data.cast = this.state.cast;
      data.range = this.state.range;
      data.dur = this.state.dur;
      data.cmp = this.state.cmp;

      path += ".add." + this.state.name + ".lvl." + this.state.lvl;
      tmp['charSpells'][this.state.lvl]['spells'].push(data);
    }

    // editing spells
    else if (this.state.mode === 1) {
      var oldLvl = parseInt(this.state.idx.split("_")[0], 10);
      var oldIdx = parseInt(this.state.idx.split("_")[1], 10);
      var spell;

      // handle splicing and pushing to new lvl; then editing
      if (oldLvl !== this.state.newLvl) { 
        path += ".edit.differentLvl." + this.state.newName + "." + this.state.newLvl;
        spell = tmp['charSpells'][oldLvl]['spells'].splice(oldIdx, 1)[0];

        spell.name = this.state.newName;
        spell.desc = this.state.newDesc;
        spell.range = this.state.newRange;
        spell.cmp = this.state.newCmp;
        spell.cast = this.state.newCast;
        spell.dur = this.state.newdur;

        tmp['charSpells'][this.state.newLvl]['spells'].push(spell);
      }

      // otherwise just edit the node directly
      else {
        path += ".edit.sameLvl." + this.state.newName;
        tmp['charSpells'][oldLvl]['spells'][oldIdx].name = this.state.newName;
        tmp['charSpells'][oldLvl]['spells'][oldIdx].desc = this.state.newDesc;
        tmp['charSpells'][oldLvl]['spells'][oldIdx].range = this.state.newRange;
        tmp['charSpells'][oldLvl]['spells'][oldIdx].cmp = this.state.newCmp;
        tmp['charSpells'][oldLvl]['spells'][oldIdx].cast = this.state.newCast;
        tmp['charSpells'][oldLvl]['spells'][oldIdx].dur = this.state.newdur;
      }
    }

    // editing spell slots per level
    else if (this.state.mode === 2) {
      if (this.state.newSlots === "" || this.state.newSlots === -1) return;

      tmp['charSpells'][this.state.slotLvl]['slots'] = this.state.newSlots;
      path += ".edit.spellSlots.level." + this.state.slotLvl + ".slots." + this.state.newSlots;

    }

    this.props.edit({ path : path, character : tmp });
    this.clearState();
  },
  renderAdd : function() {
    return (
      <div>
        <h3>{"Add new spell"}</h3>
        <p>{"Enter the info for each spell. The only required information is spell level and name--all other fields are optional."}</p>
        <Input type="text" label={"Name"} value={this.state.name} onChange={this.handleChange.bind(this, "name")}/>
        <Input type="select" label={"Spell Level"} value={this.state.lvl} onChange={this.handleSelect}>
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
        <Input type="textarea" label={"Description"} value={this.state.desc} onChange={this.handleChange.bind(this, "desc")}/>
        <Input type="text" label={"Range"} value={this.state.range} onChange={this.handleChange.bind(this, "range")}/>
        <Input type="text" label={"Components"} value={this.state.cmp} onChange={this.handleChange.bind(this, "cmp")}/>
        <Input type="text" label={"Casting Time"} value={this.state.cast} onChange={this.handleChange.bind(this, "cast")}/>
        <Input type="text" label={"Duration"} value={this.state.dur} onChange={this.handleChange.bind(this, "dur")}/>
        <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success" onClick={this.handleOk}>Save</Button>
        </ButtonToolbar>
      </div>
    );
  },
  renderEdit : function() {

    // set up spells list
    var spells = [];
    this.props.character['charSpells'].forEach(function(lvl, i) {
      var group = [];
      lvl.spells.forEach(function(sp, j) {
        group.push(
          <option key={"level"+i+"spell"+j} value={i+"_"+j} lvl={i}>{sp.name}</option>
        );
      });

      spells.push(
        <optgroup key={i} label={lvl.name}>
          {group}
        </optgroup>
      );
    });

    return (
      <div>
        <h3>{"Edit Spells"}</h3>
        <p>{"Select a spell to edit any detail. Be as thorough as possible."}</p>
        <Input>
          <Row>
            <Col xs={8}>
              <Input type="select" value={this.state.idx} onChange={this.handleSelect}>
                <option value={-1}>{"Select a Spell"}</option>
                {spells}
              </Input>
            </Col>
            <Col xs={4}>
              <Button disabled={(this.state.idx === -1) ? true : false} bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
            </Col>
          </Row>
        </Input>
        <Input type="text" label={"New Name"} value={this.state.newName} onChange={this.handleChange.bind(this, "newName")}/>
        <Input type="select" label={"New Spell Level"} value={this.state.newLvl} onChange={this.handleChange.bind(this, "newLvl")}>
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
        <Input type="textarea" label={"New Description"} value={this.state.newDesc} onChange={this.handleChange.bind(this, "newDesc")}/>
        <Input type="text" label={"New Range"} value={this.state.newRange} onChange={this.handleChange.bind(this, "newRange")}/>
        <Input type="text" label={"New Components"} value={this.state.newCmp} onChange={this.handleChange.bind(this, "newCmp")}/>
        <Input type="text" label={"New Casting Time"} value={this.state.newCast} onChange={this.handleChange.bind(this, "newCast")}/>
        <Input type="text" label={"New Duration"} value={this.state.newDur} onChange={this.handleChange.bind(this, "newDur")}/>
        <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success" onClick={this.handleOk}>Save</Button>
        </ButtonToolbar>
      </div>
    );
  },
  renderSpellSlots : function() {
    return (
      <div>
        <h3>{"Edit spell slots"}</h3>
        <p>{"Select a spell level and enter how many spell slots your character has for that level."}</p>
        <Input type="select" label={"Spell Level"} value={this.state.slotLvl} onChange={this.handleSelect}>
          <option value={-1}>{"Spell Level"}</option>
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
        <Input type="text" label={"New Amount of Spell Slots"} value={this.state.newSlots} onChange={this.handleChange.bind(this, "newSlots")}/>
        <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success" onClick={this.handleOk}>Save</Button>
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
          <TabPane eventKey={2} tab="slots">
            {this.renderSpellSlots()}
          </TabPane>
        </TabbedArea>
      </Settings>
    );
  }
})

module.exports = SettingsSpells;