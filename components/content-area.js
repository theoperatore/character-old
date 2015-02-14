var React = require('react');

// components
var PaneInfo = require('./panes/pane-info');
var PaneAttack = require('./panes/pane-attack');
var PaneAbility = require('./panes/pane-ability');
var PaneDefense = require('./panes/pane-defense');
var PaneFeature = require('./panes/pane-feature');
var PaneEquipment = require('./panes/pane-equipment');
var PaneSpell = require('./panes/pane-spell');

// react-bootstrap stuff
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var Glyphicon = require('react-bootstrap/Glyphicon');


// the thing!
var ContentArea = React.createClass({
  displayName : "ContentArea",
  render : function() {
    return (
      <TabbedArea defaultActiveKey={3}>

        <TabPane eventKey={1} tab={<Glyphicon glyph="info-sign" />}>
          <PaneInfo character={this.props.character} edit={this.props.edit} />          
        </TabPane>


        <TabPane eventKey={2} tab={<Glyphicon glyph="bookmark" />}>
          <PaneAbility character={this.props.character} edit={this.props.edit} />
        </TabPane>


        <TabPane eventKey={3} tab={<Glyphicon glyph="tower" />}>
          <PaneDefense character={this.props.character} edit={this.props.edit} />
        </TabPane>


        <TabPane eventKey={4} tab={<Glyphicon glyph="flash" />}>
          <PaneFeature character={this.props.character} edit={this.props.edit} />
        </TabPane>


        <TabPane eventKey={5} tab={<Glyphicon glyph="fire" />}>
          <PaneAttack 
            character={this.props.character} edit={this.props.edit}
            preferences={this.props.preferences} editPreferences={this.props.editPreferences}
          />
        </TabPane>


        <TabPane eventKey={6} tab={<Glyphicon glyph="book" />}>
          <PaneSpell 
            character={this.props.character} edit={this.props.edit} 
            preferences={this.props.preferences} editPreferences={this.props.editPreferences}
          />
        </TabPane>


        <TabPane eventKey={7} tab={<Glyphicon glyph="shopping-cart" />}>
          <PaneEquipment character={this.props.character} edit={this.props.edit} /> 
        </TabPane>

      </TabbedArea>
    )
  }
})

module.exports = ContentArea;