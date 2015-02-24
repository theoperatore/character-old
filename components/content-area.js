var React = require('react');
var swiper;

// components
var PaneInfo = require('./panes/pane-info');
var PaneAttack = require('./panes/pane-attack');
var PaneAbility = require('./panes/pane-ability');
var PaneDefense = require('./panes/pane-defense');
var PaneFeature = require('./panes/pane-feature');
var PaneEquipment = require('./panes/pane-equipment');
var PaneSpell = require('./panes/pane-spell');

// react-bootstrap stuff
var Nav = require('react-bootstrap/lib/Nav');
var NavItem = require('react-bootstrap/lib/NavItem');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
//var TabbedArea = require('react-bootstrap/lib/TabbedArea');
//var TabPane = require('react-bootstrap/lib/TabPane');

// the thing!
var ContentArea = React.createClass({
  displayName : "ContentArea",
  getInitialState : function() {
    var state = {};

    state.active = 0;

    return (state);
  },
  handleSwiperSelect : function(s) {
    this.setState({ active : s.activeIndex });
  },
  handleSelect : function(tab) {
    this.setState({ active : tab });
    swiper.slideTo(tab);
  },
  componentDidMount: function () {
    var opts = {};

    opts.grabCursor = true;
    opts.threshold = 50;
    opts.preventClicks = false;
    opts.preventClicksPropagation = false;
    opts.keyboardControl = true;
    opts.onSlideChangeStart = this.handleSwiperSelect;

    swiper = new Swiper(this.refs['swiper-container'].getDOMNode(), opts);
  },
  render : function() {
    return (
      <div>
        <Nav bsStyle="tabs" activeKey={this.state.active} onSelect={this.handleSelect}>
          <NavItem eventKey={0}><Glyphicon glyph="info-sign" /></NavItem>
          <NavItem eventKey={1}><div className="icon-chart" /></NavItem>
          <NavItem eventKey={2}><div className="icon-shield" /></NavItem>
          <NavItem eventKey={3}><div className="icon-features" /></NavItem>
          <NavItem eventKey={4}><div className="icon-attack" /></NavItem>
          <NavItem eventKey={5}><div className="icon-repo" /></NavItem>
          <NavItem eventKey={6}><div className="icon-equipment" /></NavItem>
        </Nav>
        <div ref="swiper-container" className="swiper-container">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <PaneInfo character={this.props.character} edit={this.props.edit} />
            </div>
            <div className="swiper-slide">
              <PaneAbility character={this.props.character} edit={this.props.edit} />
            </div>
            <div className="swiper-slide">
              <PaneDefense character={this.props.character} edit={this.props.edit} />
            </div>
            <div className="swiper-slide">
              <PaneFeature character={this.props.character} edit={this.props.edit} />
            </div>
            <div className="swiper-slide">
              <PaneAttack 
                character={this.props.character} edit={this.props.edit}
                preferences={this.props.preferences} editPreferences={this.props.editPreferences}
              />         
            </div>
            <div className="swiper-slide">
              <PaneSpell 
                character={this.props.character} edit={this.props.edit} 
                preferences={this.props.preferences} editPreferences={this.props.editPreferences}
              />
            </div>
            <div className="swiper-slide">
              <PaneEquipment character={this.props.character} edit={this.props.edit} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  /* original render
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
  */
})

module.exports = ContentArea;