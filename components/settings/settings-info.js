var React = require('react');
var Settings = require('./settings-tear');

var Input = require('react-bootstrap/Input');
var ButtonToolbar = require('react-bootstrap/ButtonToolbar');
var Button = require('react-bootstrap/Button');

var SettingsInfo = React.createClass({
  getInitialState : function() {
    var state = {};

    state.cls = "";
    state.lvl = "";
    state.xp = "";
    state.bg  = "";
    state.race = "";
    state.align = "";

    state.lvlerror = false;
    state.xperror = false;

    return (state);
  },
  toggle : function() {
    this.refs.settings.toggle();
  },
  clearState : function() {
    var state = {};

    state.cls = "";
    state.lvl = "";
    state.xp = "";
    state.bg  = "";
    state.race = "";
    state.align = "";

    state.lvlerror = false;
    state.xperror = false;

    this.setState(state);
  },
  handleChange : function(cmp, e) {
    var node = {};
    var err;
    var val;

    if (cmp === "lvl" || cmp === "xp") {
      val = parseInt(e.target.value, 10);

      if (isNaN(val)) {
        err = {};
        err[cmp+"error"] = true;
        this.setState(err);
        val = e.target.value
      }
      else {
        err = {};
        err[cmp+"error"] = false;
        this.setState(err);
      }
    }

    node[cmp] = val || e.target.value;
    this.setState(node);
  },
  handleOk : function() {
    var tmp = this.props.character;
    var path = "charInfo.edit.";

    if (this.state.cls !== "") {
      tmp['charInfo']['class'] = this.state.cls;
      path += "class." + this.state.cls;
    }

    if (this.state.lvl !== "") {
      if (this.state.lvlerror) return;
      tmp['charInfo']['level'] = this.state.lvl;
      path += "level." + this.state.lvl;
    }

    if (this.state.xp !== "") {
      if (this.state.xperror) return;
      tmp['charInfo']['xp'] = this.state.xp;
      path += "xp." + this.state.xp;
    }

    if (this.state.bg !== "") {
      tmp['charInfo']['background'] = this.state.bg;
      path += "background." + this.state.bg;
    }

    if (this.state.race !== "") {
      tmp['charInfo']['race'] = this.state.race;
      path += "race." + this.state.race;
    }

    if (this.state.align !== "") {
      tmp['charInfo']['alignment'] = this.state.align;
      path += "alignment." + this.state.align;
    }

    this.props.edit({ path : path, character : tmp });
    this.clearState();
    this.toggle();
  },
  render : function() {
    var validlvl = (this.state.lvlerror) ? "error" : "success";
    var validxp = (this.state.xperror) ? "error" : "success";

    return (
      <Settings ref="settings" activeOpen={true}>
        <h3>{"Edit Character Info"}</h3>
        <p>{"Enter a new value for any Character Info. If a field is left blank and no new values are entered, nothing will be changed."}</p>
        <Input type="text" onChange={this.handleChange.bind(this, "cls")} label="Class" placeholder={this.props.character['charInfo']['class']} value={this.state.cls} />
        <Input type="text" onChange={this.handleChange.bind(this, "race")} label="Race" placeholder={this.props.character['charInfo']['race']} value={this.state.race} />
        <Input type="text" bsStyle={(this.state.lvl === "") ? null : validlvl} onChange={this.handleChange.bind(this, "lvl")} label="Level" placeholder={this.props.character['charInfo']['level']} value={this.state.lvl} />
        <Input type="text" bsStyle={(this.state.xp ==="") ? null : validxp} onChange={this.handleChange.bind(this, "xp")} label="Xp" placeholder={this.props.character['charInfo']['xp']} value={this.state.xp} />
        <Input type="text" onChange={this.handleChange.bind(this, "bg")} label="Background" placeholder={this.props.character['charInfo']['background']} value={this.state.bg} />
        <Input type="text" onChange={this.handleChange.bind(this, "align")} label="Alignment" placeholder={this.props.character['charInfo']['alignment']} value={this.state.align} />
        <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.toggle}>Close</Button>
          <Button bsStyle="success" onClick={this.handleOk}>Save</Button>
        </ButtonToolbar>
      </Settings>
    );
  }
})

module.exports = SettingsInfo;