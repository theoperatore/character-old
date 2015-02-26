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
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
//var TabbedArea = require('react-bootstrap/lib/TabbedArea');
//var TabPane = require('react-bootstrap/lib/TabPane');

// the thing!
var ContentArea = React.createClass({
  displayName : "ContentArea",
  // setting the state of this component causes a re-render...
  handleSwiperSelect : function(s) {
    //this.setState({ active : s.activeIndex });
    this.props.setNav(s.activeIndex);
  },
  handleSelect : function(tab) {
    this.setState({ active : tab });
    swiper.slideTo(tab);
  },
  handleTap : function(type, s, ev) {
    ev.preventDefault();
    ev.stopPropagation();
  },
  componentDidMount: function () {
    var opts = {};

    opts.grabCursor = true;
    opts.threshold = 50;
    opts.preventClicks = false;
    opts.preventClicksPropagation = false;
    //opts.keyboardControl = true;
    opts.onSlideChangeStart = this.handleSwiperSelect;
    //opts.onTap = this.handleTap.bind(this, "tap");

    swiper = new Swiper(this.refs['swiper-container'].getDOMNode(), opts);
  },
  componentWillReceiveProps: function (nextProps) {
    if (nextProps.activeNav === undefined) return;
    //console.log(nextProps.activeNav, this.props.activeNav, swiper.activeIndex);
    swiper.slideTo(nextProps.activeNav);
  },
  shouldComponentUpdate: function (nextProps, nextState) {
    return (
      this.props.character !== nextProps.character ||
      this.props.preferences !== nextProps.preferences
    );
  },
  render : function() {

    console.log("rendering content-area");
    return (  
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