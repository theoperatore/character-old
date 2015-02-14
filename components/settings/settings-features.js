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
    state.idx = -1;
    state.enableCharges = false;

    state.name = "";
    state.desc = "";
    state.charges = "";

    state.newName = "";
    state.newDesc = "";
    state.newCharges = "";

    state.chargeserror = false;

    return (state);
  },
  toggle : function() {
    this.refs.settings.toggle();
  },
  clearState : function() {
    var state = {};

    //state.mode = 0;
    state.idx = -1;
    state.enableCharges = false;

    state.name = "";
    state.desc = "";
    state.charges = "";

    state.newName = "";
    state.newDesc = "";
    state.newCharges = "";

    state.chargeserror = false;

    this.setState(state);
  },
  toggleCharges : function() {
    this.setState({ enableCharges : !this.state.enableCharges });
  },
  handleMode : function(key) {
    this.clearState();
    this.setState({ mode : key });
  },
  handleChange : function(cmp, e) {
    var node = {};
    var val;

    if (cmp === "charges" || cmp === "newCharges") {
      val = parseInt(e.target.value, 10);

      if (isNaN(val)) {
        val = e.target.value;
        this.setState({ chargeserror : true });
      }
      else {
        this.setState({ chargeserror : false });
      }
    }

    node[cmp] = val || e.target.value;
    this.setState(node);
  },
  handleDelete : function() {
    var tmp = this.props.character;
    var path = "charFeatures.delete";
    var name = tmp['charFeatures'][this.state.idx].name;
    var feat;
    var clsCrgs;

    // if mistake, stop deleting!
    if (!confirm("Do you really want to get rid of\n '" + name + "'\n forever?")) return;

    feat = tmp['charFeatures'].splice(this.state.idx, 1);
    path += "." + feat[0].name;

    // if this feat is tied to class charges remove them too
    if (feat[0].idx !== undefined) {
      clsCrgs = tmp['charClassCharges'].splice(feat[0].idx, 1);
      path += ".clearClassCharges." + clsCrgs[0].charges;
    }

    // save and close
    this.props.edit({ path : path, character : tmp });
    this.clearState();
  },
  handleSelect : function(e) {
    var tmp = this.props.character;
    var idx = parseInt(e.target.value, 10);
    var feat = tmp['charFeatures'][idx];
    var charges = tmp['charClassCharges'];
    var name = (idx === -1) ? "" : feat.name;
    var desc = (idx === -1) ? "" : feat.desc;
    var charge = feat.idx;
    var state = {};

    if (charge !== undefined) {
      state.enableCharges = true;
      state.newCharges = charges[charge]['charges'];  
    }
    
    state.idx = idx;
    state.newName = name;
    state.newDesc = desc;
    
    this.setState(state);
  },
  handleOk : function() {
    var tmp = this.props.character;
    var path = "charFeatures";
    var data = {};
    var crgs = {};
    var idx;

    // adding new feature
    if (this.state.mode === 0) {
      if (this.state.name === "") return;

      data.name = this.state.name;
      data.desc = this.state.desc;
      path += ".add." + data.name;

      // handle adding class charges
      if (this.state.enableCharges && this.state.charges !== "" ) {
        if (this.state.chargeserror) return;

        crgs.name = this.state.name;
        crgs.charges = this.state.charges;

        // push new class charges node and link with feature
        tmp['charClassCharges'].push(crgs);
        data.idx = tmp['charClassCharges'].length -1;

        path += ".withCharges." + this.state.charges;
      }

      tmp['charFeatures'].push(data);
    }

    // editing existing feature
    else if (this.state.mode === 1) {
      if (this.state.edit === -1) return;

      tmp['charFeatures'][this.state.idx].name = this.state.newName;
      tmp['charFeatures'][this.state.idx].desc = this.state.newDesc;
      path += ".edit." + this.state.newName;

      // handle class feature change
      if (tmp['charFeatures'][this.state.idx].idx !== undefined) {
        if (this.state.chargeserror) return;

        idx = tmp['charFeatures'][this.state.idx].idx;
        tmp['charClassCharges'][idx].name = this.state.newName;
        tmp['charClassCharges'][idx].charges = this.state.newCharges;
        path += ".editCharges." + this.state.newCharges;
      }
    }
      
    // save and close
    this.props.edit({ path : path, character : tmp });
    this.clearState();
  },
  renderAdd : function() {
    var validcharges = (this.state.chargeserror) ? "error" : "success";

    return (
      <div>
        <h3>{"Add New Feature"}</h3>
        <p>{"Here you can add a class feature when you receive it. You can also specify if the class feature you are adding gives your character class charges (ex: Rages, Sorcery Points, Ki, etc)."}</p>
        <Input placeholder="name" value={this.state.name} type="text" label="Feature Name" onChange={this.handleChange.bind(this, "name")}/>
        <Input placeholder="short description" value={this.state.desc} type="textarea" label="Feature Description" onChange={this.handleChange.bind(this, "desc")}/>
        <Input type="checkbox" label="gives class charges?" checked={this.state.enableCharges} onChange={this.toggleCharges}/>
        <Input bsStyle={(this.state.charges === "") ? null : validcharges} disabled={(this.state.enableCharges) ? false : true} placeholder="check box to enable" type="text" label="Number of Charges" help="(Ki, Rages, Sorcery, etc)?" onChange={this.handleChange.bind(this, "charges")} value={this.state.charges}/>
        <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success" onClick={this.handleOk}>Save</Button>
        </ButtonToolbar>
      </div>
    );
  },
  renderEdit : function() {

    var validcharges = (this.state.chargeserror) ? "error" : "success";

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
              <Input type="select" onChange={this.handleSelect} value={this.state.idx}>
                <option value={-1}>{"Select a Feature"}</option>
                {features}
              </Input>
            </Col>
            <Col xs={4}>
              <Button disabled={(this.state.idx === -1) ? true : false} bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
            </Col>
          </Row>
        </Input>
        <Input disabled={(this.state.idx === -1) ? true : false} type="text" onChange={this.handleChange.bind(this, "newName")} label="New Feature Name" value={this.state.newName} />
        <Input disabled={(this.state.idx === -1) ? true : false} type="textarea" onChange={this.handleChange.bind(this, "newDesc")} label="New Feature Description" value={this.state.newDesc} />
        <Input bsStyle={(this.state.newCharges === "") ? null : validcharges} disabled={(this.state.enableCharges) ? false : true} type="text" onChange={this.handleChange.bind(this, "newCharges")} placeholder={"number of charges"} label={"New Amount of Class Charges"} value={this.state.newCharges} />
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