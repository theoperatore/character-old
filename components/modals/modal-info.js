var React = require('react');
var Modal = require('react-bootstrap/Modal');
var Input = require('react-bootstrap/Input');
var Button = require('react-bootstrap/Button');
var Alert = require('react-bootstrap/Alert');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');

var InfoModal = React.createClass({
  getInitialState : function() {
    var state = {};

    state.cls = "";
    state.lvl = "";
    state.xp = "";
    state.bg  = "";
    state.race = "";
    state.align = "";
    state.alert = false;
    state.alertMsg = "";
    state.alertType = "";

    return (state);
  },
  handleChange : function(cmp, e) {
    var node = {};
    node[cmp] = e.target.value;
    this.setState(node);
  },
  handleOk : function() {
    var tmp = this.props.character;
    var path = "charInfo";

    if (this.state.cls !== "") { 
      tmp['charInfo']['class'] = this.state.cls;
      path += ".class." + this.state.cls;
    }
    if (this.state.lvl !== "") {
      var lvl = parseInt(this.state.lvl,10);

      if (isNaN(lvl)) {
        this.setState({ 
          alert : true,
          alertMsg : "Yo! Enter a number for your level! Any number will do, just so that it's a valid decimal number.",
          alertType : "lvl"
        });
        return;
      }
      
      tmp['charInfo']['level'] = lvl; 
      path += ".level." + this.state.lvl;
    }
    if (this.state.xp !== "") { 
      var xp = parseInt(this.state.xp,10);

      if (isNaN(xp)) {
        this.setState({ 
          alert : true,
          alertMsg : "Yo! Enter a number for your XP! Any number will do, just so that it's a valid decimal number.",
          alertType : "xp"
        });
        return;
      }
      // test for NaN first
      tmp['charInfo']['xp'] = xp; 
      path += ".xp." + this.state.xp;
    }
    if (this.state.bg !== "") { 
      tmp['charInfo']['background'] = this.state.bg; 
      path += ".background." + this.state.bg;
    }
    if (this.state.race !== "") { 
      tmp['charInfo']['race'] = this.state.race; 
      path += ".race." + this.state.race;
    }
    if (this.state.align !== "") { 
      tmp['charInfo']['alignment'] = this.state.align; 
      path += ".alignment." + this.state.align;
    }
    
    this.props.ok({ path : path, character : tmp });
    this.props.close();
  },
  handleAlert : function() {
    this.setState({ alert : false, alertMsg : "" });
  },
  render : function() {
    var alert;
    var validationLvl = "";
    var validationXp = "";

    if (this.state.alertType === "xp") {
      validationXp = "error";
    }

    if (this.state.alertType === "lvl") {
      validationLvl = "error";
    }

    if (this.state.alert) {
      alert = (
        <Alert bsStyle="danger" onDismiss={this.handleAlert}>
          <h4>{"Critical Failure!"}</h4>
          <p>{this.state.alertMsg}</p>
        </Alert>
      );
    }
    else {
      alert = <span />;
    }

    return (
      <Modal onRequestHide={this.props.close} title="Edit Info">
        <div className="modal-body">
          <p>{"Enter a new value for any Character Info. If a field is left blank and no new values are entered, nothing will be changed."}</p>
          {alert}
          <Input>
            <Row>
              <Col xs={6}>
                <Input type="text" onChange={this.handleChange.bind(this, "cls")} label="Class" placeholder={this.props.character['charInfo']['class']} value={this.state.cls} />
              </Col>
              <Col xs={6}>
                <Input type="text" onChange={this.handleChange.bind(this, "race")} label="Race" placeholder={this.props.character['charInfo']['race']} value={this.state.race} />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Input type="text" bsStyle={validationLvl} onChange={this.handleChange.bind(this, "lvl")} label="Level" placeholder={this.props.character['charInfo']['level']} value={this.state.lvl} />
              </Col>
              <Col xs={6}>
                <Input type="text" bsStyle={validationXp} onChange={this.handleChange.bind(this, "xp")} label="Xp" placeholder={this.props.character['charInfo']['xp']} value={this.state.xp} />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Input type="text" onChange={this.handleChange.bind(this, "bg")} label="Background" placeholder={this.props.character['charInfo']['background']} value={this.state.bg} />
              </Col>
              <Col xs={6}>
                <Input type="text" onChange={this.handleChange.bind(this, "align")} label="Alignment" placeholder={this.props.character['charInfo']['alignment']} value={this.state.align} />
              </Col>
            </Row>
          </Input>
        </div>
        <div className="modal-footer">
          <Button bsStyle="danger"  onClick={this.props.close}>Close</Button>
          <Button bsStyle="success" onClick={this.handleOk}>Save</Button>
        </div>
      </Modal>
    );
  }
})

module.exports = InfoModal;