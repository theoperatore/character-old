var React = require('react');
var Glyphicon = require('react-bootstrap/Glyphicon');
var Accordion = require('react-bootstrap/Accordion');
var Panel = require('react-bootstrap/Panel');
var Input = require('react-bootstrap/Input');
var Button = require('react-bootstrap/Button');

var Features = React.createClass({
  displayName : "CharFeatures",
  render : function() {

    var feats = [];
    this.props.character['charFeatures'].forEach(function(feat, i) {
      feats.push(
        <Panel key={i} header={feat.name} eventKey={i}>
            <p>{feat.desc}</p>
        </Panel>
      );
    });

    return (
      <div className="container-fluid">
        <h3>{"Features"}</h3>
        <Accordion defaultActiveKey="">
          {feats}
        </Accordion>
      </div>
    );
  }
})

module.exports = Features;