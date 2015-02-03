var React = require('react');
var ContentInfo = require('./content-info');
var ContentAttack = require('./content-attack');
var ContentAbility = require('./content-ability');
var ContentDefense = require('./content-defense');
var ContentFeature = require('./content-feature');
var ContentEquipment = require('./content-equipment');

var PageHeader = require('react-bootstrap/PageHeader');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var Glyphicon = require('react-bootstrap/Glyphicon');
var Accordion = require('react-bootstrap/Accordion');
var Panel = require('react-bootstrap/Panel');
var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');

var OverlayTrigger = require('react-bootstrap/OverlayTrigger');
var Popover = require('react-bootstrap/Popover');
var Input = require('react-bootstrap/Input');

var ContentArea = React.createClass({
  displayName : "ContentArea",
  render : function() {
    return (
      <TabbedArea defaultActiveKey={5}>

        <TabPane eventKey={1} tab={<Glyphicon glyph="info-sign" />}>
          <ContentInfo character={this.props.character} />          
        </TabPane>


        <TabPane eventKey={2} tab={<Glyphicon glyph="bookmark" />}>
          <ContentAbility character={this.props.character} />
        </TabPane>


        <TabPane eventKey={3} tab={<Glyphicon glyph="tower" />}>
          <ContentDefense character={this.props.character} />
        </TabPane>


        <TabPane eventKey={4} tab={<Glyphicon glyph="flash" />}>
          <ContentFeature character={this.props.character} />
        </TabPane>


        <TabPane eventKey={5} tab={<Glyphicon glyph="fire" />}>
          <ContentAttack character={this.props.character} />
        </TabPane>


        <TabPane eventKey={6} tab={<Glyphicon glyph="book" />}>
          <div className="container-fluid">
            <h3>{"Spells"}</h3>
            <Panel>
              <p className="text-center">{"Spell DC"}</p>
              <OverlayTrigger trigger="click" placement="bottom" overlay={
                <Popover title="Spell Save DC Config">
                  <div>
                    <Input type="select" label='Ability Mod' defaultValue="str">
                      <option value="str">str</option>
                      <option value="dex">dex</option>
                      <option value="con">con</option>
                      <option value="int">int</option>
                      <option value="wis">wis</option>
                      <option value="cha">cha</option>
                    </Input>
                  </div>
                </Popover>
              }>
                <h3 className="BOOM text-center">{8}</h3>  
              </OverlayTrigger>
            </Panel>
            <p>{"This is where your spells will reside along with your spell slots and spell save DC"}</p>
          </div>
        </TabPane>


        <TabPane eventKey={7} tab={<Glyphicon glyph="shopping-cart" />}>
          <ContentEquipment character={this.props.character} /> 
        </TabPane>
      </TabbedArea>
    )
  }
})

module.exports = ContentArea;