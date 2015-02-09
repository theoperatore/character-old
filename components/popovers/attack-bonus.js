var React = require('react');
var EventListener = require('react-bootstrap/utils/EventListener');
var Input = require('react-bootstrap/Input');
var Button = require('react-bootstrap/Button');
var Glyphicon = require('react-bootstrap/Glyphicon');

// func that see if 
var targetInRoot = function(target, root) {
  while (target) {
    if (target === root) return true;
    target = target.parentNode;
  }

  return false;
}

var Bubble = React.createClass({
  handleDOMClick : function(e) {

    // close this popover if target click is not part of this element tree
    if (!targetInRoot(e.target, this.getDOMNode())) {
      this.props.close();
    }
  },
  handleChange : function(cmp, e) {
    var data = this.props.preferences;
    var path = this.props.pane + ".atkBubble." + this.props.idx + "." + cmp;

    data[this.props.configName][this.props.idx][cmp] = 
      (cmp === "prof") ? e.target.checked : e.target.value;

    this.props.edit({ path : path, preferences : data });
  },
  manipBubbles : function(cmp) {
    var data = this.props.preferences;
    var path = this.props.pane + "." + this.props.configName;

    if (cmp === "add") {
      data[this.props.configName].push({
        abil : "str",
        prof : "false",
        desc : "Attack Bonus"
      });
    }
    else if (cmp === "sub") {
      if (data[this.props.configName].length === 1) return;
      data[this.props.configName].splice(data[this.props.configName].length - 1, 1);
    }

    this.props.edit({ path : path + "." + cmp, preferences : data });
    this.props.close();
  },
  componentDidMount: function () {
    // bind dom event listener
    this._onDOMClickListener = 
      EventListener.listen(document, "click", this.handleDOMClick);
    
  },
  componentWillUnmount: function () {
    // unbind event listeners
    this._onDOMClickListener.remove();
  },
  render : function() {
    return (
      <div className="container-fluid">
        <Input type="select" label='Ability Mod' value={this.props.bubble['abil']} onChange={this.handleChange.bind(this, "abil")}>
          <option value="str">str</option>
          <option value="dex">dex</option>
          <option value="con">con</option>
          <option value="int">int</option>
          <option value="wis">wis</option>
          <option value="cha">cha</option>
        </Input>
        <Input type="checkbox" checked={this.props.bubble.prof} label="Proficient"  onChange={this.handleChange.bind(this, "prof")}/>
        <Input type="text" value={this.props.bubble.desc} label="Name" onChange={this.handleChange.bind(this, "desc")}/>
        <Input label="Add/Remove Attack Bubble">
          <Button className="no-border" onClick={this.manipBubbles.bind(this, "sub")}>
            <Glyphicon glyph="minus-sign" />
          </Button>
          <Button className="no-border" onClick={this.manipBubbles.bind(this, "add")}>
            <Glyphicon glyph="plus-sign" />
          </Button>
        </Input> 
      </div>
    );
  }
})

module.exports = Bubble;