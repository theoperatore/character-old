var React = require('react');

var Input = require('react-bootstrap/lib/Input');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Button = require('react-bootstrap/lib/Button');
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');

var SettingsEquip = React.createClass({
  getInitialState : function () {
    var state = {};

    state.name = "";
    state.desc = "";
    state.mode = 0;
    state.newName = "";
    state.newDesc = "";
    state.idx = -1;
    state.moneyIdx = -1;
    state.money = "";

    return (state);
  },
  toggle : function() {
    this.props.hatchToggle();
  },
  componentDidUpdate : function() {
    // recalculate this 
    this.props.recalculate();
  },
  clearState : function() {
    var state = {};

    state.name = "";
    state.desc = "";
    //state.mode = 0;
    state.newName = "";
    state.newDesc = "";
    state.idx = -1;
    state.moneyIdx = -1;
    state.money = "";

    this.setState(state);
  },
  handleModeChange : function(mode) {
    this.setState({ mode : mode });
  },
  handleChange : function(cmp, e) {
    var node = {};
    node[cmp] = e.target.value;
    this.setState(node);
  },
  handleMoneySelect : function(e) {
    var state = {};

    if (e.target.value === -1) return;

    state.moneyIdx = e.target.value;
    state.money = this.props.character['charEquipment']['money'][state.moneyIdx];

    this.setState(state);
  },
  handleSelect : function(e) {
    var idx = parseInt(e.target.value, 10);
    var node = this.props.character['charEquipment']['otherEquipment'][idx];
    var name = (idx === -1) ? "" : node.name;
    var desc = (idx === -1) ? "" : node.desc;
    var state = {};

    state.idx = idx;
    state.newName = name;
    state.newDesc = desc;
    
    this.setState(state);
  },
  handleDelete : function() {
    var tmp = this.props.character;
    var path = "charEquipment.delete.";
    var name = tmp['charEquipment']['otherEquipment'][this.state.idx].name;
    var equip;

    // if mistake, stop deleting!
    if (!confirm("Do you really want to get rid of\n '" + name + "'\n forever?")) return;

    equip = tmp['charEquipment']['otherEquipment'].splice(this.state.idx, 1);
    path += equip[0].name;

    // save
    this.props.edit({ path : path, character : tmp });
    this.clearState();
  },
  handleOk : function() {
    var tmp = this.props.character;
    var path = "charEquipment.";
    var data = {};

    // add
    if (this.state.mode === 0) {
      if (this.state.name === "") return;

      data.name = this.state.name;
      data.desc = this.state.desc;

      path += "add." + this.state.name;
      tmp['charEquipment']['otherEquipment'].push(data);
    }

    // edit
    else if (this.state.mode === 1) {
      if (this.state.idx === -1) return;

      path += "edit." + this.state.newName + ".idx." + this.state.idx; 
      tmp['charEquipment']['otherEquipment'][this.state.idx].name = this.state.newName;
      tmp['charEquipment']['otherEquipment'][this.state.idx].desc = this.state.newDesc;
    }

    // edit money
    else if (this.state.mode === 2) {
      if (this.state.moneyIdx === -1) return;
      if (isNaN(parseInt(this.state.money, 10))) return;

      path += "edit.money." + this.state.moneyIdx + "." + this.state.money;
      tmp['charEquipment']['money'][this.state.moneyIdx] = parseInt(this.state.money, 10);

    }

    this.props.edit({ path : path, character : tmp });
    this.clearState();
  },
  renderAdd : function() {
    return (
      <div>
        <p>{"Enter the name and a short description of a new equipment!"}</p>
        <Input placeholder="name" value={this.state.name} type="text" label="Equipment Name" onChange={this.handleChange.bind(this, "name")}/>
        <Input placeholder="short description" value={this.state.desc} type="textarea" label="Equipment Description" onChange={this.handleChange.bind(this, "desc")}/>
         <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success" onClick={this.handleOk}>Save</Button>
        </ButtonToolbar>
      </div>
    );
  },
  renderEdit : function() {

    // populate the select box
    var equips = [];
    this.props.character['charEquipment']['otherEquipment'].forEach(function(equip, i) {
      equips.push(
        <option key={i} value={i}>{equip.name}</option>
      );
    }); 

    return (
      <div>
        <p>{"Change something you definitely don't like about equipment pieces..."}</p>
        <Input>
          <Row>
            <Col xs={8}>
              <Input type="select" onChange={this.handleSelect} value={this.state.idx}>
                <option value={-1}>{"Select an Equipment"}</option>
                {equips}
              </Input>
            </Col>
            <Col xs={4}>
              <Button disabled={(this.state.idx === -1) ? true : false} bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
            </Col>
          </Row>
        </Input>
        <Input disabled={(this.state.idx === -1) ? true : false} type="text" onChange={this.handleChange.bind(this, "newName")} placeholder={"equipmen name"} value={this.state.newName} label={"New Equipment Name"}/>
        <Input disabled={(this.state.idx === -1) ? true : false} type="textarea" onChange={this.handleChange.bind(this, "newDesc")} placeholder={"equipment desc"} value={this.state.newDesc} label={"New Equipment Description"}/>
        <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success" onClick={this.handleOk}>Save</Button>
        </ButtonToolbar>
      </div>
    );
  },
  renderMoney : function() {

    return (
      <div>
        <p>{"Add money!"}</p>
        <Input type="select" onChange={this.handleMoneySelect} value={this.state.moneyIdx}>
          <option value={-1}>{"Select a Unit"}</option>
          <option value={"cp"}>{"Copper"}</option>
          <option value={"sp"}>{"Silver"}</option>
          <option value={"ep"}>{"Eternium"}</option>
          <option value={"gp"}>{"Gold"}</option>
          <option value={"pp"}>{"Platinum"}</option>
        </Input>
        <Input disabled={this.state.moneyIdx === -1 ? true : false} type="number" value={this.state.money} onChange={this.handleChange.bind(this, "money")} label={"Enter Money!"}/>
        <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success" onClick={this.handleOk}>Save</Button>
        </ButtonToolbar>
      </div>
    );
  },
  render : function() {
    return (
      <div className="settings-tear">
        <h3>{"Add / Edit Equipments"}</h3>
        <TabbedArea activeKey={this.state.mode} animation={false} onSelect={this.handleModeChange}>
          <TabPane eventKey={0} tab="new">
            {this.renderAdd()}
          </TabPane>
          <TabPane eventKey={1} tab="edit">
            {this.renderEdit()}
          </TabPane>
          <TabPane eventKey={2} tab="money">
            {this.renderMoney()}
          </TabPane>
        </TabbedArea>
      </div>
    );
  }
})

module.exports = SettingsEquip;