var React = require('react');
var ModalFeature = require('./modals/modal-features');

var Glyphicon = require('react-bootstrap/Glyphicon');
var Accordion = require('react-bootstrap/Accordion');
var Panel = require('react-bootstrap/Panel');
var Input = require('react-bootstrap/Input');
var Button = require('react-bootstrap/Button');
var Well = require('react-bootstrap/Well');

var Features = React.createClass({
  displayName : "CharFeatures",
  getInitialState : function() {
    return ({
      toggle : 0,
      activeFeat : -1
    });
  },
  handleToggle : function() {
    this.setState({ toggle : (this.state.toggle === 0) ? 1 : 0 });
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
      var charges = (feat.idx === undefined) ? ""
        : this.props.character['charClassCharges'][feat.idx]['charges'];

      feats.push(
        <Panel className="no-padding" bsStyle="warning" key={i} header={<div>{feat.name} <Button onClick={this.handleEditToggle.bind(this, i)} className={"pull-right no-border edit-btn" + ((this.state.activeFeat === i) ? "" : " hide")}><Glyphicon glyph="cog"/></Button></div>} eventKey={i}>
            <p className={(this.state["edit"+i] === true) ? "hide" : "" }>{feat.desc}</p>
            <Input>
              <div className={(this.state["edit"+i] === true) ? "" : "hide" }>
                <Input type="text" label={"Edit Feature Name"} value={feat.name} />
                <Input type="textarea" label={"Edit Feature Description"} value={feat.desc} />
                <Input type="checkbox" label={"gives class charges?"} checked={(feat.idx === undefined) ? false : true} />
                <Input type="text" disabled={(feat.idx === undefined) ? true : false} label={"Number of Charges"} value={charges} />
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
        
        <Accordion activeKey={this.state.toggle}>
          <Panel eventKey={1} className="no-padding">
            <Well>
              <h3>{"Add New Feature"}</h3>
              <p>{"What do you guys think about having this as the way to add a feature?"}</p>
              
              <Input type="text" label={"Feature Name"} />
              <Input type="textarea" label={"Feature Description"} />
              <Input type="checkbox" label={"gives class charges?"} />
              <Input type="text" label={"Number of Charges"} help="(Ki, Rages, Sorcery, etc)?" />
              <Button bsStyle="danger" onClick={this.handleToggle}>{"close"}</Button>
              <Button bsStyle="success">{"Save"}</Button>
            </Well>
          </Panel>
        </Accordion>
          
        <Accordion activeKey={this.state.activeFeat} onSelect={this.handleFeatSelect}>
          {feats}
        </Accordion>
      </div>
    );
  }
})

module.exports = Features;