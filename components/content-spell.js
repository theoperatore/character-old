var React = require('react');
var Glyphicon = require('react-bootstrap/Glyphicon');
var Accordion = require('react-bootstrap/Accordion');
var Panel = require('react-bootstrap/Panel');
var Input = require('react-bootstrap/Input');
var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var OverlayTrigger = require('react-bootstrap/OverlayTrigger');
var OverlayMixin = require('react-bootstrap/OverlayMixin');
var Popover = require('react-bootstrap/Popover');
var Modal = require('react-bootstrap/Modal');
var Button = require('react-bootstrap/Button');

var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var DropdownButton = require('react-bootstrap/DropdownButton');
var MenuItem = require('react-bootstrap/MenuItem');
var ButtonGroup = require('react-bootstrap/ButtonGroup');


var Spells = React.createClass({
  displayName : "CharSpell",
  render : function() {

    var spells = [];
    this.props.character['charSpells'].forEach(function(level, i) {
      if (level.spells.length !== 0) {
        // get spell slots
        var slots = [];
        for (var k = 0; k < level.slots; k++) {
          slots.push(
            <Col key={k} xs={1}><input type="checkbox" /></Col>
          );
        }

        // if there are spell slots, draw them
        var slotsArea;
        if (slots.length !== 0) {
          slotsArea = (<div className="slots">
            <p>{"Spell Slots"}</p>
            <Grid fluid>
              <Row>
                {slots}
              </Row>
            </Grid>
          </div>);
        } 

        // get each spell
        var sps = [];
        level.spells.forEach(function(spell, j) {
          sps.push(
            <Panel key={j} eventKey={j} header={spell['name']}>
              <p><strong>{"CT:"}</strong>  {spell['cast']}</p>
              <p><strong>{"R:"}</strong>   {spell['range']}</p>
              <p><strong>{"CMP:"}</strong> {spell['cmp']}</p>
              <p><strong>{"DUR:"}</strong> {spell['dur']}</p>
              <p>{spell['desc']}</p>
            </Panel>
          );
        });

        // put it all together
        spells.push(
          <Panel bsStyle="warning" className="no-padding" key={i} eventKey={i} header={level['name'] + ((i !== 0) ?  " Level" : "")}>
            {slotsArea}
            <Accordion defaultActiveKey="">
              {sps}
            </Accordion>
          </Panel>
        );
      }
    });


    return (
      <div className="container-fluid">
        <h3>{"Spells"} <Button className="no-border"><Glyphicon glyph="cog"/></Button> <Button className="no-border"><Glyphicon glyph="question-sign"/></Button></h3>
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
            <h3 className="bonus text-center">{8}</h3>  
          </OverlayTrigger>
        </Panel>

        <Accordion defaultActiveKey="">
          {spells}
        </Accordion>
      </div>
    );
  }
})

module.exports = Spells;