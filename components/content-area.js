var React = require('react');

// components
var PaneInfo = require('./panes/pane-info');
var PaneAttack = require('./panes/pane-attack');
var PaneAbility = require('./panes/pane-ability');
var PaneDefense = require('./panes/pane-defense');
var PaneFeature = require('./panes/pane-feature');
var PaneEquipment = require('./panes/pane-equipment');
var PaneSpell = require('./panes/pane-spell');

var Hatch = require('./Hatch');
var Button = require('react-bootstrap/Button');

// react-bootstrap stuff
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var Glyphicon = require('react-bootstrap/Glyphicon');


// the thing!
var ContentArea = React.createClass({
  displayName : "ContentArea",
  toggleHatch : function(cmp) {
    this.refs[cmp].toggle();
  },
  render : function() {
    return (
      <TabbedArea defaultActiveKey={8}>

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


        <TabPane eventKey={8} tab={<Glyphicon glyph="floppy-save" />}>
          
          <Hatch ref="hatch1" entryway={
            <div>
              <h1>{"I'm below!"}</h1>
              <p>{"this is where settings should go"}</p>
              <p>{"notice how smooth the scrolling is? This is how it should be for the Monster eating areas"}</p>
              <p>{"notice how smooth the scrolling is? This is how it should be for the Monster eating areas"}</p>
              <p>{"notice how smooth the scrolling is? This is how it should be for the Monster eating areas"}</p>
              <p>{"notice how smooth the scrolling is? This is how it should be for the Monster eating areas"}</p>
              <p>{"notice how smooth the scrolling is? This is how it should be for the Monster eating areas"}</p>
              <p>{"notice how smooth the scrolling is? This is how it should be for the Monster eating areas"}</p>
              <p>{"notice how smooth the scrolling is? This is how it should be for the Monster eating areas"}</p>
              <p>{"notice how smooth the scrolling is? This is how it should be for the Monster eating areas"}</p>
              <p>{"notice how smooth the scrolling is? This is how it should be for the Monster eating areas"}</p>
              <p>{"notice how smooth the scrolling is? This is how it should be for the Monster eating areas"}</p>
            </div>
          }>
            <h3>{"Cover cover cover"}</h3>
            <div>
              <Button onClick={this.toggleHatch.bind(this, "hatch1")}>{"Tap Me!"}</Button>
              <p>{"things that are part of the cover."}</p>
              <p>{"this should be where all of the other content goes."}</p>
            </div>
            <Hatch ref="hatch2" entryway={
              <div>
                <h1>{"Part of the next hatch!"}</h1>
                <p>{"this is another settings area one hatch. at most, it seems that there is going to be a chain of these things..."}</p>
              </div>
            }>
              <h3>{"Cover cover cover"}</h3>
              <div>
                <Button onClick={this.toggleHatch.bind(this, "hatch2")}>{"Tap Me!"}</Button>
                <p>{"More things that are part of the cover"}</p>
                <p>{"this is the second hatch cover"}</p>
              </div>
            </Hatch>
          </Hatch>
        </TabPane>
      </TabbedArea>
    )
  }
})

module.exports = ContentArea;