var React = require('react');
var Hammer = require('hammerjs');
var gesture;

// components
var PaneInfo = require('./panes/pane-info');
var PaneAttack = require('./panes/pane-attack');
var PaneAbility = require('./panes/pane-ability');
var PaneDefense = require('./panes/pane-defense');
var PaneFeature = require('./panes/pane-feature');
var PaneEquipment = require('./panes/pane-equipment');
var PaneSpell = require('./panes/pane-spell');

// react-bootstrap stuff
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');


// the thing!
var ContentArea = React.createClass({
  displayName : "ContentArea",
  getInitialState : function() {
    var state = {};

    state.active = 2;

    return (state);
  },
  
  handleGesture : function(ev) {
    var active = this.state.active;

    if (ev.direction === Hammer.DIRECTION_LEFT) {
      active = ((active - 1) < 0) ? 6 : (active - 1);
    }
    else if (ev.direction === Hammer.DIRECTION_RIGHT) {
      active = (active + 1) % 7;
    }

    this.setState({ active : active });
  },
  handleSelect : function(tab) {
    this.setState({ active : tab });
  },
  componentDidMount: function () {
    //gesture = new Hammer(this.getDOMNode());

    // only care about swipe gestures
    //gesture.get("tap").set({ enable : false });
    //gesture.get("doubletap").set({ enable : false });
    //gesture.get("press").set({ enable : false });

    //gesture.get("pan").set({ threshold : 10 });

    // add gesture event listeners
    //gesture.on("pan", this.handleGesture);
    //gesture.on("panleft", this.handleGesture.bind(this, "right"));
  },
  toggleHatch : function(idx) {
    this.refs.hatchgroup.toggle(idx);
  },
  render : function() {
    return (
      <TabbedArea animation={false} activeKey={this.state.active} onSelect={this.handleSelect}>

        <TabPane eventKey={0} tab={<Glyphicon glyph="info-sign" />}>
          <PaneInfo character={this.props.character} edit={this.props.edit} />          
        </TabPane>


        <TabPane eventKey={1} tab={<div className="icon-chart" />}>
          <PaneAbility character={this.props.character} edit={this.props.edit} />
        </TabPane>


        <TabPane eventKey={2} tab={<div className="icon-shield" />}>
          <PaneDefense character={this.props.character} edit={this.props.edit} />
        </TabPane>


        <TabPane eventKey={3} tab={<div className="icon-features" />}>
          <PaneFeature character={this.props.character} edit={this.props.edit} />
        </TabPane>


        <TabPane eventKey={4} tab={<div className="icon-attack" />}>
          <PaneAttack 
            character={this.props.character} edit={this.props.edit}
            preferences={this.props.preferences} editPreferences={this.props.editPreferences}
          />
        </TabPane>

        <TabPane eventKey={5} tab={<div className="icon-repo" />}>
          <PaneSpell 
            character={this.props.character} edit={this.props.edit} 
            preferences={this.props.preferences} editPreferences={this.props.editPreferences}
          />
        </TabPane>

        <TabPane eventKey={6} tab={<div className="icon-equipment" />}>
          <PaneEquipment character={this.props.character} edit={this.props.edit} />
        </TabPane>
        
      </TabbedArea>
    )
  }
})

module.exports = ContentArea;