var React = require('react');

var Settings = require('./settings/settings-features');

var Glyphicon = require('react-bootstrap/Glyphicon');
var Accordion = require('react-bootstrap/Accordion');
var Panel = require('react-bootstrap/Panel');
var Input = require('react-bootstrap/Input');
var Button = require('react-bootstrap/Button');

var Features = React.createClass({
  displayName : "CharFeatures",
  handleToggle : function() {
    this.refs.settings.toggle();
  },
  render : function() {

    var feats = [];
    this.props.character['charFeatures'].forEach(function(feat, i) {
      feats.push(
        <Panel className="no-padding" bsStyle="warning" key={i} header={feat.name} eventKey={i}>
            <p>{feat.desc}</p>
        </Panel>
      );
    });

    return (
      <div className="container-fluid">
        <h3>{"Features"} <Button className="no-border" onClick={this.handleToggle}><Glyphicon glyph="cog"/></Button></h3>
        <Settings ref="settings" character={this.props.character}/>
        <Accordion defaultActiveKey="">
          {feats}
        </Accordion>
      </div>
    );
  }
})

module.exports = Features;