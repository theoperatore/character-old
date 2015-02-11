// Main requires
var React = require('react');
var Modal = require('react-bootstrap/Modal');
var Input = require('react-bootstrap/Input');
var Button = require('react-bootstrap/Button');
var Alert = require('react-bootstrap/Alert');
var Panel = require('react-bootstrap/Panel');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var Alert = require('react-bootstrap/Alert');

// The modal object to export
var FeatureModal = React.createClass({

  getInitialState : function() {
    var state = {};

    state.name = "";
    state.desc = "";
    state.numCharges = "";
    state.mode = 0;
    state.newName = "";
    state.newDesc = "";
    state.newCharges = "";

    state.edit = -1;

    // holds the index into charClassCharges to edit
    state.editCharges = -1;
    state.charges = false;

    // alert for entering a number
    state.alert = false;

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
    var feat = this.props.character['charFeatures'][idx];
    var charges = this.props.character['charClassCharges'];
    var name = (idx === -1) ? "" : feat.name;
    var desc = (idx === -1) ? "" : feat.desc;
    var charge = feat.idx;
    var state = {};

    if (charge !== undefined) {
      state.editCharges = charge;
      state.newCharges = charges[charge]['charges'];  
    }

    
    state.edit = idx;
    state.newName = name;
    state.newDesc = desc;
    
    this.setState(state);
  },

  handleDelete : function() {
    var tmp = this.props.character;
    var path = "charFeatures.delete";
    var name = tmp['charFeatures'][this.state.edit].name;
    var feat;
    var clsCrgs;

    // if mistake, stop deleting!
    if (!confirm("Do you really want to get rid of\n '" + name + "'\n forever?")) return;

    feat = tmp['charFeatures'].splice(this.state.edit, 1);
    path += "." + feat[0].name;

    // if this feat is tied to class charges remove them too
    if (feat[0].idx !== undefined) {
      console.log(feat);
      clsCrgs = tmp['charClassCharges'].splice(feat[0].idx, 1);
      path += "." + clsCrgs[0].charges;
    }

    // save and close
    this.props.edit({ path : path, character : tmp });
    this.props.close();
  },

  handleOk : function() {
    var tmp = this.props.character;
    var path = "charFeatures";
    var data = {};
    var crgs = {};

    // adding new feature
    if (this.state.mode === 0) {

      // if the name isn't given, then don't add
      if (this.state.name === "") return;

      data.name = this.state.name;
      data.desc = this.state.desc;

      // if we need to add class charges
      if (this.state.numCharges !== "") {

        if (isNaN(parseInt(this.state.numCharges, 10))) {
          this.setState({ alert : true });
          return;
        }

        crgs.name = this.state.name;
        crgs.charges = parseInt(this.state.numCharges,10);

        tmp['charClassCharges'].push(crgs);
        data.idx = tmp['charClassCharges'].length - 1;
      }

      tmp['charFeatures'].push(data);
      path += ".add." + data.name;
    }

    // editing existing feature
    else if (this.state.mode === 1) {

      // if nothing is selected, don't change
      if (this.state.edit === -1) return;

      // handle new class charges
      var idx = tmp['charFeatures'][this.state.edit]['idx']; 
      if (idx !== undefined) {

        if (isNaN(parseInt(this.state.newCharges, 10))) {
          this.setState({ alert : true });
          return;
        }

        tmp['charClassCharges'][idx]['charges'] = parseInt(this.state.newCharges,10);
        tmp['charClassCharges'][idx]['name'] = this.state.newName;
      }

      // make the changes
      tmp['charFeatures'][this.state.edit].name = this.state.newName;
      tmp['charFeatures'][this.state.edit].desc = this.state.newDesc;
      

      // log the changes made
      path += ".edit." + tmp['charFeatures'][this.state.edit].name;
    }
      
    // save and close
    this.props.edit({ path : path, character : tmp });
    this.props.close();
  },

  enableCharges : function() {
    this.setState({ charges : !this.state.charges });
  },

  closeAlert : function() {
    this.setState({ alert : false });
  },

  render : function() {
    var alert;
    if (this.state.alert) {
      alert = (
        <Alert bsStyle="danger" onDismiss={this.closeAlert}>
          <h4>Critical Failure!</h4>
          <p>Class Charges must be a valid decimal number. #FFFFFF does not count...</p>
        </Alert>
      );
    }

    // populate the select box
    var features = [];
    this.props.character['charFeatures'].forEach(function(feat, i) {
      features.push(
        <option key={i} value={i}>{feat.name}</option>
      );
    }); 

    return (
      <Modal onRequestHide={this.props.close}>
        <div className="modal-body">
          <TabbedArea activeKey={this.state.mode} onSelect={this.handleModeChange}>
            
            <TabPane eventKey={0} tab="new">
              <div className="container-fluid">
                <h3>{"Add New Class Feature"}</h3>
                <p>{"Enter the name of the feature and a sort description."}</p>
                <Input placeholder="name" value={this.state.name} type="text" label="Feature Name" onChange={this.handleChange.bind(this, "name")}/>
                <Input placeholder="short description" value={this.state.desc} type="textarea" label="Feature Description" onChange={this.handleChange.bind(this, "desc")}/>
                <Input type="checkbox" onChange={this.enableCharges} label="gives class charges?" />
                {alert}
                <Input disabled={(this.state.charges === false) ? true : false} type="text" label="Number of Charges" placeholder="check box to enable" help="(Ki, Rages, Sorcery, etc)?" value={this.state.numCharges} onChange={this.handleChange.bind(this, "numCharges")}/>
              </div>
            </TabPane>

            <TabPane eventKey={1} tab="edit">
              <div className="container-fluid">
                <h3>{"Edit Class Features"}</h3>
                <p>{"Change the name or description of a feature by first selecting the feature to edit and then entering new values."}</p>
                <Input>
                  <Row>
                    <Col xs={8}>
                      <Input type="select" onChange={this.handleSelect} defaultSelected={-1}>
                        <option value={-1}>{"Select a Feature"}</option>
                        {features}
                      </Input>
                    </Col>
                    <Col xs={4}>
                      <Button disabled={(this.state.edit === -1) ? true : false} bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
                    </Col>
                  </Row>
                </Input>
                <Input disabled={(this.state.edit === -1) ? true : false} type="text" onChange={this.handleChange.bind(this, "newName")} placeholder={"feat name"} value={this.state.newName} label={"New Feature Name"}/>
                <Input disabled={(this.state.edit === -1) ? true : false} type="textarea" onChange={this.handleChange.bind(this, "newDesc")} placeholder={"feat desc"} value={this.state.newDesc} label={"New Feature Desc"}/>
                {alert}
                <Input disabled={(this.state.editCharges === -1) ? true : false} type="text" onChange={this.handleChange.bind(this, "newCharges")} placeholder={"number of charges"} label={"New Amount of Class Charges"} value={this.state.newCharges} />
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
module.exports = FeatureModal;