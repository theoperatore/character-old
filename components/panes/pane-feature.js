var React = require('react');

var Settings = require('../settings/settings-features');
var HatchGroup = require('../hatch/HatchGroup');
var Hatch = require('../hatch/Hatch');
var Panel3d = require('../hatch/Panel3d');

var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Accordion = require('react-bootstrap/lib/Accordion');
var Panel = require('react-bootstrap/lib/Panel');
var Input = require('react-bootstrap/lib/Input');
var Button = require('react-bootstrap/lib/Button');

var Features = React.createClass({
  displayName : "CharFeatures",
  handleToggle : function(idx) {
    this.refs.settings.toggle(idx);
  },
  render : function() {

    var feats = [];
    this.props.character['charFeatures'].forEach(function(feat, i) {
      feats.push(
        <Panel3d title={feat.name} key={"feat" + i} className="list-header">
          <p>{feat.desc}</p>
        </Panel3d>
      );
    });

    return (
      <HatchGroup ref="settings">
        <div className="hatch-cover">
          <h3>{"Features"} <Button className="no-border" onClick={this.handleToggle.bind(this, "feat0")}><Glyphicon glyph="cog"/></Button></h3>
        </div>
        <Hatch eventKey={"feat0"}>
          <Settings character={this.props.character} edit={this.props.edit}/>
        </Hatch>
        <div className="hatch-cover">
          {feats}
        </div>
      </HatchGroup>
    );
  }
})

module.exports = Features;