var React = require('react');

var Input = require('react-bootstrap/lib/Input');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Button = require('react-bootstrap/lib/Button');

var SettingsDefenses = React.createClass({
  getInitialState : function() {
    var state = {};

    state.hp = "";
    state.ac = "";
    state.init = "";
    state.speed  = "";
    state.hitdice = "";

    state.hperror = false;
    state.acerror = false;
    state.initerror = false;

    return (state);
  },
  toggle : function() {
    this.props.hatchToggle();
  },
  clearState : function() {
    var state = {};

    state.hp = "";
    state.ac = "";
    state.init = "";
    state.speed  = "";
    state.hitdice = "";

    state.hperror = false;
    state.acerror = false;
    state.initerror = false;

    this.setState(state);
  },
  handleChange : function(cmp, e) {
    var node = {};
    var val;
    var error;

    // parse hp, ac, init. error if nan
    if (cmp === "hp" || cmp === "ac" || cmp === "init") {
      val = parseInt(e.target.value, 10);
      
      if (isNaN(val)) {
        error = {};
        error[cmp+"error"] = true;
        this.setState(error);
      }
      else {
        error = {};
        error[cmp+"error"] = false;
        this.setState(error); 
      }
    }

    node[cmp] = val || e.target.value;
    this.setState(node);
  },
  handleOk : function() {
    var tmp = this.props.character;
    var path = "charDefenses.edit.";

    // don't save if there is an error
    if (this.state.hperror || this.state.acerror || this.state.initerror) return;

    if (this.state.hp !== "") {
      //tmp['charHitPoints']['maximum'] = this.state.hp;
      tmp = tmp.setIn(['charHitPoints', 'maximum'], this.state.hp);
      path += "hp." + this.state.hp;
    }

    if (this.state.ac !== "") {
      //tmp['charArmorClass']['score'] = this.state.ac;
      tmp = tmp.setIn(['charArmorClass', 'score'], this.state.ac);
      path += ".ac." + this.state.ac;
    }

    if (this.state.init !== "") {
      //tmp['charInitiative']['score'] = this.state.init;
      tmp = tmp.setIn(['charInitiative', 'score'], this.state.init);
      path += ".init." + this.state.init;
    }

    if (this.state.speed !== "") {
      //tmp['charSpeed']['score'] = this.state.speed;
      tmp = tmp.setIn(['charSpeed', 'score'], this.state.speed);
      path += ".speed." + this.state.speed;
    }

    if (this.state.hitdice !== "") {
      //tmp['charHitPoints']['hitDiceTotal'] = this.state.hitdice;
      tmp = tmp.setIn(['charHitPoints', 'hitDiceTotal'], this.state.hitdice);
      path += ".hitdice." + this.state.hitdice;
    }

    this.props.edit({ path : path, character : tmp });
    this.clearState();
    this.toggle();
  },
  render : function() {
    var validhp = (this.state.hperror) ? "error" : "success";
    var validac = (this.state.acerror) ? "error" : "success";
    var validinit = (this.state.initerror) ? "error" : "success";

    return (
      <div className="settings-tear">
        <h3>{"Edit Defenses"}</h3>
        <p>{"Edit the values for your character's maximum hit points, hit dice, initiative, speed, and armor class."}</p>
        <Input type="text" bsStyle={(this.state.hp === "") ? null : validhp} onChange={this.handleChange.bind(this, "hp")} label="Maximum Hit Points" placeholder={this.props.character.getIn(['charHitPoints', 'maximum'])} value={this.state.hp} />
        <Input type="text" bsStyle={(this.state.ac === "") ? null : validac} onChange={this.handleChange.bind(this, "ac")} label="Armor Class" placeholder={this.props.character.getIn(['charArmorClass', 'score'])} value={this.state.ac} />
        <Input type="text" bsStyle={(this.state.init === "") ? null : validinit} onChange={this.handleChange.bind(this, "init")} label="initiative" placeholder={this.props.character.getIn(['charInitiative', 'score'])} value={this.state.init} />
        <Input type="text" onChange={this.handleChange.bind(this, "speed")} label="Speed (ft)" placeholder={this.props.character.getIn(['charSpeed', 'score'])} value={this.state.speed} />
        <Input type="text" onChange={this.handleChange.bind(this, "hitdice")} label="Total Hit Dice" placeholder={this.props.character.getIn(['charHitPoints', 'hitDiceTotal'])} value={this.state.hitdice} />
        <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success" onClick={this.handleOk}>Save</Button>
        </ButtonToolbar>
      </div>
    );
  }
})

module.exports = SettingsDefenses;