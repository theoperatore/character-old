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
    return ({
      toggle : false,
      activeFeat : -1
    });
  },
  handleToggle : function() {
    this.setState({ toggle : !this.state.toggle });
  },
  handleFeatSelect : function(key) {
    var state = {};
    var prev = this.state.activeFeat;
    key = (key === prev) ? -1 : key;

    // should handle saving changes instead of hiding them
    state['edit' + prev] = false;
    state.activeFeat = key;

    this.setState(state);
  },
  renderOverlay : function() {
    if (!this.state.toggle) return <span />;

    return (
      <ModalFeature character={this.props.character} edit={this.props.edit} close={this.handleToggle} />
    );
  },
  handleEditToggle : function(idx, e) {
    e.preventDefault();
    e.stopPropagation();

    var state = {};

    state["edit" + idx] = 
        (this.state["edit" + idx] === undefined)
        ? false 
        : this.state["edit" + idx];

    state["edit" + idx] = !state["edit" + idx];
    state.activeFeat = idx;

    this.setState(state);

  },
  render : function() {

    var feats = [];
    this.props.character['charFeatures'].forEach(function(feat, i) {
      feats.push(
        <Panel className="no-padding" bsStyle="warning" key={i} header={<div>{feat.name} <Button onClick={this.handleEditToggle.bind(this, i)} className={"pull-right no-border edit-btn" + ((this.state.activeFeat === i) ? "" : " hide")}><Glyphicon glyph="cog"/></Button></div>} eventKey={i}>
            <p className={(this.state["edit"+i] === true) ? "hide" : "" }>{feat.desc}</p>
            <Input>
              <div className={(this.state["edit"+i] === true) ? "" : "hide" }>
                <Input type="text" label={"Edit Feature Name"} value={feat.name} />
                <Input type="text" label={"Edit Feature Description"} value={feat.desc} />
                <Button bsStyle="success">{"Save"}</Button>
                <Button bsStyle="danger">{"Delete"}</Button>
              </div>
            </Input>
        </Panel>
      );

      feats.push(

      );
    }.bind(this));

    return (
      <div className="container-fluid">
        <h3>{"Features"} <Button className="no-border" onClick={this.handleToggle}><Glyphicon glyph="plus-sign"/></Button></h3>
        <Accordion activeKey={this.state.activeFeat} onSelect={this.handleFeatSelect}>
          {feats}
        </Accordion>
      </div>
    );
  }
})

module.exports = Features;