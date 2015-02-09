var React = require('react');

// components
var ContentInfo = require('./content-info');
var ContentAttack = require('./content-attack');
var ContentAbility = require('./content-ability');
var ContentDefense = require('./content-defense');
var ContentFeature = require('./content-feature');
var ContentEquipment = require('./content-equipment');
var ContentSpell = require('./content-spell');

// react-bootstrap stuff
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var Glyphicon = require('react-bootstrap/Glyphicon');


// the thing!
var ContentArea = React.createClass({
  displayName : "ContentArea",
  render : function() {
    return (
      <TabbedArea defaultActiveKey={5}>

        <TabPane eventKey={1} tab={<Glyphicon glyph="info-sign" />}>
          <ContentInfo character={this.props.character} edit={this.props.edit} />          
        </TabPane>


        <TabPane eventKey={2} tab={<Glyphicon glyph="bookmark" />}>
          <ContentAbility character={this.props.character} edit={this.props.edit} />
        </TabPane>


        <TabPane eventKey={3} tab={<Glyphicon glyph="tower" />}>
          <ContentDefense character={this.props.character} edit={this.props.edit} />
        </TabPane>


        <TabPane eventKey={4} tab={<Glyphicon glyph="flash" />}>
          <ContentFeature character={this.props.character} edit={this.props.edit} />
        </TabPane>


        <TabPane eventKey={5} tab={<Glyphicon glyph="fire" />}>
          <ContentAttack 
            character={this.props.character} edit={this.props.edit}
            preferences={this.props.preferences} editPreferences={this.props.editPreferences}
          />
        </TabPane>


        <TabPane eventKey={6} tab={<Glyphicon glyph="book" />}>
          <ContentSpell 
            character={this.props.character} edit={this.props.edit} 
            preferences={this.props.preferences} editPreferences={this.props.editPreferences}
          />
        </TabPane>


        <TabPane eventKey={7} tab={<Glyphicon glyph="shopping-cart" />}>
          <ContentEquipment character={this.props.character} edit={this.props.edit} /> 
        </TabPane>

      </TabbedArea>
    )
  }
})

module.exports = ContentArea;