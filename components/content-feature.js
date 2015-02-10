var React = require('react');
var ModalFeature = require('./modals/modal-features');


var Glyphicon = require('react-bootstrap/Glyphicon');
var Accordion = require('react-bootstrap/Accordion');
var Panel = require('react-bootstrap/Panel');
var Input = require('react-bootstrap/Input');
var Button = require('react-bootstrap/Button');
var OverlayMixin = require('react-bootstrap/OverlayMixin');

var Features = React.createClass({
  displayName : "CharFeatures",
  mixins : [OverlayMixin],
  getInitialState : function() {
    return ({ toggle : false });
  },
  handleToggle : function() {
    this.setState({ toggle : !this.state.toggle });
  },
  renderOverlay : function() {
    if (!this.state.toggle) return <span />;

    return (
      <ModalFeature character={this.props.character} edit={this.props.edit} close={this.handleToggle} />
    );
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
        <Accordion defaultActiveKey="">
          {feats}
        </Accordion>
      </div>
    );
  }
})

module.exports = Features;