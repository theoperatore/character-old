var React = require('react');
var Immutable = require('immutable');

var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');
var Input = require('react-bootstrap/lib/Input');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Button = require('react-bootstrap/lib/Button');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');

var SettingsFeatures = React.createClass({
  getInitialState : function() {
    var state = {};

    state.mode = 0;
    state.idx = -1;
    state.enableCharges = false;

    state.name = "";
    state.desc = "";
    state.charges = "";
    state.display = "";

    state.newName = "";
    state.newDesc = "";
    state.newCharges = "";
    state.newDisplay = "";

    state.chargeserror = false;

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

    //state.mode = 0;
    state.idx = -1;
    state.enableCharges = false;

    state.name = "";
    state.desc = "";
    state.charges = "";
    state.display = "";

    state.newName = "";
    state.newDesc = "";
    state.newCharges = "";
    state.newDisplay = "";

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
    var name = tmp.getIn(['charFeatures', this.state.idx, 'name']);
    var feat;
    var clsCrgs;

    // if mistake, stop deleting!
    if (!confirm("Do you really want to get rid of\n '" + name + "'\n forever?")) return;

    // first check for class charges
    feat = tmp.getIn(['charFeatures', this.state.idx]);
    if (feat.get('idx') !== undefined) {
      tmp = tmp.update('charClassCharges', function(list) {
        return list.splice(feat.get('idx'), 1);
      })

      // update other class charges with new index
      tmp.get('charClassCharges').forEach(function(charge, idx) {
        tmp.get('charFeatures').forEach(function(feat, i) {
          if (feat.get('name') === charge.get('name')) {
            tmp = tmp.setIn(['charFeatures', i, 'idx'], idx);
          }
        })
      })
    }
    
    // splice the feat
    tmp = tmp.update('charFeatures', function(list) {
      return list.splice(this.state.idx, 1);
    }.bind(this))

    path += "." + name;

    // save and close
    this.props.edit({ path : path, character : tmp });
    this.clearState();
  },
  handleSelect : function(e) {
    var tmp = this.props.character;
    var idx = parseInt(e.target.value, 10);
    var feat = tmp.getIn(['charFeatures', idx]);
    var charges = tmp.get('charClassCharges');
    var name = (idx === -1) ? "" : feat.get('name');
    var desc = (idx === -1) ? "" : feat.get('desc');
    var charge = feat.get("idx");
    var state = {};

    if (charge !== undefined) {
      state.enableCharges = true;
      state.newCharges = charges.getIn([charge, 'charges']);
      state.newDisplay = charges.getIn([charge, 'display']);
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
        crgs.used = 0;
        crgs.display = (this.state.display === "") 
                       ? this.state.name
                       : this.state.display;

        // push new class charges node and link with feature
        tmp = tmp.update('charClassCharges', function(list) {
          return list.push(new Immutable.Map(crgs));
        })

        data.idx = tmp.get('charClassCharges').size - 1;
        path += ".withCharges." + this.state.charges;
      }

      //tmp['charFeatures'].push(data);
      tmp = tmp.update('charFeatures', function(list) {
        return list.push(new Immutable.Map(data));
      })
    }

    // editing existing feature
    else if (this.state.mode === 1) {
      if (this.state.edit === -1) return;

      tmp = tmp.update('charFeatures', function(list) {
        return list.update(this.state.idx, function(feat) {
          var clone = feat;

          clone = clone.set('name', this.state.newName);
          clone = clone.set('desc', this.state.newDesc);

          return clone;
        }.bind(this))
      }.bind(this))

      path += ".edit." + this.state.newName;

      // handle class feature change
      if (tmp.getIn(['charFeatures', this.state.idx, 'idx']) !== undefined) {
        if (this.state.chargeserror) return;

        idx = tmp.getIn(['charFeatures', this.state.idx, 'idx']);
        tmp = tmp.updateIn(['charClassCharges', idx], function(charge) {
          var clone = charge;

          clone = clone.set('name', this.state.newName);
          clone = clone.set('desc', this.state.newDesc);
          clone = clone.set('charges', this.state.newCharges);
          clone = clone.set('display', this.state.newDisplay);

          return clone;
        }.bind(this));

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
        <p>{"Here you can add a class feature when you receive it. You can also specify if the class feature you are adding gives your character class charges (ex: Rages, Sorcery Points, Ki, etc)."}</p>
        <Input placeholder="name" value={this.state.name} type="text" label="Feature Name" onChange={this.handleChange.bind(this, "name")}/>
        <Input placeholder="short description" value={this.state.desc} type="textarea" label="Feature Description" onChange={this.handleChange.bind(this, "desc")}/>
        <Input type="checkbox" label="gives class charges?" checked={this.state.enableCharges} onChange={this.toggleCharges}/>
        <Input disabled={(this.state.enableCharges) ? false : true} placeholder="Class Charges Name" type="text" label="Display Name" help="If left blank, will use feature name" onChange={this.handleChange.bind(this, "display")} value={this.state.display}/>
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
    this.props.character.get('charFeatures').forEach(function(feat, i) {
      features.push(
        <option key={i} value={i}>{feat.get('name')}</option>
      );
    });

    return (
      <div>
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
        <Input disabled={(this.state.enableCharges) ? false : true} placeholder="New Class Charges Name" type="text" label="New Display Name" onChange={this.handleChange.bind(this, "newDisplay")} value={this.state.newDisplay} />
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
      <div className="settings-tear">
        <h3>{"Add / Edit Features"}</h3>
        <TabbedArea activeKey={this.state.mode} animation={false} onSelect={this.handleMode}>
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

module.exports = SettingsFeatures;